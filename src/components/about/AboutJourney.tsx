'use client';

import { useState, useEffect, useRef } from 'react';

export default function AboutJourney() {
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
        setScrollY(scrollProgress * 30);
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
      ref={sectionRef}
      className="relative py-20 md:py-24 lg:py-32"
      style={{ background: '#FDFCFB' }}
    >
      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <div className="max-w-4xl mx-auto">
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
            }}
          >
            <div
              className="mb-8"
              style={{
                transform: `translateY(${scrollY * 0.05}px)`,
              }}
            >
              <svg
                className="w-full h-auto"
                viewBox="0 0 1200 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  stroke: '#c99ccf',
                  strokeWidth: '2',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  opacity: 0.3,
                }}
              >
                <path
                  d="M50 5 Q300 3, 600 5 T1150 5"
                  style={{
                    fill: 'none',
                    strokeDasharray: '1200',
                    strokeDashoffset: isVisible ? '0' : '1200',
                    transition: isVisible ? 'stroke-dashoffset 1.5s ease-out 0.5s' : 'none',
                  }}
                />
              </svg>
            </div>

            <div className="relative">
              <p
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  fontFamily: 'var(--font-canela)',
                  fontSize: windowWidth >= 1200 ? '24px' : windowWidth >= 768 ? '20px' : '18px',
                  fontWeight: 400,
                  color: '#2B2B2B',
                  lineHeight: '1.8',
                  marginBottom: '24px',
                  transitionDelay: '0.2s',
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-canela)',
                    fontSize: windowWidth >= 1200 ? '64px' : windowWidth >= 768 ? '48px' : '40px',
                    fontWeight: 400,
                    color: '#c99ccf',
                    float: 'left',
                    lineHeight: '0.8',
                    marginRight: '12px',
                    marginTop: '4px',
                  }}
                >
                  O
                </span>
                riginaire de France, j&apos;ai toujours aimé les langues et les histoires. Après des études de linguistique et plusieurs années d&apos;enseignement, j&apos;ai fondé TalkWithBarb pour aider les apprenants à parler anglais avec aisance et plaisir.
              </p>

              <p
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  fontFamily: 'var(--font-satoshi)',
                  fontSize: windowWidth >= 1200 ? '20px' : windowWidth >= 768 ? '18px' : '16px',
                  fontWeight: 400,
                  color: '#6C6C6C',
                  lineHeight: '1.8',
                  transitionDelay: '0.4s',
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                Aujourd&apos;hui, j&apos;accompagne des étudiants et des professionnels du monde entier dans un apprentissage sur mesure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

