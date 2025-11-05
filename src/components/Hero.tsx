'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const portraitRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWindowWidth();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateWindowWidth);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);

  const getParallaxMultiplier = () => {
    if (windowWidth >= 1200) return 0.3;
    if (windowWidth >= 768) return 0.15;
    return 0.1;
  };
  
  const parallaxOffset = scrollY * getParallaxMultiplier();
  const shapesParallaxOffset = scrollY * 0.05;
  
  const tiltX = mousePosition.x ? (mousePosition.x - window.innerWidth / 2) / 20 : 0;
  const tiltY = mousePosition.y ? (mousePosition.y - window.innerHeight / 2) / 20 : 0;
  
  const shapeShiftX = mousePosition.x ? (mousePosition.x - window.innerWidth / 2) / 100 : 0;
  const shapeShiftY = mousePosition.y ? (mousePosition.y - window.innerHeight / 2) / 100 : 0;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #F2EAF6 0%, rgba(242, 234, 246, 0.3) 30%, #FDFCFB 60%)',
      }}
      >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-64 h-64 rounded-full opacity-10"
          style={{
            background: 'linear-gradient(135deg, #c99ccf, #a87db7)',
            top: `calc(10% + ${shapesParallaxOffset}px)`,
            left: `calc(5% + ${shapeShiftX * 2}px)`,
            transform: `translateY(${shapeShiftY * 2}px)`,
            animation: 'float 20s ease-in-out infinite',
            animationDelay: '0s',
            transition: 'transform 0.5s ease-out',
          }}
        />
        <div
          className="absolute w-48 h-48 rounded-full opacity-8"
          style={{
            background: 'linear-gradient(135deg, #a87db7, #c99ccf)',
            bottom: `calc(20% + ${shapesParallaxOffset * 0.5}px)`,
            right: `calc(10% + ${-shapeShiftX * 1.5}px)`,
            transform: `translateY(${-shapeShiftY * 1.5}px)`,
            animation: 'float 25s ease-in-out infinite',
            animationDelay: '5s',
            transition: 'transform 0.5s ease-out',
          }}
        />
        <div
          className="absolute w-px h-32 opacity-5"
          style={{
            background: 'linear-gradient(to bottom, #c99ccf, transparent)',
            top: `calc(30% + ${shapesParallaxOffset * 0.3}px)`,
            right: `calc(15% + ${shapeShiftX}px)`,
            transform: `translateY(${shapeShiftY}px)`,
            animation: 'floatVertical 15s ease-in-out infinite',
            animationDelay: '2s',
            transition: 'transform 0.5s ease-out',
          }}
        />
      </div>

      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <div className="hidden md:grid md:grid-cols-2 md:gap-12 lg:gap-16 items-center min-h-screen py-20">
          <div className="flex flex-col justify-center space-y-8">
            <h1
              className={`transition-all duration-600 md:text-[48px] hover:scale-[1.02] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
              }`}
              style={{
                fontFamily: 'var(--font-canela)',
                fontSize: windowWidth >= 1200 ? '72px' : undefined,
                color: '#2B2B2B',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out, scale 0.3s ease-out, font-size 0.3s ease',
                transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
              }}
            >
              Apprenez l&apos;anglais, naturellement.
            </h1>

            <p
              className={`transition-all duration-600 md:text-base ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{
                fontFamily: 'var(--font-satoshi)',
                fontWeight: 400,
                fontSize: windowWidth >= 1200 ? '18px' : undefined,
                color: '#6C6C6C',
                lineHeight: '1.6',
                transitionDelay: '0.2s',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out, font-size 0.3s ease',
                transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
              }}
            >
              Je m&apos;appelle <span className="font-medium text-[#c99ccf] transition-colors">Barb</span>. J&apos;aide mes élèves à trouver <span className="font-medium text-[#c99ccf] transition-colors">confiance</span> et <span className="font-medium text-[#c99ccf] transition-colors">fluidité</span> à travers la conversation.
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
              <HeroCTAButton />
            </div>
          </div>

          <div
            ref={portraitRef}
            className="relative flex items-center justify-center"
            style={{
              transform: windowWidth >= 768
                ? `translateX(${shapeShiftX * 0.5}px) translateZ(${shapeShiftY * 0.5}px) rotateX(${-tiltY}deg) rotateY(${tiltX}deg)`
                : 'none',
              transition: 'transform 0.5s ease-out',
              transformStyle: 'preserve-3d',
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
                alt="Barb - French Language Teacher"
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
            ref={portraitRef}
            className="relative w-full max-w-xs aspect-square rounded-2xl overflow-hidden shadow-xl"
            style={{
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.12)',
            }}
          >
            <Image
              src="/assets/fonts/images/hero-image.png"
              alt="Barb - French Language Teacher"
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
              fontSize: '36px',
              color: '#2B2B2B',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            }}
          >
            Apprenez l&apos;anglais, naturellement.
          </h1>

          <p
            className={`text-center transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{
              fontFamily: 'var(--font-satoshi)',
              fontWeight: 400,
              fontSize: '16px',
              color: '#6C6C6C',
              lineHeight: '1.6',
              padding: '0 20px',
              transitionDelay: '0.2s',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            }}
          >
            Je m&apos;appelle Barb. J&apos;aide mes élèves à trouver confiance et fluidité à travers la conversation.
          </p>

          <div
            className={`w-full flex justify-center transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{
              transitionDelay: '0.4s',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            }}
          >
            <HeroCTAButton />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroCTAButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/book"
      className="inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-medium transition-all duration-300"
      style={{
        fontFamily: 'var(--font-satoshi)',
        fontSize: '18px',
        fontWeight: 600,
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
    >
      Réserver une leçon
    </Link>
  );
}

