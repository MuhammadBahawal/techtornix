import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiUsers,
  FiX,
  FiCheck,
  FiBriefcase,
  FiTrendingUp,
  FiCalendar,
  FiAlertCircle
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const Career = () => {
  const sectionRef = useRef(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Static job data with expired posts
  const staticJobs = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'development',
      location: 'Faisalabad, Pakistan',
      type: 'Full-time',
      status: 'expired',
      description: 'We were looking for an experienced full-stack developer to join our team and work on cutting-edge web applications.',
      requirements: [
        '5+ years of experience in React and Node.js',
        'Strong knowledge of MongoDB and PostgreSQL',
        'Experience with AWS and Docker',
        'Excellent problem-solving skills'
      ],
      responsibilities: [
        'Develop and maintain web applications',
        'Collaborate with cross-functional teams',
        'Write clean, maintainable code',
        'Mentor junior developers'
      ],
      postedAt: '2025-06-15',
      expiresAt: '2025-02-15'
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      department: 'design',
      location: 'Remote',
      type: 'Full-time',
      status: 'expired',
      description: 'We were seeking a creative UI/UX designer to create beautiful and intuitive user experiences.',
      requirements: [
        '3+ years of UI/UX design experience',
        'Proficiency in Figma and Adobe Creative Suite',
        'Strong portfolio showcasing web and mobile designs',
        'Understanding of user-centered design principles'
      ],
      responsibilities: [
        'Create wireframes and prototypes',
        'Design user interfaces for web and mobile',
        'Conduct user research and testing',
        'Collaborate with development team'
      ],
      postedAt: '2025-06-01',
      expiresAt: '2025-06-20'
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      department: 'development',
      location: 'Faisalabad, Pakistan',
      type: 'Full-time',
      status: 'expired',
      description: 'We needed a DevOps engineer to help streamline our development and deployment processes.',
      requirements: [
        '4+ years of DevOps experience',
        'Strong knowledge of AWS, Docker, and Kubernetes',
        'Experience with CI/CD pipelines',
        'Scripting skills in Python or Bash'
      ],
      responsibilities: [
        'Manage cloud infrastructure',
        'Implement CI/CD pipelines',
        'Monitor system performance',
        'Ensure security best practices'
      ],
      postedAt: '2025-05-10',
      expiresAt: '2025-06-10'
    },
    {
      id: 4,
      title: 'Digital Marketing Specialist',
      department: 'marketing',
      location: 'Remote',
      type: 'Part-time',
      status: 'expired',
      description: 'We were looking for a digital marketing specialist to help grow our online presence.',
      requirements: [
        '2+ years of digital marketing experience',
        'Knowledge of SEO, SEM, and social media marketing',
        'Experience with Google Analytics and Ads',
        'Strong analytical and communication skills'
      ],
      responsibilities: [
        'Develop marketing strategies',
        'Manage social media accounts',
        'Create content for marketing campaigns',
        'Analyze campaign performance'
      ],
      postedAt: '2025-01-25',
      expiresAt: '2025-02-25'
    },
    {
      id: 5,
      title: 'Mobile App Developer',
      department: 'development',
      location: 'Faisalabad, Pakistan',
      type: 'Full-time',
      status: 'expired',
      description: 'We were seeking a mobile app developer to create innovative iOS and Android applications.',
      requirements: [
        '3+ years of mobile development experience',
        'Proficiency in React Native or Flutter',
        'Experience with native iOS/Android development',
        'Knowledge of mobile app deployment processes'
      ],
      responsibilities: [
        'Develop cross-platform mobile applications',
        'Optimize app performance',
        'Integrate with backend APIs',
        'Ensure app store compliance'
      ],
      postedAt: '2025-09-05',
      expiresAt: '2025-010-05'
    },
    {
      id: 6,
      title: 'Product Designer',
      department: 'design',
      location: 'Remote',
      type: 'Contract',
      status: 'expired',
      description: 'We needed a product designer to help design the next generation of our software products.',
      requirements: [
        '4+ years of product design experience',
        'Strong portfolio in SaaS product design',
        'Experience with design systems',
        'Knowledge of user research methodologies'
      ],
      responsibilities: [
        'Design product features and workflows',
        'Create and maintain design systems',
        'Conduct user interviews and testing',
        'Collaborate with product managers'
      ],
      postedAt: '2025-06-12',
      expiresAt: '2025-06-12'
    }
  ];

  const departments = [
    { id: 'all', name: 'All Departments', count: staticJobs.length },
    { id: 'development', name: 'Development', count: staticJobs.filter(job => job.department === 'development').length },
    { id: 'design', name: 'Design', count: staticJobs.filter(job => job.department === 'design').length },
    { id: 'marketing', name: 'Marketing', count: staticJobs.filter(job => job.department === 'marketing').length }
  ];

  const filteredJobs = selectedDepartment === 'all'
    ? staticJobs
    : staticJobs.filter(job => job.department === selectedDepartment);

  // Simple animation effect
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

  const handleApplicationClick = () => {
    toast.error('This position has expired. Please check back for new opportunities!');
  };



  const getDaysExpired = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = today - expiry;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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

              {/* Notice Banner */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 max-w-2xl mx-auto mb-8">
                <div className="flex items-center justify-center space-x-2 text-yellow-800 dark:text-yellow-200">
                  <FiAlertCircle className="w-5 h-5" />
                  <span className="font-medium">All current positions have expired. New opportunities coming soon!</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">0</div>
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
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${selectedDepartment === dept.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  <span>{dept.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${selectedDepartment === dept.id
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
                    className="job-card bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer group relative overflow-hidden"
                    onClick={() => openModal(job)}
                    whileHover={{ y: -2 }}
                  >
                    {/* Expired Overlay */}
                    <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg text-sm font-bold">
                      EXPIRED
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                                {job.title}
                              </h3>
                            </div>
                            <p className="text-gray-500 dark:text-gray-500 mb-4 leading-relaxed">
                              {job.description}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-500">
                            <FiMapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-500">
                            <FiClock className="w-4 h-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-500">
                            <FiUsers className="w-4 h-4" />
                            <span>{job.department}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm font-medium capitalize">
                              {job.department}
                            </span>
                            <div className="flex items-center space-x-2 text-sm text-red-500">
                              <FiCalendar className="w-4 h-4" />
                              <span>Expired {getDaysExpired(job.expiresAt)} days ago</span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApplicationClick();
                            }}
                            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-lg font-medium cursor-not-allowed flex items-center space-x-2"
                            disabled
                          >
                            <span>Position Expired</span>
                            <FiX className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-9999999">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg w-full max-w-2xl mx-aut">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedJob.title}
                </h2>
                <button onClick={closeModal} className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {selectedJob.description}
              </p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Requirements
              </h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4">
                {selectedJob.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Responsibilities
              </h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4">
                {selectedJob.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApplicationClick();
                  }}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-lg font-medium cursor-not-allowed flex items-center space-x-2"
                  disabled
                >
                  <span>Position Expired</span>
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Career;
