'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AboutTeachingApproach() {
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

  return (
    <section
      id="teaching-approach"
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
            animation: 'float 20s ease-in-out infinite',
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <div
          className="absolute w-32 h-32 rounded-full opacity-10"
          style={{
            background: 'linear-gradient(135deg, #a87db7, #c99ccf)',
            bottom: '20%',
            right: '15%',
            animation: 'float 25s ease-in-out infinite',
            animationDelay: '3s',
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
        <div
          className="absolute w-24 h-24 rounded-full opacity-10"
          style={{
            background: 'linear-gradient(135deg, #c99ccf, #a87db7)',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) translateY(${scrollY * 0.25}px)`,
            animation: 'float 18s ease-in-out infinite',
            animationDelay: '1s',
          }}
        />
      </div>

      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col space-y-6 order-1 lg:order-none">
            <h2
              style={{
                fontFamily: 'var(--font-canela)',
                fontSize: windowWidth >= 1200 ? '42px' : windowWidth >= 768 ? '36px' : '32px',
                fontWeight: 400,
                color: '#2B2B2B',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
                marginBottom: '8px',
              }}
            >
              {isVisible && (
                <>
                  {['Apprendre', "l'anglais,", "c'est", 'avant', 'tout', 'apprendre', 'à', 'penser', 'différemment.'].map((word, index) => (
                    <span
                      key={index}
                      className="inline-block"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                        transition: `opacity 0.6s ease-out ${index * 0.05}s, transform 0.6s ease-out ${index * 0.05}s`,
                        transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)',
                        marginRight: '0.25em',
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </>
              )}
            </h2>

            <p
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                fontFamily: 'var(--font-satoshi)',
                fontSize: windowWidth >= 1200 ? '20px' : '18px',
                fontWeight: 400,
                color: '#6C6C6C',
                lineHeight: '1.6',
                transitionDelay: '0.2s',
                transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
              }}
            >
              Je crois que chaque élève apprend à son rythme. Mes cours privilégient la conversation, la confiance et la curiosité — loin des manuels rigides. Ensemble, nous adaptons chaque séance à vos besoins réels, pour que chaque mot devienne naturel et vivant.
            </p>

            <div
              className={`mt-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: '0.4s',
                transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
              }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-medium transition-all duration-300 relative overflow-hidden"
                style={{
                  fontFamily: 'var(--font-satoshi)',
                  fontSize: '18px',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #c99ccf 0%, #a87db7 100%)',
                  backgroundSize: '200% 200%',
                  boxShadow: '0 2px 8px rgba(201,156,207,0.2)',
                  transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,156,207,0.4)';
                  e.currentTarget.style.animation = 'gradientRipple 2s ease-in-out infinite';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(201,156,207,0.2)';
                  e.currentTarget.style.animation = 'none';
                }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>Réserver un premier échange</span>
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:flex items-center justify-center order-2 lg:order-none">
            <div
              className={`relative w-full h-64 rounded-2xl transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                background: 'linear-gradient(135deg, #F2EAF6 0%, rgba(242, 234, 246, 0.3) 50%, transparent 100%)',
                transitionDelay: '0.3s',
                transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
                animation: 'float 20s ease-in-out infinite',
                transform: `translateY(${scrollY * 0.5}px)`,
              }}
            >
              <div
                className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full opacity-20"
                style={{
                  background: 'linear-gradient(135deg, #c99ccf, #a87db7)',
                  animation: 'float 15s ease-in-out infinite',
                }}
              />
              <div
                className="absolute bottom-1/4 right-1/4 w-12 h-12 rounded-full opacity-20"
                style={{
                  background: 'linear-gradient(135deg, #a87db7, #c99ccf)',
                  animation: 'float 18s ease-in-out infinite',
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

