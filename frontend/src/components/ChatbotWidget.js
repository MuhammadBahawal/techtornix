// src/components/ChatbotWidget.js
import React, { useState, useRef, useEffect, useCallback, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { geminiService } from '../config/gemini';

// Lazy load Spline component for performance
const Spline = lazy(() => import('@splinetool/react-spline'));

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi! I'm TechBot, your AI assistant powered by TechTornix Solutions. I'm here to help with questions about our services, technologies, and more! ",
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [position, setPosition] = useState(() => {
        // Initialize with correct position immediately
        if (typeof window !== 'undefined') {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const isMobileCheck = windowWidth <= 768;
            // Better mobile positioning - more distance from bottom
            const offsetX = isMobileCheck ? 24 : 100;
            const offsetY = isMobileCheck ? 120 : 100; // Increased from 80 to 120 for mobile
            return {
                x: windowWidth - offsetX - (isMobileCheck ? 64 : 80), // Account for icon size
                y: windowHeight - offsetY,
            };
        }
        return { x: 0, y: 0 }; // Fallback for SSR
    });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [splineLoaded, setSplineLoaded] = useState(false);
    const [touchStartTime, setTouchStartTime] = useState(0);
    const widgetRef = useRef(null);
    const messagesEndRef = useRef(null);
    const chatWindowRef = useRef(null);

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Initialize position to bottom-right corner with better mobile spacing
    useEffect(() => {
        const updatePosition = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const offsetX = isMobile ? 24 : 100;
            const offsetY = isMobile ? 120 : 100; // Better distance from bottom on mobile
            const iconSize = isMobile ? 64 : 80;
            setPosition({
                x: windowWidth - offsetX - iconSize,
                y: windowHeight - offsetY,
            });
        };
        updatePosition();
        window.addEventListener('resize', updatePosition);
        return () => window.removeEventListener('resize', updatePosition);
    }, [isMobile]);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Desktop drag handlers
    const handleMouseDown = useCallback(
        (e) => {
            if (isOpen) return; // Allow dragging on desktop even when mobile
            setIsDragging(true);
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y,
            });
        },
        [isOpen, position]
    );

    // Mobile touch handlers - Fixed for proper touch and hold dragging
    const handleTouchStart = useCallback(
        (e) => {
            if (isOpen) return;
            const touch = e.touches[0];
            const startTime = Date.now();
            setTouchStartTime(startTime);

            // Set up for potential drag
            setDragStart({
                x: touch.clientX - position.x,
                y: touch.clientY - position.y,
            });

            // Start drag after short delay (150ms) to distinguish from tap
            setTimeout(() => {
                if (Date.now() - startTime >= 150 && !isOpen) {
                    setIsDragging(true);
                }
            }, 150);
        },
        [isOpen, position]
    );

    const handleMouseMove = useCallback(
        (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const iconSize = isMobile ? 64 : 80;
            const newX = Math.max(20, Math.min(window.innerWidth - iconSize - 20, e.clientX - dragStart.x));
            const newY = Math.max(20, Math.min(window.innerHeight - iconSize - 20, e.clientY - dragStart.y));
            setPosition({ x: newX, y: newY });
        },
        [isDragging, dragStart, isMobile]
    );

    const handleTouchMove = useCallback(
        (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const touch = e.touches[0];
            const iconSize = isMobile ? 64 : 80;
            const newX = Math.max(20, Math.min(window.innerWidth - iconSize - 20, touch.clientX - dragStart.x));
            const newY = Math.max(20, Math.min(window.innerHeight - iconSize - 20, touch.clientY - dragStart.y));
            setPosition({ x: newX, y: newY });
        },
        [isDragging, dragStart, isMobile]
    );

    const handleDragEnd = useCallback(() => {
        setIsDragging(false);
        setTouchStartTime(0);
    }, []);

    // Click/tap handler - only triggers if not dragging
    const handleRobotClick = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();

        // For mobile, only open if it was a quick tap (not a drag)
        if (isMobile) {
            const touchDuration = Date.now() - touchStartTime;
            if (touchDuration > 200 || isDragging) return; // Was a drag, not a tap
        }

        setIsOpen(!isOpen);
    }, [isOpen, isMobile, touchStartTime, isDragging]);

    // Touch end handler for mobile
    const handleTouchEnd = useCallback((e) => {
        const touchDuration = Date.now() - touchStartTime;

        if (isDragging) {
            handleDragEnd();
            return;
        }

        // If it was a quick tap, open the chat
        if (touchDuration < 200) {
            handleRobotClick(e);
        }
    }, [touchStartTime, isDragging, handleDragEnd, handleRobotClick]);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleDragEnd);
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleDragEnd);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleDragEnd);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleDragEnd);
        };
    }, [isDragging, handleMouseMove, handleTouchMove, handleDragEnd]);

    // Send message handler with Gemini integration and fallback
    const handleSendMessage = useCallback(async () => {
        if (!inputMessage.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        const currentInput = inputMessage;
        setInputMessage('');
        setIsTyping(true);

        try {
            const response = await geminiService.sendMessage(currentInput);
            const botResponse = {
                id: Date.now() + 1,
                text: response,
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
        } catch (error) {
            console.error('TechTornix API Error:', error);
            const fallbackResponse = getFallbackResponse(currentInput);
            const botResponse = {
                id: Date.now() + 1,
                text: fallbackResponse + '\n\n(something went wrong)',
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
        } finally {
            setIsTyping(false);
        }
    }, [inputMessage]);

    const handleKeyPress = useCallback(
        (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
            }
        },
        [handleSendMessage]
    );

    // Fallback response system (from your first file, enhanced)
    const getFallbackResponse = (message) => {
        const msg = message.toLowerCase();

        if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
            return 'Hello! Welcome to TechTornix Solutions. How can I assist you today?';
        }

        if (msg.includes('techtornix') || msg.includes('company') || msg.includes('about')) {
            return 'TechTornix Solutions is a leading technology company owned by Muhammad Bahawal, specializing in custom software development, web and mobile apps, AI/ML, cloud services, and digital transformation.';
        }

        if (msg.includes('service') || msg.includes('what do you do') || msg.includes('offer')) {
            return 'We offer: Custom Software Development, Web & Mobile Apps, AI Integration, Cloud Solutions, Digital Consulting.';
        }

        if (msg.includes('team') || msg.includes('who') || msg.includes('founder') || msg.includes('ceo') || msg.includes('cto') || msg.includes('coo') || msg.includes('co-founder')) {
            return 'Our team: CEO - Muhammad Bahawal, COO - Tanzela Farooq, CTO - Muhammad Adeel.';
        }

        if (msg.includes('contact') || msg.includes('reach') || msg.includes('email')) {
            return 'Contact us at: visit techtornix.com.';
        }

        if (msg.includes('price') || msg.includes('cost') || msg.includes('quote')) {
            return 'Pricing is customized. Contact us for a free quote at info@techtornix.com';
        }

        if (msg.includes('technology') || msg.includes('tech') || msg.includes('stack')) {
            return 'Tech stacks: Frontend - React, Vue, Angular; Backend - Node.js, Python; Databases - MongoDB, PostgreSQL; Cloud - AWS, Azure; AI - TensorFlow, Gemini.';
        }

        if (msg.includes('portfolio') || msg.includes('work') || msg.includes('projects')) {
            return 'Check our portfolio on techtornix.com for case studies and projects.';
        }

        if (msg.includes('thank') || msg.includes('thanks')) {
            return "You're welcome! Feel free to ask more.";
        }

        return 'I can help with TechTornix info, services, or tech queries. What would you like to know?';
    };

    // Spline loading handler
    const onSplineLoad = useCallback(() => {
        setSplineLoaded(true);
    }, []);

    const iconSize = isMobile ? 'w-16 h-16' : 'w-20 h-20';

    // Dynamic chat window position with better mobile handling
    const chatStyle = isMobile
        ? {
            width: 'calc(100% - 1rem)',
            height: 'calc(100vh - 6rem)',
            left: '0.5rem',
            top: '3rem',
            right: 'auto',
            bottom: 'auto',
        }
        : {
            width: '400px',
            height: '550px',
            left: `${Math.max(20, position.x - 400 + 100)}px`, // Align to left of icon
            top: `${Math.max(20, position.y - 550)}px`,
            right: 'auto',
            bottom: 'auto',
        };

    return (
        <>
            {/* Floating 3D Robot Icon - Only show when chat is closed */}
            {!isOpen && (
                <motion.div
                    ref={widgetRef}
                    className="fixed z-[9999] cursor-pointer select-none"
                    style={{
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                    }}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onClick={!isMobile ? handleRobotClick : undefined}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* 3D Spline Robot - No background wrapper */}
                    <div className={`${iconSize} relative`}>
                        <Suspense
                            fallback={
                                <div className={`${iconSize} flex items-center justify-center text-white text-3xl`}>
                                    🤖
                                </div>
                            }
                        >
                            <Spline
                                scene="https://prod.spline.design/POB5c5dAqGxlEsk0/scene.splinecode"
                                onLoad={onSplineLoad}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </Suspense>
                        {!splineLoaded && (
                            <div className={`${iconSize} flex items-center justify-center text-white text-3xl`}>
                                🤖
                            </div>
                        )}

                        {/* Notification Badge */}
                        {messages.length === 1 && (
                            <motion.div
                                className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                            >
                                !
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={chatWindowRef}
                        className="fixed bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col z-[9999999999]"
                        style={chatStyle}
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        {/* Chat Header */}
                        <div
                            className="p-5 text-white flex items-center justify-between rounded-t-3xl"
                            style={{
                                background: 'linear-gradient(135deg, #37b7c3 0%, #071952 100%)',
                            }}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <span className="text-xl">🤖</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">TechBot</h3>
                                    <p className="text-xs opacity-90 flex items-center">
                                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                                        AI Assistant • Online
                                    </p>
                                </div>
                            </div>
                            {/* Close button - larger on mobile for better touch target */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsOpen(false)}
                                className={`${isMobile ? 'w-10 h-10' : 'w-8 h-8'
                                    } bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors`}
                            >
                                <span className={`${isMobile ? 'text-lg' : 'text-base'}`}>✕</span>
                            </motion.button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-5 overflow-y-auto bg-gradient-to-b from-gray-50 to-white space-y-4">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-md ${message.sender === 'user'
                                            ? 'bg-gradient-to-r from-[#37b7c3] to-[#071952] text-white'
                                            : 'bg-white text-gray-800 border border-gray-100'
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                                        <p
                                            className={`text-xs mt-2 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                                                }`}
                                        >
                                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white text-gray-800 shadow-md border border-gray-100 px-4 py-3 rounded-2xl flex items-center space-x-2">
                                        <motion.div
                                            className="w-2 h-2 bg-[#37b7c3] rounded-full"
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                        />
                                        <motion.div
                                            className="w-2 h-2 bg-[#37b7c3] rounded-full"
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                        />
                                        <motion.div
                                            className="w-2 h-2 bg-[#37b7c3] rounded-full"
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                        />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100 flex space-x-3">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about TechTornix or technology..."
                                className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#37b7c3] focus:border-transparent text-sm bg-gray-50 text-gray-900 placeholder-gray-500 transition-all"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSendMessage}
                                disabled={!inputMessage.trim() || isTyping}
                                className="w-12 h-12 bg-gradient-to-r from-[#37b7c3] to-[#071952] text-white rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    />
                                </svg>
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatbotWidget;