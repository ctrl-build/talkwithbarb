'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatCircle, Briefcase, Suitcase, Rocket } from 'phosphor-react';

export default function CoursesOverview() {
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

  const courses = [
    {
      title: 'Conversation fluide',
      description: 'Développez votre aisance et confiance à l\'oral.',
      icon: <ChatCircle className="w-8 h-8" weight="regular" />,
    },
    {
      title: 'Préparation d\'entretiens',
      description: 'Cours sur mesure pour réussir vos entretiens.',
      icon: <Briefcase className="w-8 h-8" weight="regular" />,
    },
    {
      title: 'Anglais professionnel',
      description: 'Développez le vocabulaire et les compétences pour le monde professionnel.',
      icon: <Suitcase className="w-8 h-8" weight="regular" />,
    },
    {
      title: 'Sessions intensives',
      description: 'Progrès rapides et personnalisés, selon vos besoins.',
      icon: <Rocket className="w-8 h-8" weight="regular" />,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 lg:py-32"
      style={{ background: '#FDFCFB' }}
    >
      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {courses.map((course, index) => (
            <div
              key={course.title}
              className={`rounded-xl p-8 bg-white transition-all ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
              }`}
              style={{
                borderRadius: '12px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                transitionDelay: `${0.1 * index}s`,
                transitionDuration: '0.4s',
                transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: 'pointer',
                border: '2px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (windowWidth >= 768) {
                  e.currentTarget.style.transition = 'transform 0.2s ease-out, box-shadow 0.2s ease-out, border-color 0.2s ease-out';
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(201, 156, 207, 0.2)';
                  e.currentTarget.style.border = '2px solid #c99ccf';
                } else {
                  e.currentTarget.style.transition = 'transform 0.2s ease-out';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (windowWidth >= 768) {
                  e.currentTarget.style.transition = 'transform 0.2s ease-out, box-shadow 0.2s ease-out, border-color 0.2s ease-out';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.border = '2px solid transparent';
                } else {
                  e.currentTarget.style.transition = 'transform 0.2s ease-out';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
              onTouchStart={(e) => {
                if (windowWidth < 768) {
                  e.currentTarget.style.transition = 'transform 0.2s ease-out';
                  e.currentTarget.style.transform = 'scale(0.98)';
                }
              }}
              onTouchEnd={(e) => {
                if (windowWidth < 768) {
                  setTimeout(() => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }, 200);
                }
              }}
            >
              <div
                className="mb-6 transition-transform duration-200"
                style={{
                  color: '#c99ccf',
                }}
                onMouseEnter={(e) => {
                  if (windowWidth >= 768) {
                    e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
                    e.currentTarget.style.transition = 'transform 0.2s cubic-bezier(0.445, 0.05, 0.55, 0.95)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (windowWidth >= 768) {
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  }
                }}
              >
                {course.icon}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-canela)',
                  fontSize: windowWidth >= 1200 ? '24px' : windowWidth >= 768 ? '20px' : '18px',
                  fontWeight: 600,
                  color: '#2B2B2B',
                  marginBottom: '12px',
                  lineHeight: '1.3',
                }}
              >
                {course.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-satoshi)',
                  fontSize: windowWidth >= 768 ? '16px' : '14px',
                  fontWeight: 400,
                  color: '#6C6C6C',
                  lineHeight: '1.6',
                }}
              >
                {course.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

