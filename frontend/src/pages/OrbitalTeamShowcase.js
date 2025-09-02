import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUsers } from 'react-icons/fi';

const OrbitalTeamShowcase = ({ teamData = [] }) => {
  const navigate = useNavigate();
  const [visibleMembers, setVisibleMembers] = useState(new Set());
  const [hoveredMember, setHoveredMember] = useState(null);
  const [scale, setScale] = useState(1);
  const [time, setTime] = useState(0);

  // Default team data if none provided
  const defaultTeam = [
    {
      id: 1,
      name: "Muhammad Bahawal",
      role: "CEO Techtornix Solutions",
      image: "/images/team/CEO.jpg",
      isCEO: true
    },
    {
      id: 2,
      name: "Tanzila Farooq",
      role: "Co-Founder",
      image: "/images/team/tanzila-farooq.jpg",
      isCEO: false
    },
    {
      id: 3,
      name: "Sarah Johnson",
      role: "CTO Techtornix Solutions",
      image: "/images/team/sarah-johnson.jpg",
      isCEO: false
    },
    {
      id: 4,
      name: "Mike Chen",
      role: "Lead Designer",
      image: "/images/team/mike-chen.jpg",
      isCEO: false
    },
    {
      id: 5,
      name: "Emily Davis",
      role: "Project Manager",
      image: "/images/team/emily-davis.jpg",
      isCEO: false
    },
    {
      id: 6,
      name: "Alex Rodriguez",
      role: "Full-Stack Developer",
      image: "/images/team/alex-rodriguez.jpg",
      isCEO: false
    },
    {
      id: 7,
      name: "Lisa Wang",
      role: "Mobile Developer",
      image: "/images/team/lisa-wang.jpg",
      isCEO: false
    }
  ];

  const team = teamData.length > 0 ? teamData : defaultTeam;
  const ceo = team.find(member => member.isCEO);
  const cofounders = team.filter(member => member.role.includes("Co-Founder") && !member.isCEO);
  const animatedMembers = team.filter(member => !member.isCEO && !member.role.includes("Co-Founder"));

  // Define orbits (elliptical, with a as semi-major, b as semi-minor)
  const baseOrbits = [
    { a: 200, b: 100 }, // Inner orbit
    { a: 300, b: 150 }, // Middle orbit
    { a: 400, b: 200 }, // Outer orbit
    { a: 500, b: 250 }  // Last orbit for CEO and Co-Founder
  ];

  // Member assignments
  const memberAssignments = {};
  if (ceo) {
    memberAssignments[ceo.id] = { orbit: 3, initialTheta: 2.356, speed: 0, alwaysVisible: true }; // ~135 deg, top-left
  }
  cofounders.forEach((cofounder, index) => {
    memberAssignments[cofounder.id] = { orbit: 3, initialTheta: 0.785 + index * 0.1, speed: 0, alwaysVisible: true }; // ~45 deg, top-right
  });
  const animatedAssignments = [
    { orbit: 1, initialTheta: 3.927, speed: 0.001 },  // ~225 deg, lower left
    { orbit: 1, initialTheta: 5.498, speed: 0.001 },  // ~315 deg, lower right
    { orbit: 2, initialTheta: 4.712, speed: -0.0008 }, // ~270 deg, lower center
    { orbit: 2, initialTheta: 1.571, speed: -0.0008 }, // ~90 deg, upper center (adjusted sign)
    { orbit: 3, initialTheta: Math.PI, speed: 0.0012 } // 180 deg, left side
  ];
  animatedMembers.forEach((member, index) => {
    if (animatedAssignments[index]) {
      memberAssignments[member.id] = { ...animatedAssignments[index], alwaysVisible: false };
    }
  });

  // Handle responsiveness with scale based on window width
  useEffect(() => {
    const handleResize = () => {
      const maxOrbitWidth = 1100;
      const newScale = Math.min(1, window.innerWidth / maxOrbitWidth);
      setScale(newScale);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation frame for rotation
  useEffect(() => {
    let frameId;
    const frame = () => {
      setTime((prev) => prev + 1);
      frameId = requestAnimationFrame(frame);
    };
    frame();
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Random show/hide for animated members only
  useEffect(() => {
    setVisibleMembers(new Set(animatedMembers.map(m => m.id)));

    const toggleRandomMember = () => {
      if (animatedMembers.length === 0) return;
      const randomMember = animatedMembers[Math.floor(Math.random() * animatedMembers.length)];
      setVisibleMembers(prev => {
        const newSet = new Set(prev);
        if (newSet.has(randomMember.id)) {
          newSet.delete(randomMember.id);
        } else {
          newSet.add(randomMember.id);
        }
        return newSet;
      });
      const randomInterval = Math.random() * 1000 + 1000;
      setTimeout(toggleRandomMember, randomInterval);
    };

    const initialDelay = Math.random() * 1000 + 1000;
    const timeoutId = setTimeout(toggleRandomMember, initialDelay);
    return () => clearTimeout(timeoutId);
  }, [animatedMembers]);

  const handleHireClick = () => {
    navigate('/contact');
  };

  return (
    <div
      className="relative w-screen flex items-center justify-center overflow-hidden -mx-[50vw] left-1/2"
      style={{ height: `${700 * scale}px` }}
    >
      {/* Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0f1c47 0%, #1da1f2 100%)'
        }}
      />

      {/* Orbital Paths */}
      <div className="absolute inset-0 flex items-center justify-center">
        {baseOrbits.map((orbit, index) => (
          <div
            key={index}
            className="absolute border border-white/20 rounded-full"
            style={{
              width: `${2 * orbit.a * scale}px`,
              height: `${2 * orbit.b * scale}px`,
            }}
          />
        ))}
      </div>

      {/* Center Hire Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleHireClick}
        className="
    relative z-30 
    bg-white text-gray-800 
    px-3 sm:px-4 lg:px-7 
    py-1.5 sm:py-2.5 lg:py-4
    rounded-full font-bold
    text-xs sm:text-sm lg:text-lg 
    shadow-2xl flex items-center justify-center gap-1.5 sm:gap-2 
    hover:shadow-3xl transition-all duration-300 whitespace-nowrap
  "
        style={{ transform: `scale(${Math.max(0.5, scale)})` }}
      >
        <span className="truncate">Hire a Developer</span>
        <FiUsers className="w-3.5 h-3.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-500" />
      </motion.button>


      {/* Team Members */}
      {team.map((member) => {
        const assignment = memberAssignments[member.id];
        if (!assignment) return null;

        const currentTheta = assignment.speed ? assignment.initialTheta + time * assignment.speed : assignment.initialTheta;
        const orbit = baseOrbits[assignment.orbit];
        const x = orbit.a * Math.cos(currentTheta) * scale;
        const y = -orbit.b * Math.sin(currentTheta) * scale; // Flip sin for top-negative coordinate system

        const isVisible = assignment.alwaysVisible || visibleMembers.has(member.id);

        return (
          <AnimatePresence key={member.id}>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1, x, y }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{ duration: 0.5 }}
                className="absolute flex flex-col items-center z-10 cursor-pointer"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="relative">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: `${Math.max(40, 80 * scale)}px`,
                      height: `${Math.max(40, 80 * scale)}px`,
                      borderWidth: `${Math.max(2, 3 * scale)}px`
                    }}
                    className="rounded-full border-white/80 shadow-xl object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {assignment.alwaysVisible && (
                    <div
                      style={{
                        bottom: `${-Math.max(4, 8 * scale)}px`,
                        padding: `${Math.max(1, 2 * scale)}px ${Math.max(4, 8 * scale)}px`,
                        fontSize: `${Math.max(8, 12 * scale)}px`
                      }}
                      className="absolute left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black rounded-full font-bold"
                    >
                      {member.role.includes("CEO") ? "CEO" : "Co-Founder"}
                    </div>
                  )}
                  {hoveredMember === member.id && !assignment.alwaysVisible && (
                    <div
                      style={{
                        bottom: `${-Math.max(32, 64 * scale)}px`,
                        padding: `${Math.max(4, 8 * scale)}px ${Math.max(6, 12 * scale)}px`,
                      }}
                      className="absolute left-1/2 transform -translate-x-1/2 bg-black/90 text-white rounded-lg whitespace-nowrap z-40 opacity-100 transition-opacity duration-300"
                    >
                      <div className="text-center">
                        <p style={{ fontSize: `${Math.max(10, 14 * scale)}px` }} className="font-semibold">{member.name}</p>
                        <p style={{ fontSize: `${Math.max(8, 12 * scale)}px` }} className="text-gray-300">{member.role}</p>
                      </div>
                      <div
                        style={{
                          transform: `translateY(${-Math.max(2, 4 * scale)}px) translateX(-50%)`,
                          borderLeftWidth: `${Math.max(2, 4 * scale)}px`,
                          borderRightWidth: `${Math.max(2, 4 * scale)}px`,
                          borderBottomWidth: `${Math.max(2, 4 * scale)}px`
                        }}
                        className="absolute top-0 left-1/2 w-0 h-0 border-l-transparent border-r-transparent border-b-black/90"
                      ></div>
                    </div>
                  )}
                </div>
                {assignment.alwaysVisible && (
                  <div style={{ marginTop: `${Math.max(8, 16 * scale)}px` }} className="text-center">
                    <p style={{ fontSize: `${Math.max(12, 18 * scale)}px` }} className="text-white font-bold">{member.name}</p>
                    <p style={{ fontSize: `${Math.max(10, 14 * scale)}px` }} className="text-white/80">{member.role}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * (700 * scale),
            }}
            animate={{
              y: [null, -100 * scale],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default OrbitalTeamShowcase;