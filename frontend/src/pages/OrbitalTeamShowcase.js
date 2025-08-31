import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUsers } from 'react-icons/fi';

const OrbitalTeamShowcase = ({ teamData = [] }) => {
    const navigate = useNavigate();
    const [visibleMembers, setVisibleMembers] = useState(new Set());
    const [hoveredMember, setHoveredMember] = useState(null);

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
            name: "Sarah Johnson",
            role: "CTO Techtornix Solutions",
            image: "/images/team/sarah-johnson.jpg",
            isCEO: false
        },
        {
            id: 3,
            name: "Mike Chen",
            role: "Lead Designer",
            image: "/images/team/mike-chen.jpg",
            isCEO: false
        },
        {
            id: 4,
            name: "Emily Davis",
            role: "Project Manager",
            image: "/images/team/emily-davis.jpg",
            isCEO: false
        },
        {
            id: 5,
            name: "Alex Rodriguez",
            role: "Full-Stack Developer",
            image: "/images/team/alex-rodriguez.jpg",
            isCEO: false
        },
        {
            id: 6,
            name: "Lisa Wang",
            role: "Mobile Developer",
            image: "/images/team/lisa-wang.jpg",
            isCEO: false
        }
    ];

    const team = teamData.length > 0 ? teamData : defaultTeam;
    const ceo = team.find(member => member.isCEO);
    const otherMembers = team.filter(member => !member.isCEO);

    // Orbital positions for team members
    const orbitalPositions = [
        // Inner orbit (2 members)
        { x: -180, y: -80, orbit: 1 },
        { x: 180, y: -80, orbit: 1 },
        // Middle orbit (2 members)
        { x: -280, y: 0, orbit: 2 },
        { x: 280, y: 120, orbit: 2 },
        // Outer orbit (1 member)
        { x: -120, y: 180, orbit: 3 }
    ];

    // Random show/hide animation for team members only
    useEffect(() => {
        // Initialize with all members visible
        setVisibleMembers(new Set(otherMembers.map(m => m.id)));

        // Function to randomly toggle a single member
        const toggleRandomMember = () => {
            if (otherMembers.length === 0) return;

            const randomMember = otherMembers[Math.floor(Math.random() * otherMembers.length)];

            setVisibleMembers(prev => {
                const newSet = new Set(prev);
                if (newSet.has(randomMember.id)) {
                    newSet.delete(randomMember.id);
                } else {
                    newSet.add(randomMember.id);
                }
                return newSet;
            });

            // Schedule next toggle with random interval (1-2 seconds)
            const randomInterval = Math.random() * 1000 + 1000; // 1000-2000ms
            setTimeout(toggleRandomMember, randomInterval);
        };

        // Start the random animation cycle
        const initialDelay = Math.random() * 1000 + 1000;
        const timeoutId = setTimeout(toggleRandomMember, initialDelay);

        return () => clearTimeout(timeoutId);
    }, [otherMembers]);

    const handleHireClick = () => {
        // SPA navigation to Contact page
        navigate('/contact');
    };

    return (
        <div className="relative w-screen h-[700px] flex items-center justify-center overflow-hidden -mx-[50vw] left-1/2">
            {/* Gradient Background */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(135deg, #0f1c47 0%, #1da1f2 100%)'
                }}
            />

            {/* Orbital Paths */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Inner orbit */}
                <div className="absolute border border-white/20 rounded-full w-[400px] h-[200px]" />
                {/* Middle orbit */}
                <div className="absolute border border-white/15 rounded-full w-[600px] h-[300px]" />
                {/* Outer orbit */}
                <div className="absolute border border-white/10 rounded-full w-[800px] h-[400px]" />
            </div>

            {/* CEO - Always Visible at Top */}
            {ceo && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-16 flex flex-col items-center z-20"
                    onMouseEnter={() => setHoveredMember(ceo.id)}
                    onMouseLeave={() => setHoveredMember(null)}
                >
                    <div className="relative">
                        <motion.img
                            src={ceo.image}
                            alt={ceo.name}
                            className="w-24 h-24 rounded-full border-4 border-white shadow-2xl object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        />
                        {/* CEO Badge */}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                            CEO
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-white font-bold text-lg">{ceo.name}</p>
                        <p className="text-white/80 text-sm">{ceo.role}</p>
                    </div>
                </motion.div>
            )}

            {/* Center Hire Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleHireClick}
                className="relative z-30 bg-white text-gray-800 px-8 py-4 rounded-full font-bold text-lg shadow-2xl flex items-center gap-3 hover:shadow-3xl transition-all duration-300"
            >
                <span>Hire a Developer</span>
                <FiUsers className="w-6 h-6 text-blue-500" />
            </motion.button>

            {/* Orbital Team Members */}
            {otherMembers.map((member, index) => {
                const position = orbitalPositions[index] || orbitalPositions[0];
                const isVisible = visibleMembers.has(member.id);

                return (
                    <div
                        key={member.id}
                        className={`absolute flex flex-col items-center cursor-pointer transition-all duration-500 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                            }`}
                        style={{
                            transform: `translate(${position.x}px, ${position.y}px) ${isVisible ? 'scale(1)' : 'scale(0.75)'}`
                        }}
                        onMouseEnter={() => setHoveredMember(member.id)}
                        onMouseLeave={() => setHoveredMember(null)}
                    >
                        <div className="relative">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-20 h-20 rounded-full border-3 border-white/80 shadow-xl object-cover hover:scale-110 hover:border-white transition-all duration-300"
                            />

                            {/* Hover Tooltip */}
                            {hoveredMember === member.id && (
                                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-40 opacity-100 transition-opacity duration-300">
                                    <div className="text-center">
                                        <p className="font-semibold">{member.name}</p>
                                        <p className="text-xs text-gray-300">{member.role}</p>
                                    </div>
                                    {/* Arrow */}
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black/90"></div>
                                </div>
                            )}
                        </div>
                    </div>
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
                            y: Math.random() * 700,
                        }}
                        animate={{
                            y: [null, -100],
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
