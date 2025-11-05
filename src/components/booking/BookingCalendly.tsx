'use client';

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

export default function BookingCalendly() {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const [calendlyInitialized, setCalendlyInitialized] = useState(false);
  const calendlyDesktopRef = useRef<HTMLDivElement>(null);
  const calendlyMobileRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

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

    updateWindowWidth();
    window.addEventListener('resize', updateWindowWidth);

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (calendlyLoaded && isVisible && window.Calendly && !calendlyInitialized) {
      const targetRef = windowWidth >= 1200 ? calendlyDesktopRef.current : calendlyMobileRef.current;
      if (targetRef) {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/your-username',
          parentElement: targetRef,
        });
        setCalendlyInitialized(true);
      }
    }
  }, [calendlyLoaded, isVisible, windowWidth, calendlyInitialized]);

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => setCalendlyLoaded(true)}
      />
      <section
        id="calendly-section"
        ref={sectionRef}
        className="relative py-20 md:py-32 lg:py-40 overflow-hidden"
        style={{
          background: '#FAF7FB',
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-32 h-32 rounded-full opacity-3"
            style={{
              background: 'linear-gradient(135deg, #c99ccf, #a87db7)',
              top: '15%',
              right: '10%',
              animation: prefersReducedMotion ? 'none' : 'float 25s ease-in-out infinite',
              transform: prefersReducedMotion ? 'none' : 'translateY(0px)',
            }}
          />
        </div>

        <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
          <div className={`max-w-6xl mx-auto transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}>
            {windowWidth >= 1200 ? (
              <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
                <div className="space-y-6">
                  <h2
                    style={{
                      fontFamily: 'var(--font-canela)',
                      fontSize: '36px',
                      fontWeight: 700,
                      color: '#2B2B2B',
                      lineHeight: '1.2',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Choisissez votre créneau
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-satoshi)',
                      fontSize: '16px',
                      fontWeight: 400,
                      color: '#6C6C6C',
                      lineHeight: '1.6',
                    }}
                  >
                    Avant de réserver, préparez vos objectifs : conversation fluide, vocabulaire professionnel ou préparation d'entretien. Cela nous aidera à personnaliser votre séance.
                  </p>
                </div>

                <div
                  className="relative rounded-2xl overflow-hidden transition-all duration-300 bg-white focus-within:ring-2 focus-within:ring-[#c99ccf] focus-within:ring-opacity-50"
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    borderRadius: '12px',
                    border: '1px solid rgba(201,156,207,0.1)',
                    outline: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c99ccf] via-[#a87db7] to-[#c99ccf]"
                    style={{
                      backgroundSize: '200% 100%',
                      animation: prefersReducedMotion ? 'none' : 'gradientShift 3s ease-in-out infinite',
                    }}
                  />
                  <div
                    ref={calendlyDesktopRef}
                    style={{
                      minWidth: '100%',
                      height: '700px',
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <h2
                    style={{
                      fontFamily: 'var(--font-canela)',
                      fontSize: windowWidth >= 768 ? '32px' : '28px',
                      fontWeight: 700,
                      color: '#2B2B2B',
                      lineHeight: '1.2',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Choisissez votre créneau
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-satoshi)',
                      fontSize: windowWidth >= 768 ? '16px' : '14px',
                      fontWeight: 400,
                      color: '#6C6C6C',
                      lineHeight: '1.6',
                      padding: windowWidth < 768 ? '0 16px' : '0',
                    }}
                  >
                    Avant de réserver, préparez vos objectifs : conversation fluide, vocabulaire professionnel ou préparation d'entretien. Cela nous aidera à personnaliser votre séance.
                  </p>
                </div>

                <div
                  className="relative rounded-2xl overflow-hidden transition-all duration-300 bg-white focus-within:ring-2 focus-within:ring-[#c99ccf] focus-within:ring-opacity-50"
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    borderRadius: '12px',
                    border: '1px solid rgba(201,156,207,0.1)',
                    outline: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c99ccf] via-[#a87db7] to-[#c99ccf]"
                    style={{
                      backgroundSize: '200% 100%',
                      animation: prefersReducedMotion ? 'none' : 'gradientShift 3s ease-in-out infinite',
                    }}
                  />
                  <div
                    ref={calendlyMobileRef}
                    style={{
                      minWidth: '100%',
                      height: '700px',
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

