import React, { useState, useRef, useEffect, useCallback, useMemo, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { geminiService } from '../config/gemini';

// Lazy load Spline component for performance
const Spline = lazy(() => import('@splinetool/react-spline'));

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi! I'm TechTorix, your AI assistant powered by TechTornix Solutions. I'm here to help you learn about TechTornix and answer your technology questions! ",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [splineLoaded, setSplineLoaded] = useState(false);
    const widgetRef = useRef(null);
    const messagesEndRef = useRef(null);

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Initialize position to bottom-right corner
    useEffect(() => {
        const updatePosition = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const offset = isMobile ? 30 : 120; // Increased offset to position above bottom

            setPosition({
                x: windowWidth - offset,
                y: windowHeight - offset
            });
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        return () => window.removeEventListener('resize', updatePosition);
    }, [isMobile]);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Memoized chat window dimensions
    const chatDimensions = useMemo(() => {
        if (isMobile) {
            return {
                width: Math.min(window.innerWidth - 20, 350),
                height: Math.min(window.innerHeight - 100, 450),
                left: 10,
                top: 60
            };
        }
        return {
            width: 360,
            height: 480,
            left: Math.min(position.x, window.innerWidth - 380),
            top: Math.max(20, position.y - 500)
        };
    }, [isMobile, position]);

    // Optimized drag handlers
    const handleMouseDown = useCallback((e) => {
        if (isOpen || isMobile) return;
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    }, [isOpen, isMobile, position]);

    const handleTouchStart = useCallback((e) => {
        if (isOpen) return;
        setIsDragging(true);
        const touch = e.touches[0];
        setDragStart({
            x: touch.clientX - position.x,
            y: touch.clientY - position.y
        });
    }, [isOpen, position]);

    const handleMouseMove = useCallback((e) => {
        if (!isDragging) return;
        e.preventDefault();
        const iconSize = isMobile ? 96 : 128;
        const newX = Math.max(0, Math.min(window.innerWidth - iconSize, e.clientX - dragStart.x));
        const newY = Math.max(0, Math.min(window.innerHeight - iconSize, e.clientY - dragStart.y));
        setPosition({ x: newX, y: newY });
    }, [isDragging, dragStart, isMobile]);

    const handleTouchMove = useCallback((e) => {
        if (!isDragging) return;
        e.preventDefault();
        const touch = e.touches[0];
        const iconSize = isMobile ? 96 : 128;
        const newX = Math.max(0, Math.min(window.innerWidth - iconSize, touch.clientX - dragStart.x));
        const newY = Math.max(0, Math.min(window.innerHeight - iconSize, touch.clientY - dragStart.y));
        setPosition({ x: newX, y: newY });
    }, [isDragging, dragStart, isMobile]);

    const handleDragEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

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

    const handleSendMessage = useCallback(async () => {
        if (!inputMessage.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputMessage;
        setInputMessage('');
        setIsTyping(true);

        try {
            // Use Gemini API service
            const response = await geminiService.sendMessage(currentInput);

            const botResponse = {
                id: Date.now() + 1,
                text: response,
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error('Error getting response:', error);
            const errorResponse = {
                id: Date.now() + 1,
                text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or feel free to contact us directly at bahawal.dev@gmail.com for immediate assistance! 🔧",
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsTyping(false);
        }
    }, [inputMessage]);

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }, [handleSendMessage]);

    // Spline loading handler
    const onSplineLoad = useCallback(() => {
        setSplineLoaded(true);
    }, []);

    const iconSize = isMobile ? 'w-20 h-20' : 'w-24 h-24';

    return (
        <>
            {/* Floating 3D Robot Icon */}
            <motion.div
                ref={widgetRef}
                className="fixed z-50 cursor-pointer select-none"
                style={{
                    left: position.x,
                    top: position.y,
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                whileHover={{ scale: isMobile ? 1.05 : 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.div
                    className={`${iconSize} flex items-center justify-center transition-all duration-300 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'
                        }`}
                    animate={{
                        filter: isOpen
                            ? 'drop-shadow(0 12px 40px rgba(55, 183, 195, 0.4))'
                            : 'drop-shadow(0 8px 25px rgba(55, 183, 195, 0.3))',
                    }}
                    onClick={(e) => {
                        if (!isDragging) {
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                        }
                    }}
                >
                    {/* 3D Spline Robot */}
                    <div className="w-full h-full relative">
                        <Suspense fallback={
                            <div className="w-full h-full flex items-center justify-center text-4xl">
                                🤖
                            </div>
                        }>
                            <Spline
                                scene="https://prod.spline.design/POB5c5dAqGxlEsk0/scene.splinecode"
                                onLoad={onSplineLoad}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </Suspense>

                        {/* Fallback for when Spline fails to load */}
                        {!splineLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center text-4xl">

                            </div>
                        )}

                        {/* Close icon overlay when chat is open */}
                        {isOpen && (
                            <motion.div
                                className="absolute top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:bg-red-600 transition-colors"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                                }}
                                onClick={() => setIsOpen(false)}
                            >
                                ✕
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Notification Badge */}
                {!isOpen && (
                    <motion.div
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    >
                        !
                    </motion.div>
                )}
            </motion.div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={`fixed bg-white rounded-lg shadow-2xl border border-gray-200 ${isMobile ? 'w-80 h-96' : 'w-96 h-[28rem]'
                            } flex flex-col`}
                        style={{
                            right: isMobile ? '1rem' : '1.5rem',
                            bottom: isMobile ? '5rem' : '6rem',
                            zIndex: 9999999,
                        }}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {/* Chat Header */}
                        <div
                            className="p-4 text-white flex items-center justify-between"
                            style={{
                                background: 'linear-gradient(135deg, #37b7c3 0%, #071952 100%)',
                            }}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                    🤖
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">TechBot</h3>
                                    <p className="text-xs opacity-90">AI Assistant • Online</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            className="flex-1 p-4 overflow-y-auto bg-gray-50"
                            style={{ height: chatDimensions.height - 140 }}
                        >
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs px-4 py-3 rounded-2xl ${message.sender === 'user'
                                            ? 'bg-gradient-to-r from-[#37b7c3] to-[#071952] text-white'
                                            : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                                        <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-white opacity-70' : 'text-gray-500'}`}>
                                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start mb-4"
                                >
                                    <div className="bg-white text-gray-800 shadow-sm border border-gray-200 px-4 py-3 rounded-2xl">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex space-x-1">
                                                <motion.div
                                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                                    animate={{ y: [0, -5, 0] }}
                                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                                />
                                                <motion.div
                                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                                    animate={{ y: [0, -5, 0] }}
                                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                                />
                                                <motion.div
                                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                                    animate={{ y: [0, -5, 0] }}
                                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                                />
                                            </div>
                                            <span className="text-xs text-gray-500">TechBot is typing...</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t bg-white">
                            <div className="flex space-x-3">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask me about TechTornix or tech topics..."
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#37b7c3] focus:border-transparent text-sm bg-white text-gray-900 placeholder-gray-500"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSendMessage}
                                    disabled={!inputMessage.trim()}
                                    className="px-5 py-3 bg-gradient-to-r from-[#37b7c3] to-[#071952] text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                >
                                    ➤
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatbotWidget;
