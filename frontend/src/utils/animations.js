import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

export const initializeGSAP = () => {
  // Set default ease
  gsap.defaults({ ease: "power2.out", duration: 1 });
  
  // Refresh ScrollTrigger on resize
  ScrollTrigger.addEventListener("refresh", () => ScrollTrigger.refresh());
};

// Animation presets
export const animations = {
  // Fade animations
  fadeIn: {
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  },
  
  fadeInUp: {
    opacity: 0,
    y: 60,
    duration: 0.8,
    ease: "power2.out"
  },
  
  fadeInDown: {
    opacity: 0,
    y: -60,
    duration: 0.8,
    ease: "power2.out"
  },
  
  fadeInLeft: {
    opacity: 0,
    x: -60,
    duration: 0.8,
    ease: "power2.out"
  },
  
  fadeInRight: {
    opacity: 0,
    x: 60,
    duration: 0.8,
    ease: "power2.out"
  },
  
  // Scale animations
  scaleIn: {
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    ease: "back.out(1.7)"
  },
  
  // Stagger animations
  staggerUp: {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
  }
};

// Typing animation
export const typeWriter = (element, text, options = {}) => {
  const {
    speed = 0.05,
    delay = 0,
    cursor = true,
    onComplete = () => {}
  } = options;

  const tl = gsap.timeline({ delay });
  
  tl.to(element, {
    duration: text.length * speed,
    text: text,
    ease: "none",
    onComplete
  });

  if (cursor) {
    tl.to(element, {
      duration: 0.5,
      opacity: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    }, "+=0.5");
  }

  return tl;
};

// Scroll-triggered animations
export const scrollAnimation = (trigger, animation, options = {}) => {
  const {
    start = "top 80%",
    end = "bottom 20%",
    scrub = false,
    pin = false,
    ...animationProps
  } = options;

  return gsap.fromTo(trigger, animation, {
    ...animationProps,
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
      pin,
      toggleActions: "play none none reverse"
    }
  });
};

// Magnetic effect for buttons
export const magneticEffect = (element, strength = 0.3) => {
  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Parallax effect
export const parallaxEffect = (element, speed = 0.5) => {
  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
};

// Logo assembly animation
export const logoAssembly = (container) => {
  const pieces = container.querySelectorAll('.logo-piece');
  const tl = gsap.timeline();

  // Initial state - pieces scattered and rotated
  gsap.set(pieces, {
    x: () => gsap.utils.random(-200, 200),
    y: () => gsap.utils.random(-200, 200),
    rotation: () => gsap.utils.random(-180, 180),
    scale: 0.5,
    opacity: 0.7
  });

  // Animate pieces falling and assembling
  tl.to(pieces, {
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
    opacity: 1,
    duration: 1.5,
    stagger: 0.1,
    ease: "back.out(1.7)"
  })
  .to(container, {
    scale: 1.1,
    duration: 0.3,
    ease: "power2.out"
  })
  .to(container, {
    scale: 1,
    duration: 0.3,
    ease: "elastic.out(1, 0.3)"
  });

  return tl;
};

// Tech stack hover animation
export const techStackHover = (element) => {
  const tl = gsap.timeline({ paused: true });
  
  tl.to(element, {
    rotationY: 15,
    rotationX: 5,
    scale: 1.05,
    duration: 0.3,
    ease: "power2.out"
  })
  .to(element.querySelector('.tech-shine'), {
    opacity: 1,
    x: "100%",
    duration: 0.6,
    ease: "power2.inOut"
  }, 0);

  return tl;
};

// Counter animation
export const counterAnimation = (element, endValue, options = {}) => {
  const {
    duration = 2,
    ease = "power2.out",
    suffix = "",
    prefix = ""
  } = options;

  const obj = { value: 0 };
  
  return gsap.to(obj, {
    value: endValue,
    duration,
    ease,
    onUpdate: () => {
      element.textContent = prefix + Math.round(obj.value) + suffix;
    }
  });
};

// Page transition animations
export const pageTransitions = {
  slideIn: {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },
  
  scaleIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.1, opacity: 0 },
    transition: { duration: 0.3 }
  }
};

// Navbar animation
export const navbarAnimation = (navbar, isScrolled) => {
  return gsap.to(navbar, {
    backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
    backdropFilter: isScrolled ? "blur(10px)" : "none",
    boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none",
    duration: 0.3,
    ease: "power2.out"
  });
};

// Service dropdown animation
export const dropdownAnimation = (dropdown, isOpen) => {
  const tl = gsap.timeline();
  
  if (isOpen) {
    tl.set(dropdown, { display: "block", opacity: 0, y: -10 })
      .to(dropdown, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
  } else {
    tl.to(dropdown, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: "power2.in"
    })
    .set(dropdown, { display: "none" });
  }
  
  return tl;
};
