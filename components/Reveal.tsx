import React, { useEffect, useRef, useState } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  className?: string;
  fullWidth?: boolean;
}

const Reveal: React.FC<RevealProps> = ({ 
  children, 
  delay = 0, 
  duration = 1000,
  direction = 'up', 
  className = '',
  fullWidth = false 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, []);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return 'translate-y-12';
      case 'down': return '-translate-y-12';
      case 'left': return '-translate-x-12';
      case 'right': return 'translate-x-12';
      default: return '';
    }
  };

  return (
    <div 
      ref={ref} 
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <div
        className={`transform transition-all cubic-bezier(0.17, 0.55, 0.55, 1) ${
          isVisible 
            ? 'opacity-100 translate-y-0 translate-x-0 blur-0' 
            : `opacity-0 ${getInitialTransform()} blur-[2px]`
        }`}
        style={{ 
          transitionDuration: `${duration}ms`,
          transitionDelay: `${delay}ms`,
          transitionTimingFunction: 'cubic-bezier(0.2, 0.65, 0.3, 0.9)'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Reveal;