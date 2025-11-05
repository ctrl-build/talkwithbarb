'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AboutCTABanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWindowWidth();
    window.addEventListener('resize', updateWindowWidth);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #c99ccf 0%, #a87db7 100%)',
        position: 'relative',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'gradientShift 10s ease-in-out infinite',
        }}
      />
      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <div
          className={`flex flex-col items-center text-center space-y-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-canela)',
              fontSize: '36px',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
            }}
          >
            Envie de progresser en anglais ? Parlons-en !
          </h2>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full font-medium transition-all duration-300"
            style={{
              fontFamily: 'var(--font-satoshi)',
              fontSize: '18px',
              fontWeight: 600,
              color: '#c99ccf',
              background: '#FFFFFF',
              border: '2px solid rgba(201, 156, 207, 0.5)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.background = '#c99ccf';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.color = '#c99ccf';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }}
          >
            Prendre contact
          </Link>
        </div>
      </div>
    </section>
  );
}

