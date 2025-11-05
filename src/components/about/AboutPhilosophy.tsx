'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatCircle, Lightbulb, BookOpen } from 'phosphor-react';

export default function AboutPhilosophy() {
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

  const pillars = [
    {
      title: 'Confiance',
      description: 'Encourager les apprenants à parler librement',
      icon: <ChatCircle className="w-8 h-8" weight="regular" />,
    },
    {
      title: 'Clarté',
      description: 'Simplifier l\'apprentissage de l\'anglais sans stress',
      icon: <Lightbulb className="w-8 h-8" weight="regular" />,
    },
    {
      title: 'Curiosité',
      description: 'Rendre les cours engageants et stimulants',
      icon: <BookOpen className="w-8 h-8" weight="regular" />,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 lg:py-32"
      style={{ background: '#FDFCFB' }}
    >
      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className={`rounded-xl p-8 bg-white transition-all ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
              style={{
                boxShadow: '0 2px 12px rgba(201,156,207,0.1)',
                transitionDelay: `${0.1 + index * 0.1}s`,
                transitionDuration: '0.4s',
                transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (windowWidth >= 768) {
                  e.currentTarget.style.transition = 'transform 0.3s ease-out, box-shadow 0.3s ease-out';
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(201, 156, 207, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (windowWidth >= 768) {
                  e.currentTarget.style.transition = 'transform 0.3s ease-out, box-shadow 0.3s ease-out';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(201,156,207,0.1)';
                }
              }}
            >
              <div
                className="mb-6 transition-transform duration-300"
                style={{
                  color: '#c99ccf',
                }}
                onMouseEnter={(e) => {
                  if (windowWidth >= 768) {
                    e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                    e.currentTarget.style.transition = 'transform 0.3s ease-out';
                  }
                }}
                onMouseLeave={(e) => {
                  if (windowWidth >= 768) {
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  }
                }}
              >
                {pillar.icon}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-canela)',
                  fontSize: windowWidth >= 1200 ? '24px' : '20px',
                  fontWeight: 500,
                  color: '#2B2B2B',
                  marginBottom: '12px',
                  lineHeight: '1.3',
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-satoshi)',
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#6C6C6C',
                  lineHeight: '1.6',
                }}
              >
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

