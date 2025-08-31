import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const AnimatedHeaderLogo = () => {
    const logoRef = useRef(null);
    const containerRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        const logo = logoRef.current;
        const container = containerRef.current;

        if (!logo || !container) return;

        // Create floating particles around logo
        const createParticles = () => {
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.className = 'absolute w-2 h-2 rounded-full opacity-20';
                particle.style.background = 'linear-gradient(135deg, #37b7c3, #071952)';
                container.appendChild(particle);
                particlesRef.current.push(particle);

                // Animate particles in orbit
                gsap.set(particle, {
                    x: Math.cos((i * Math.PI * 2) / 8) * 60,
                    y: Math.sin((i * Math.PI * 2) / 8) * 60,
                });

                gsap.to(particle, {
                    rotation: 360,
                    transformOrigin: '-60px 0px',
                    duration: 15 + i * 2,
                    repeat: -1,
                    ease: 'none',
                });

                // Pulsing effect
                gsap.to(particle, {
                    scale: 1.5,
                    opacity: 0.6,
                    duration: 2 + i * 0.3,
                    repeat: -1,
                    yoyo: true,
                    ease: 'power2.inOut',
                });
            }
        };

        // Logo hover animations
        const setupLogoAnimations = () => {
            // Continuous gentle rotation
            gsap.to(logo, {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: 'none',
            });

            // Floating effect
            gsap.to(logo, {
                y: -10,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut',
            });

            // Scale on hover
            logo.addEventListener('mouseenter', () => {
                gsap.to(logo, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            });

            logo.addEventListener('mouseleave', () => {
                gsap.to(logo, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            });
        };

        createParticles();
        setupLogoAnimations();

        return () => {
            // Cleanup particles
            particlesRef.current.forEach(particle => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            });
            particlesRef.current = [];
        };
    }, []);

    return (
        <motion.div
            ref={containerRef}
            className="relative w-32 h-32 lg:w-40 lg:h-40 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            {/* Animated background rings */}
            <div className="absolute inset-0 rounded-full border-2 border-[#37b7c3]/20 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full border border-[#071952]/30 animate-ping"></div>

            {/* Gradient background */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#37b7c3]/10 to-[#071952]/10 backdrop-blur-sm"></div>

            {/* Logo */}
            <motion.img
                ref={logoRef}
                src="/images/logos/techtornix-iconLogo.png"
                alt="Techtornix Logo"
                className="relative z-10 w-16 h-16 lg:w-20 lg:h-20 object-contain cursor-pointer filter drop-shadow-lg"
                whileHover={{
                    filter: "drop-shadow(0 0 20px rgba(55, 183, 195, 0.5))",
                    transition: { duration: 0.3 }
                }}
            />

            {/* Glowing effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#37b7c3] to-[#071952] opacity-0 blur-xl group-hover:opacity-20 transition-opacity duration-500"></div>

            {/* Tech grid pattern overlay */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <defs>
                        <pattern id="tech-grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#37b7c3" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#tech-grid)" />
                </svg>
            </div>
        </motion.div>
    );
};

export default AnimatedHeaderLogo;
