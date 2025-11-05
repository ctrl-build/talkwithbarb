'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWindowWidth();
    window.addEventListener('resize', updateWindowWidth);

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const approachSection = document.getElementById('teaching-approach');
    if (approachSection) {
      approachSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #FDFCFB 0%, #F8F2FA 50%, #FDFCFB 100%)',
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-64 h-64 rounded-full opacity-5"
          style={{
            background: 'linear-gradient(135deg, #c99ccf, #a87db7)',
            top: '10%',
            left: '5%',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-48 h-48 rounded-full opacity-5"
          style={{
            background: 'linear-gradient(135deg, #a87db7, #c99ccf)',
            bottom: '20%',
            right: '10%',
            animation: 'float 25s ease-in-out infinite',
            animationDelay: '5s',
          }}
        />
      </div>

      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <div className="hidden md:grid md:grid-cols-2 md:gap-12 lg:gap-16 items-center min-h-screen py-20">
          <div className="flex flex-col justify-center space-y-8">
            <h1
              className={`transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
              }`}
              style={{
                fontFamily: 'var(--font-canela)',
                fontSize: windowWidth >= 1200 ? '52px' : '42px',
                fontWeight: 400,
                color: '#2B2B2B',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
              }}
            >
              Je m&apos;appelle Barb — et j&apos;adore voir mes élèves s&apos;exprimer avec{' '}
              <span className="relative inline-block">
                confiance
                <span
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c99ccf] to-transparent"
                  style={{
                    animation: 'gradientSweep 3s ease-in-out infinite',
                    borderRadius: '2px',
                  }}
                />
              </span>
              .
            </h1>

            <p
              className={`transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{
                fontFamily: 'var(--font-satoshi)',
                fontSize: windowWidth >= 1200 ? '20px' : '18px',
                fontWeight: 400,
                color: '#6C6C6C',
                lineHeight: '1.6',
                transitionDelay: '0.2s',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
              }}
            >
              Avec moi, apprendre l&apos;anglais devient une conversation vivante, claire et motivante.
            </p>

            <div
              className={`transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{
                transitionDelay: '0.4s',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
              }}
            >
              <Link
                href="#teaching-approach"
                onClick={handleCTAClick}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-medium transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-satoshi)',
                  fontSize: '18px',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #c99ccf 0%, #a87db7 100%)',
                  boxShadow: '0 2px 8px rgba(201,156,207,0.2)',
                  transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
                  animation: 'breathe 4s ease-in-out infinite',
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
                Découvrir ma méthode
              </Link>
            </div>
          </div>

          <div
            ref={illustrationRef}
            className={`relative flex items-center justify-center transition-opacity duration-800 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transitionDelay: '0.8s',
              transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
            }}
          >
            <div
              className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl"
              style={{
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              }}
            >
              <Image
                src="/assets/fonts/images/hero-image.png"
                alt="Barb"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              />
            </div>
          </div>
        </div>

        <div className="md:hidden flex flex-col items-center justify-center min-h-screen py-16 space-y-8">
          <div
            ref={illustrationRef}
            className={`relative w-full max-w-xs aspect-square rounded-2xl overflow-hidden shadow-xl transition-opacity duration-800 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transitionDelay: '0.3s',
              transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.12)',
            }}
          >
            <Image
              src="/assets/fonts/images/hero-image.png"
              alt="Barb"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 300px, 500px"
            />
          </div>

          <h1
            className={`text-center transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
            style={{
              fontFamily: 'var(--font-canela)',
              fontSize: '32px',
              fontWeight: 400,
              color: '#2B2B2B',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
            }}
          >
            Je m&apos;appelle Barb — et j&apos;adore voir mes élèves s&apos;exprimer avec{' '}
            <span className="relative inline-block">
              confiance
              <span
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c99ccf] to-transparent"
                style={{
                  animation: 'gradientSweep 3s ease-in-out infinite',
                  borderRadius: '2px',
                }}
              />
            </span>
            .
          </h1>

          <p
            className={`text-center transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{
              fontFamily: 'var(--font-satoshi)',
              fontSize: '16px',
              fontWeight: 400,
              color: '#6C6C6C',
              lineHeight: '1.6',
              padding: '0 20px',
              transitionDelay: '0.2s',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
            }}
          >
            Avec moi, apprendre l&apos;anglais devient une conversation vivante, claire et motivante.
          </p>

          <div
            className={`w-full flex justify-center transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{
              transitionDelay: '0.4s',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
            }}
          >
            <Link
              href="#teaching-approach"
              onClick={handleCTAClick}
              className="w-full max-w-sm inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-medium transition-all duration-300"
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
              Découvrir ma méthode
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

