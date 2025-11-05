'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [scrollY, setScrollY] = useState(0);
  const [idleTime, setIdleTime] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const bubbleRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
      setLastActivity(Date.now());
      setIdleTime(0);
      setShowEasterEgg(false);
    };

    const handleActivity = () => {
      setLastActivity(Date.now());
      setIdleTime(0);
      setShowEasterEgg(false);
    };

    updateWindowWidth();
    window.addEventListener('resize', updateWindowWidth);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);

    const idleInterval = setInterval(() => {
      const idle = Date.now() - lastActivity;
      setIdleTime(idle);
      
      if (idle >= 8000 && windowWidth >= 400 && !showEasterEgg) {
        setShowEasterEgg(true);
      }
    }, 1000);

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      clearInterval(idleInterval);
    };
  }, [lastActivity, windowWidth, showEasterEgg]);

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #FDFCFB 0%, #FAF7FB 50%, #FDFCFB 100%)',
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(201,156,207,0.08) 40%, transparent 70%)',
            transform: `translateY(${scrollY * 0.3}px)`,
            transition: prefersReducedMotion ? 'none' : 'transform 0.1s ease-out',
          }}
        />
        <div
          className="absolute w-32 h-32 rounded-full opacity-5 blur-xl"
          style={{
            background: 'linear-gradient(135deg, #c99ccf, #a87db7)',
            top: '20%',
            left: '10%',
            animation: prefersReducedMotion ? 'none' : 'floatUp 8s ease-in-out infinite',
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
        <div
          className="absolute w-24 h-24 rounded-full opacity-5 blur-xl"
          style={{
            background: 'linear-gradient(135deg, #a87db7, #c99ccf)',
            bottom: '30%',
            right: '15%',
            animation: prefersReducedMotion ? 'none' : 'floatUp 10s ease-in-out infinite',
            animationDelay: '2s',
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        />
        <div
          className="absolute w-16 h-16 rounded-full opacity-5 blur-xl"
          style={{
            background: 'linear-gradient(135deg, #c99ccf, #a87db7)',
            top: '60%',
            left: '50%',
            animation: prefersReducedMotion ? 'none' : 'floatUp 12s ease-in-out infinite',
            animationDelay: '1s',
            transform: `translateY(${scrollY * 0.25}px)`,
          }}
        />
        <div
          className="absolute w-12 h-12 opacity-3 blur-lg"
          style={{
            background: 'radial-gradient(circle, #c99ccf, transparent)',
            top: '40%',
            left: '20%',
            borderRadius: '50%',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            animation: prefersReducedMotion ? 'none' : 'floatUp 15s ease-in-out infinite',
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />
        <div
          className="absolute w-10 h-10 opacity-3 blur-lg"
          style={{
            background: 'radial-gradient(circle, #a87db7, transparent)',
            top: '70%',
            right: '25%',
            borderRadius: '50%',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            animation: prefersReducedMotion ? 'none' : 'floatUp 18s ease-in-out infinite',
            animationDelay: '3s',
            transform: `translateY(${scrollY * 0.12}px)`,
          }}
        />
      </div>

      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen py-20">
          <div className="relative mb-12 md:mb-16">
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle at center, rgba(201,156,207,0.12) 0%, transparent 60%)',
                transform: `translateY(${scrollY * 0.2}px)`,
                transition: prefersReducedMotion ? 'none' : 'transform 0.1s ease-out',
              }}
            />
            <div
              ref={bubbleRef}
              className={`relative transition-all duration-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: '0.2s',
                transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
                animation: prefersReducedMotion ? 'none' : 'floatVertical 4s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite',
                maxWidth: windowWidth >= 768 ? '400px' : '300px',
                margin: '0 auto',
                transform: `translateY(${scrollY * 0.15}px)`,
              }}
            >
              <div className="relative" style={{ width: windowWidth >= 768 ? '400px' : '300px', height: windowWidth >= 768 ? '400px' : '300px' }}>
                <Image
                  src="/assets/fonts/images/404.png"
                  alt="Barb - Page Not Found"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 300px, 400px"
                  priority
                />
                {showEasterEgg && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      animation: 'wave 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                    }}
                  >
                    <div
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-4 py-2 shadow-lg"
                      style={{
                        fontFamily: 'var(--font-satoshi)',
                        fontSize: '14px',
                        color: '#2B2B2B',
                        whiteSpace: 'nowrap',
                        animation: 'fadeInDown 0.5s ease-out',
                      }}
                    >
                      Besoin d&apos;un coup de pouce ? Cliquez ici.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1
              className={`mb-6 transition-all duration-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                fontFamily: 'var(--font-canela)',
                fontSize: windowWidth >= 1200 ? '56px' : windowWidth >= 768 ? '44px' : '32px',
                fontWeight: 700,
                color: '#2B2B2B',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
                transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)',
              }}
            >
              {isVisible && (
                <>
                  {['Oups…', 'cette', 'page', "s'est", 'égarée.'].map((word, index) => (
                    <span
                      key={index}
                      className="inline-block"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                        transition: `opacity 0.8s ease-out ${index * 0.15}s, transform 0.8s ease-out ${index * 0.15}s`,
                        transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)',
                        marginRight: '0.25em',
                      }}
                    >
                      {word === 'Oups…' ? (
                        <span className="relative inline-block">
                          {word}
                          <span
                            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c99ccf] via-transparent to-transparent"
                            style={{
                              opacity: 0.4,
                              borderRadius: '2px',
                            }}
                          />
                        </span>
                      ) : (
                        word
                      )}
                    </span>
                  ))}
                </>
              )}
            </h1>

            <p
              className={`mb-10 transition-all duration-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                fontFamily: 'var(--font-satoshi)',
                fontSize: windowWidth >= 1200 ? '18px' : windowWidth >= 768 ? '17px' : '16px',
                fontWeight: 400,
                color: '#6C6C6C',
                lineHeight: '1.6',
                transitionDelay: '0.4s',
                transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                maxWidth: '640px',
                margin: '0 auto',
              }}
            >
              Pas de panique — même les meilleurs apprenants se trompent parfois. Retournons ensemble sur la bonne voie.
            </p>
          </div>

          <div
            className={`flex flex-col lg:flex-row items-center gap-6 md:gap-8 transition-all duration-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: '0.6s',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              width: windowWidth < 1200 ? '100%' : 'auto',
            }}
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full text-white font-medium transition-all duration-300 relative overflow-hidden"
              style={{
                fontFamily: 'var(--font-satoshi)',
                fontSize: '18px',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #c99ccf 0%, #a87db7 100%)',
                backgroundSize: '200% 200%',
                boxShadow: '0 2px 8px rgba(201,156,207,0.2)',
                transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
                width: windowWidth < 1200 ? '100%' : 'auto',
                minWidth: windowWidth >= 1200 ? '200px' : 'auto',
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
              Retour à l&apos;accueil
            </Link>

            <Link
              href="/contact"
              className={`group relative inline-flex items-center justify-center transition-all duration-300 ${
                showEasterEgg ? 'ring-2 ring-[#c99ccf] ring-offset-2 rounded-lg px-4 py-2' : ''
              }`}
              style={{
                fontFamily: 'var(--font-satoshi)',
                fontSize: '18px',
                fontWeight: 500,
                color: '#c99ccf',
                width: windowWidth < 1200 ? '100%' : 'auto',
                transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#a87db7';
                const underline = e.currentTarget.querySelector('.underline') as HTMLElement;
                if (underline) {
                  underline.style.transform = 'scaleX(1)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#c99ccf';
                const underline = e.currentTarget.querySelector('.underline') as HTMLElement;
                if (underline) {
                  underline.style.transform = 'scaleX(0)';
                }
              }}
            >
              <span className="relative">
                Contacter Barb
                <span
                  className="underline absolute bottom-0 left-0 right-0 h-0.5 bg-[#c99ccf] transition-all duration-400 ease-out"
                  style={{
                    transform: 'scaleX(0)',
                    transformOrigin: 'center',
                  }}
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

