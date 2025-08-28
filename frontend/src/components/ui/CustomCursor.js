import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const onMouseEnter = () => {
      gsap.to([cursor, follower], {
        opacity: 1,
        duration: 0.2
      });
    };

    const onMouseLeave = () => {
      gsap.to([cursor, follower], {
        opacity: 0,
        duration: 0.2
      });
    };

    const onMouseDown = () => {
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.1
      });
      gsap.to(follower, {
        scale: 0.8,
        duration: 0.1
      });
    };

    const onMouseUp = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.1
      });
      gsap.to(follower, {
        scale: 1,
        duration: 0.1
      });
    };

    // Handle hover effects for interactive elements
    const handleHoverElements = () => {
      const hoverElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
      
      hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(follower, {
            scale: 1.5,
            duration: 0.2,
            ease: "power2.out"
          });
        });

        el.addEventListener('mouseleave', () => {
          gsap.to(follower, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        });
      });
    };

    // Initialize
    gsap.set([cursor, follower], {
      xPercent: -50,
      yPercent: -50,
      opacity: 0
    });

    // Event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    // Handle hover elements
    handleHoverElements();

    // Re-initialize hover elements when DOM changes
    const observer = new MutationObserver(handleHoverElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
    };
  }, []);

  // Hide on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor-dot fixed top-0 left-0 w-2 h-2 bg-primary-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={followerRef}
        className="cursor-outline fixed top-0 left-0 w-8 h-8 border-2 border-primary-500 rounded-full pointer-events-none z-[9998] opacity-50"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default CustomCursor;
