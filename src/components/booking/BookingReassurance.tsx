'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Heart } from 'phosphor-react';

export default function BookingReassurance() {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    updateWindowWidth();
    window.addEventListener('resize', updateWindowWidth);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const calendlySection = document.getElementById('calendly-section');
    if (calendlySection) {
      calendlySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 lg:py-40 overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #FAF7FB 0%, rgba(201,156,207,0.02) 50%, #FDFCFB 100%)',
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-40 h-40 rounded-full opacity-4"
          style={{
            background: 'linear-gradient(135deg, #c99ccf, #a87db7)',
            top: '20%',
            left: '8%',
            animation: prefersReducedMotion ? 'none' : 'float 22s ease-in-out infinite',
            transform: prefersReducedMotion ? 'none' : `translateY(${scrollY * 0.25}px)`,
          }}
        />
        <div
          className="absolute w-28 h-28 rounded-full opacity-4"
          style={{
            background: 'linear-gradient(135deg, #a87db7, #c99ccf)',
            bottom: '25%',
            right: '12%',
            animation: prefersReducedMotion ? 'none' : 'float 28s ease-in-out infinite',
            animationDelay: '7s',
            transform: prefersReducedMotion ? 'none' : `translateY(${scrollY * 0.15}px)`,
          }}
        />
      </div>

      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <div className={`max-w-4xl mx-auto text-center space-y-8 transition-all duration-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}>
          <div className="flex justify-center mb-4">
            <Heart
              weight="fill"
              size={32}
              style={{
                color: '#c99ccf',
                animation: prefersReducedMotion ? 'none' : 'floatVertical 4s ease-in-out infinite',
              }}
            />
          </div>

          <p
            style={{
              fontFamily: 'var(--font-satoshi)',
              fontSize: windowWidth >= 1200 ? '20px' : windowWidth >= 768 ? '18px' : '16px',
              fontWeight: 400,
              color: '#2B2B2B',
              lineHeight: '1.7',
              padding: windowWidth < 768 ? '0 16px' : '0',
            }}
          >
            Chaque cours est personnalisé pour vos besoins. J'ai hâte de vous rencontrer et de vous aider à progresser avec confiance et curiosité.
          </p>

          {windowWidth < 768 && (
            <div className="pt-4">
              <Link
                href="#calendly-section"
                onClick={handleCTAClick}
                className="w-full inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-medium transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-satoshi)',
                  fontSize: '18px',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #c99ccf 0%, #a87db7 100%)',
                  boxShadow: '0 2px 8px rgba(201,156,207,0.2)',
                  transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,156,207,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(201,156,207,0.2)';
                }}
              >
                Choisir un créneau
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

