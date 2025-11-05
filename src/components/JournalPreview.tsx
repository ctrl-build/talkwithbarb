'use client';

import { useState, useEffect, useRef } from 'react';

export default function JournalPreview() {
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
      className="relative py-20 md:py-24 lg:py-32"
      style={{ background: '#FDFCFB' }}
    >
      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className={`transition-all duration-700 mb-6 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
            style={{
              fontFamily: 'var(--font-canela)',
              fontSize: windowWidth >= 1200 ? '48px' : windowWidth >= 768 ? '42px' : '36px',
              fontWeight: 400,
              color: '#2B2B2B',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
            }}
          >
            Journal
          </h2>

          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: '0.2s',
              transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-satoshi)',
                fontSize: windowWidth >= 768 ? '20px' : '18px',
                fontWeight: 400,
                color: '#6C6C6C',
                lineHeight: '1.6',
                marginBottom: '32px',
              }}
            >
              Des réflexions et conseils sur l&apos;apprentissage de l&apos;anglais arrivent bientôt.
            </p>

            <div
              className="mx-auto mb-8"
              style={{
                width: '60px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #c99ccf, transparent)',
              }}
            />
          </div>

          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: '0.4s',
              transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-satoshi)',
                fontSize: '16px',
                fontWeight: 400,
                color: '#6C6C6C',
                lineHeight: '1.5',
              }}
            >
              Restez informé
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
