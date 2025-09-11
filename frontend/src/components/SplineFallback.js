import React, { useEffect, useRef } from 'react';

const SplineFallback = ({ onLoad }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Load Spline viewer script if not already loaded
    if (!window.customElements.get('spline-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.10.53/build/spline-viewer.js';
      script.onload = () => {
        if (onLoad) onLoad();
      };
      script.onerror = () => {
        console.warn('Spline viewer failed to load');
      };
      document.head.appendChild(script);
    } else {
      if (onLoad) onLoad();
    }
  }, [onLoad]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <spline-viewer
        url="https://prod.spline.design/POB5c5dAqGxlEsk0/scene.splinecode"
        autoplay // ensures animation plays automatically
        style={{
          width: '100%',
          height: '100%',
          // borderRadius optional, remove if full-rectangle is needed
          borderRadius: '0%', 
        }}
      />
    </div>
  );
};

export default SplineFallback;
