'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function JournalHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    updateWindowWidth();
    window.addEventListener('resize', updateWindowWidth);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #FDFCFB 0%, rgba(201,156,207,0.03) 50%, #FDFCFB 100%)',
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-64 h-64 rounded-full opacity-5"
          style={{
            background: 'linear-gradient(135deg, #c99ccf, #a87db7)',
            top: '10%',
            left: '5%',
            animation: prefersReducedMotion ? 'none' : 'float 20s ease-in-out infinite',
            transform: prefersReducedMotion ? 'none' : `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <div
          className="absolute w-48 h-48 rounded-full opacity-5"
          style={{
            background: 'linear-gradient(135deg, #a87db7, #c99ccf)',
            bottom: '20%',
            right: '10%',
            animation: prefersReducedMotion ? 'none' : 'float 25s ease-in-out infinite',
            animationDelay: '5s',
            transform: prefersReducedMotion ? 'none' : `translateY(${scrollY * 0.2}px)`,
          }}
        />
      </div>

      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <div className="max-w-[900px] mx-auto text-center">
          <h1
            className={`mb-6 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
            style={{
              fontFamily: 'var(--font-canela)',
              fontSize: windowWidth >= 1200 ? '48px' : windowWidth >= 768 ? '40px' : '32px',
              fontWeight: 700,
              color: '#2B2B2B',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)',
            }}
          >
            <span className="relative inline-block">
              Journal de TalkWithBarb
              <span
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c99ccf] to-transparent"
                style={{
                  opacity: 0.4,
                  borderRadius: '2px',
                  marginTop: '8px',
                }}
              />
            </span>
          </h1>

          <p
            className={`mb-8 transition-all duration-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              fontFamily: 'var(--font-satoshi)',
              fontSize: windowWidth >= 1200 ? '18px' : '16px',
              fontWeight: 400,
              color: '#6C6C6C',
              lineHeight: '1.6',
              transitionDelay: '0.2s',
              transitionDuration: '0.4s',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            Articles, conseils et réflexions pour progresser en anglais. Patience… ils arrivent bientôt !
          </p>

          <div
            className={`transition-all duration-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: '0.4s',
              transitionDuration: '0.4s',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <Link
              href="/courses"
              className={`inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-medium transition-all duration-300 relative overflow-hidden ${
                windowWidth < 768 ? 'w-full max-w-sm' : ''
              }`}
              style={{
                fontFamily: 'var(--font-satoshi)',
                fontSize: '18px',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #c99ccf 0%, #a87db7 100%)',
                backgroundSize: '200% 200%',
                boxShadow: '0 2px 8px rgba(201,156,207,0.2)',
                transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
                animation: prefersReducedMotion ? 'none' : 'breathe 4s ease-in-out infinite',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,156,207,0.4)';
                e.currentTarget.style.animation = 'gradientRipple 2s ease-in-out infinite';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(201,156,207,0.2)';
                e.currentTarget.style.animation = 'breathe 4s ease-in-out infinite';
              }}
            >
              Voir mes cours
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

