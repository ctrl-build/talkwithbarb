'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function JournalEmptyState() {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 lg:py-32 overflow-hidden"
      style={{ background: '#FDFCFB' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-32 h-32 rounded-full opacity-5 blur-xl"
          style={{
            background: 'linear-gradient(135deg, #c99ccf, #a87db7)',
            top: '20%',
            left: '10%',
            animation: prefersReducedMotion ? 'none' : 'float 6s ease-in-out infinite',
            transform: prefersReducedMotion ? 'none' : `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div
          className="absolute w-24 h-24 rounded-full opacity-5 blur-xl"
          style={{
            background: 'linear-gradient(135deg, #a87db7, #c99ccf)',
            bottom: '30%',
            right: '15%',
            animation: prefersReducedMotion ? 'none' : 'float 8s ease-in-out infinite',
            animationDelay: '2s',
            transform: prefersReducedMotion ? 'none' : `translateY(${scrollY * 0.5}px)`,
          }}
        />
      </div>

      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <div className="max-w-[900px] mx-auto">
          <div className={`grid grid-cols-1 ${windowWidth >= 1200 ? 'lg:grid-cols-[1.2fr_1fr]' : ''} gap-12 lg:gap-16 items-center`}>
            <div className={`${windowWidth >= 1200 ? 'order-2' : 'order-1'} text-center ${windowWidth >= 1200 ? 'lg:text-left' : ''}`}>
              <div
                ref={illustrationRef}
                className={`relative mb-8 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: '0.3s',
                  transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
                  animation: prefersReducedMotion ? 'none' : 'floatVertical 5s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite',
                  transform: prefersReducedMotion ? 'none' : `translateY(${scrollY * 0.2}px)`,
                }}
              >
                <div
                  className="relative w-full max-w-md mx-auto aspect-square"
                  style={{
                    filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.08))',
                  }}
                >
                  <div
                    className="relative w-full h-full rounded-2xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #F8F2FA 0%, #FDFCFB 100%)',
                    }}
                  >
                    <Image
                      src="/assets/fonts/images/hero-image.png"
                      alt="Barb - Journal coming soon"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'radial-gradient(circle at center, transparent 0%, rgba(201,156,207,0.1) 60%, transparent 100%)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={`${windowWidth >= 1200 ? 'order-1' : 'order-2'} flex flex-col justify-center space-y-6`}>
              <div
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-canela)',
                    fontSize: windowWidth >= 1200 ? '36px' : windowWidth >= 768 ? '32px' : '28px',
                    fontWeight: 400,
                    color: '#2B2B2B',
                    lineHeight: '1.2',
                    letterSpacing: '-0.02em',
                    marginBottom: '16px',
                  }}
                >
                  Des articles arrivent bientôt
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-satoshi)',
                    fontSize: windowWidth >= 1200 ? '18px' : '16px',
                    fontWeight: 400,
                    color: '#6C6C6C',
                    lineHeight: '1.6',
                  }}
                >
                  Je prépare actuellement des articles et des conseils pour vous aider à progresser en anglais. En attendant, découvrez mes cours ou contactez-moi pour être informé·e dès leur publication !
                </p>
              </div>

              <div
                className={`flex flex-col gap-4 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: '0.5s',
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                <Link
                  href="/courses"
                  className={`inline-flex items-center justify-center px-8 rounded-full text-white font-medium transition-all duration-300 relative overflow-hidden ${
                    windowWidth < 768 ? 'w-full py-5' : 'py-4'
                  }`}
                  style={{
                    fontFamily: 'var(--font-satoshi)',
                    fontSize: '18px',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #c99ccf 0%, #a87db7 100%)',
                    backgroundSize: '200% 200%',
                    boxShadow: '0 2px 8px rgba(201,156,207,0.2)',
                    transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
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
                  Découvrez mes cours en attendant
                </Link>

                <Link
                  href="/contact"
                  className={`inline-flex items-center justify-center px-8 rounded-full font-medium transition-all duration-300 ${
                    windowWidth < 768 ? 'w-full py-5' : 'py-4'
                  }`}
                  style={{
                    fontFamily: 'var(--font-satoshi)',
                    fontSize: '18px',
                    fontWeight: 500,
                    color: '#c99ccf',
                    border: '2px solid #c99ccf',
                    background: 'transparent',
                    transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.background = 'rgba(201, 156, 207, 0.1)';
                    e.currentTarget.style.borderColor = '#a87db7';
                    e.currentTarget.style.color = '#a87db7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = '#c99ccf';
                    e.currentTarget.style.color = '#c99ccf';
                  }}
                >
                  Écrivez-moi pour recevoir mes articles dès qu&apos;ils sortent !
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

