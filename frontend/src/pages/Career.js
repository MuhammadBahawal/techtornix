import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  FiMapPin, 
  FiClock, 
  FiDollarSign, 
  FiUsers,
  FiArrowRight,
  FiX,
  FiUpload,
  FiCheck,
  FiBriefcase,
  FiTrendingUp
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import adminDataManager from '../utils/adminData';
import JobApplicationForm from '../components/career/JobApplicationForm';

const Career = () => {
  const sectionRef = useRef(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const departments = [
    { id: 'all', name: 'All Departments', count: 6 },
    { id: 'development', name: 'Development', count: 3 },
    { id: 'design', name: 'Design', count: 2 },
    { id: 'marketing', name: 'Marketing', count: 1 }
  ];

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = () => {
    try {
      const jobsData = adminDataManager.getAll('jobs');
      // Filter only active jobs that haven't expired
      const activeJobs = jobsData.filter(job => {
        if (job.status !== 'active') return false;
        if (job.expiresAt && new Date(job.expiresAt) < new Date()) return false;
        return true;
      });
      setJobs(activeJobs);
    } catch (error) {
      console.error('Error loading jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = selectedDepartment === 'all' 
    ? jobs 
    : jobs.filter(job => job.department === selectedDepartment);

  // Simple animation effect without GSAP
  useEffect(() => {
    const cards = document.querySelectorAll('.job-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s ease-out';
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, [filteredJobs]);

  const openModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    document.body.style.overflow = 'unset';
  };

  const handleApplicationSubmit = (applicationData) => {
    toast.success('Application submitted successfully!');
    loadJobs(); // Refresh jobs if needed
  };

  return (
    <>
      <Helmet>
        <title>Careers - Techtornix | Join Our Amazing Team</title>
        <meta name="description" content="Join Techtornix and be part of an innovative team building the future of technology." />
      </Helmet>

      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen pt-8"
      >
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Join Our <span className="gradient-text">Amazing Team</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
                Be part of an innovative team that's building the future of technology. 
                We offer exciting opportunities, competitive benefits, and a culture of growth.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">{jobs.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Open Positions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">95%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Employee Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">4.8</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Glassdoor Rating</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Department Filter */}
        <section className="py-8 bg-white dark:bg-gray-900 sticky top-20 z-40 border-b border-gray-200 dark:border-gray-700">
          <div className="container-custom">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                    selectedDepartment === dept.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <span>{dept.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedDepartment === dept.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {dept.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="section-padding">
          <div className="container-custom">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                <p className="text-gray-600 dark:text-gray-400 mt-4">Loading job opportunities...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <FiBriefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Jobs Available</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedDepartment === 'all' 
                    ? 'There are currently no open positions. Check back soon!'
                    : `No positions available in ${departments.find(d => d.id === selectedDepartment)?.name || selectedDepartment}.`
                  }
                </p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDepartment}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {filteredJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      className="job-card bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer group"
                      onClick={() => openModal(job)}
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                                  {job.title}
                                </h3>
                                {job.status === 'active' && (
                                  <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-full text-xs font-bold">
                                    ACTIVE
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                                {job.description}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                              <FiMapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                              <FiClock className="w-4 h-4" />
                              <span>{job.type}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                              <FiUsers className="w-4 h-4" />
                              <span>{job.department}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium capitalize">
                                {job.department}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {job.expiresAt ? `Expires ${new Date(job.expiresAt).toLocaleDateString()}` : 'No expiry'}
                              </span>
                            </div>
                            <button className="btn-primary group">
                              Apply Now
                              <FiArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-padding bg-gray-50 dark:bg-gray-800">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Work With Us?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                We believe in creating an environment where our team can thrive and grow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: FiTrendingUp,
                  title: 'Career Growth',
                  description: 'Clear career paths with mentorship and learning opportunities'
                },
                {
                  icon: FiDollarSign,
                  title: 'Competitive Package',
                  description: 'Attractive salary, equity, and comprehensive benefits'
                },
                {
                  icon: FiClock,
                  title: 'Work-Life Balance',
                  description: 'Flexible hours, remote work options, and unlimited PTO'
                },
                {
                  icon: FiUsers,
                  title: 'Amazing Team',
                  description: 'Work with talented, passionate people who care about quality'
                },
                {
                  icon: FiBriefcase,
                  title: 'Cutting-Edge Projects',
                  description: 'Work on innovative projects using the latest technologies'
                },
                {
                  icon: FiCheck,
                  title: 'Health & Wellness',
                  description: 'Comprehensive health insurance and wellness programs'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>

      {/* Job Application Modal */}
      <AnimatePresence>
        {isModalOpen && selectedJob && (
          <JobApplicationForm
            job={selectedJob}
            onClose={closeModal}
            onSubmit={handleApplicationSubmit}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Career;
