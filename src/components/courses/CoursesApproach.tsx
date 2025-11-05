'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckCircle } from 'phosphor-react';

export default function CoursesApproach() {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const scrollProgress = Math.max(0, Math.min(1, (window.scrollY - elementTop + window.innerHeight) / (window.innerHeight + rect.height)));
        setScrollY(scrollProgress * 20);
      }
    };

    updateWindowWidth();
    window.addEventListener('resize', updateWindowWidth);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

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
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const points = [
    'Méthode personnalisée adaptée à chaque élève',
    'Retour constant et suivi des progrès',
    'Cours interactifs basés sur la conversation et la confiance',
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 lg:py-32 overflow-hidden"
      style={{ background: '#FAF7FB' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-48 h-48 rounded-full opacity-10"
          style={{
            background: 'linear-gradient(135deg, #c99ccf, #a87db7)',
            top: '15%',
            left: '10%',
            animation: prefersReducedMotion ? 'none' : 'float 20s ease-in-out infinite',
            transform: prefersReducedMotion ? 'none' : `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <div
          className="absolute w-32 h-32 rounded-full opacity-10"
          style={{
            background: 'linear-gradient(135deg, #a87db7, #c99ccf)',
            bottom: '20%',
            right: '15%',
            animation: prefersReducedMotion ? 'none' : 'float 25s ease-in-out infinite',
            animationDelay: '3s',
            transform: prefersReducedMotion ? 'none' : `translateY(${scrollY * 0.2}px)`,
          }}
        />
      </div>

      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col space-y-6 order-1 lg:order-none">
            <h2
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
              }`}
              style={{
                fontFamily: 'var(--font-canela)',
                fontSize: windowWidth >= 1200 ? '42px' : windowWidth >= 768 ? '36px' : '32px',
                fontWeight: 400,
                color: '#2B2B2B',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
                transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
              }}
            >
              Pourquoi mes cours sont différents
            </h2>

            <div className="space-y-6">
              {points.map((point, index) => (
                <div
                  key={index}
                  className={`flex items-start transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    transitionDelay: `${0.2 + index * 0.1}s`,
                    transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                >
                  <div
                    className="flex-shrink-0 mr-4 mt-1"
                    style={{
                      color: '#c99ccf',
                    }}
                  >
                    <CheckCircle weight="fill" size={24} />
                  </div>
                  <div
                    className="flex-1"
                    style={{
                      borderLeft: '2px solid #c99ccf',
                      paddingLeft: '16px',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-satoshi)',
                        fontSize: windowWidth >= 1200 ? '18px' : '16px',
                        fontWeight: 400,
                        color: '#6C6C6C',
                        lineHeight: '1.6',
                      }}
                    >
                      {point}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden md:flex items-center justify-center order-2 lg:order-none">
            <div
              className={`relative w-full h-64 rounded-2xl transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                background: 'linear-gradient(135deg, #F2EAF6 0%, rgba(242, 234, 246, 0.3) 50%, transparent 100%)',
                transitionDelay: '0.3s',
                transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
                animation: prefersReducedMotion ? 'none' : 'float 20s ease-in-out infinite',
                transform: prefersReducedMotion ? 'none' : `translateY(${scrollY * 0.5}px)`,
              }}
            >
              <div
                className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full opacity-20"
                style={{
                  background: 'linear-gradient(135deg, #c99ccf, #a87db7)',
                  animation: prefersReducedMotion ? 'none' : 'float 15s ease-in-out infinite',
                }}
              />
              <div
                className="absolute bottom-1/4 right-1/4 w-12 h-12 rounded-full opacity-20"
                style={{
                  background: 'linear-gradient(135deg, #a87db7, #c99ccf)',
                  animation: prefersReducedMotion ? 'none' : 'float 18s ease-in-out infinite',
                  animationDelay: '1s',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

