'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChatCircle, Briefcase, Buildings, Lightning } from 'phosphor-react';

export default function ServicesOverview() {
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

  const lessonTypes = [
    {
      title: 'Conversation fluide',
      description: 'Améliorer la fluidité et la confiance en anglais oral',
      icon: <ChatCircle className="w-8 h-8" weight="regular" />,
    },
    {
      title: 'Préparation d\'entretiens',
      description: 'Accompagnement pour réussir vos entretiens professionnels',
      icon: <Briefcase className="w-8 h-8" weight="regular" />,
    },
    {
      title: 'Anglais professionnel',
      description: 'Développer le vocabulaire et les compétences pour le milieu professionnel',
      icon: <Buildings className="w-8 h-8" weight="regular" />,
    },
    {
      title: 'Sessions intensives',
      description: 'Cours rapides et personnalisés pour progresser efficacement',
      icon: <Lightning className="w-8 h-8" weight="regular" />,
    },
  ];

  const uniqueValuePoints = [
    'Méthode personnalisée adaptée à chaque élève',
    'Retour constant pour progresser rapidement',
    'Apprentissage basé sur la conversation et la confiance',
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 lg:py-32 overflow-hidden"
      style={{ background: '#FDFCFB'       }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-40 h-40 rounded-full opacity-5"
          style={{
            background: 'linear-gradient(135deg, #c99ccf, #a87db7)',
            top: '20%',
            right: '10%',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-32 h-32 rounded-full opacity-5"
          style={{
            background: 'linear-gradient(135deg, #a87db7, #c99ccf)',
            bottom: '25%',
            left: '8%',
            animation: 'float 25s ease-in-out infinite',
            animationDelay: '2s',
          }}
        />
      </div>

      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <div className="mb-16 md:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {lessonTypes.map((lesson, index) => (
              <div
                key={lesson.title}
                className={`rounded-2xl p-6 md:p-8 bg-white transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
                  transitionDelay: `${0.1 + index * 0.1}s`,
                  transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
                  cursor: 'pointer',
                  border: '1px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (windowWidth >= 768) {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(201, 156, 207, 0.15)';
                    e.currentTarget.style.border = '1px solid #c99ccf';
                  }
                }}
                onMouseLeave={(e) => {
                  if (windowWidth >= 768) {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.06)';
                    e.currentTarget.style.border = '1px solid transparent';
                  }
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = 'scale(0.98)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div
                  className="mb-4 transition-transform duration-300"
                  style={{
                    color: '#c99ccf',
                  }}
                  onMouseEnter={(e) => {
                    if (windowWidth >= 768) {
                      e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  }}
                >
                  {lesson.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-canela)',
                    fontSize: windowWidth >= 1200 ? '24px' : windowWidth >= 768 ? '20px' : '18px',
                    fontWeight: 500,
                    color: '#2B2B2B',
                    marginBottom: '12px',
                    lineHeight: '1.3',
                  }}
                >
                  {lesson.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-satoshi)',
                    fontSize: windowWidth >= 1200 ? '16px' : '14px',
                    fontWeight: 400,
                    color: '#6C6C6C',
                    lineHeight: '1.6',
                  }}
                >
                  {lesson.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col space-y-6">
            <h2
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
              }`}
              style={{
                fontFamily: 'var(--font-canela)',
                fontSize: windowWidth >= 1200 ? '42px' : windowWidth >= 768 ? '36px' : '32px',
                color: '#2B2B2B',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
                marginBottom: '8px',
                transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
              }}
            >
              Pourquoi mes cours sont uniques
            </h2>

            <ul className="space-y-4">
              {uniqueValuePoints.map((point, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-4 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    transitionDelay: `${0.3 + index * 0.1}s`,
                    transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
                  }}
                >
                  <div
                    className="flex-shrink-0 w-2 h-2 rounded-full mt-2"
                    style={{
                      background: '#c99ccf',
                    }}
                  />
                  <p
                    style={{
                      fontFamily: 'var(--font-satoshi)',
                      fontSize: windowWidth >= 768 ? '18px' : '16px',
                      fontWeight: 400,
                      color: '#6C6C6C',
                      lineHeight: '1.6',
                    }}
                  >
                    {point}
                  </p>
                </li>
              ))}
            </ul>

            <div
              className={`mt-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: '0.6s',
                transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
              }}
            >
              <ServicesCTAButton />
            </div>
          </div>

          <div className="relative hidden md:flex items-center justify-center">
            <div
              ref={illustrationRef}
              className={`relative w-full h-64 rounded-2xl transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                background: 'linear-gradient(135deg, #F2EAF6 0%, rgba(242, 234, 246, 0.3) 50%, transparent 100%)',
                transitionDelay: '0.4s',
                transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
                animation: 'float 20s ease-in-out infinite',
                transform: `translateY(${scrollY}px)`,
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

          <div className="lg:hidden relative w-full h-48 rounded-2xl overflow-hidden mt-8">
            <div
              className={`relative w-full h-full transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                background: 'linear-gradient(135deg, #F2EAF6 0%, rgba(242, 234, 246, 0.3) 50%, transparent 100%)',
                transitionDelay: '0.5s',
                transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
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

          <div
            className={`lg:hidden w-full transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: '0.7s',
              transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
            }}
          >
            <ServicesCTAButton isMobile />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesCTAButton({ isMobile = false }: { isMobile?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/book"
      className={`inline-flex items-center justify-center rounded-full text-white font-medium transition-all duration-300 ${
        isMobile ? 'w-full' : 'px-8 py-4'
      }`}
      style={{
        fontFamily: 'var(--font-satoshi)',
        fontSize: '18px',
        fontWeight: 600,
        minHeight: isMobile ? '56px' : 'auto',
        padding: isMobile ? '16px 24px' : undefined,
        background: isHovered
          ? 'linear-gradient(135deg, #a87db7 0%, #c99ccf 100%)'
          : 'linear-gradient(135deg, #c99ccf 0%, #a87db7 100%)',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered
          ? '0 4px 20px rgba(201,156,207,0.4)'
          : '0 2px 8px rgba(201,156,207,0.2)',
        transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      Réserver une leçon
    </Link>
  );
}

