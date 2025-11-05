'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isTabletMenuOpen, setIsTabletMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorExpanded, setCursorExpanded] = useState(false);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoAnimationComplete(true);
    }, 1600);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/about', label: 'À propos' },
    { href: '/courses', label: 'Cours' },
    { href: '/journal', label: 'Journal' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const tabletVisibleLinks = navLinks.slice(0, 2);
  const tabletHiddenLinks = navLinks.slice(2);

  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWindowWidth();
    window.addEventListener('resize', updateWindowWidth);

    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  const getLogoSize = () => {
    if (isScrolled) {
      return '20px';
    }
    if (windowWidth >= 1024) return '24px';
    if (windowWidth >= 768) return '22px';
    return '20px';
  };

  return (
    <>
      <div
        className={`hidden xl:block custom-cursor ${cursorExpanded ? 'expanded' : ''}`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />

      {(isMobileMenuOpen || isClosing) && (
        <div
          className="md:hidden fixed inset-0 overflow-y-auto"
          style={{
            zIndex: 9999,
            backgroundColor: 'rgba(253, 252, 251, 0.95)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            animation: isClosing 
              ? 'fadeOut 0.3s cubic-bezier(0.77, 0, 0.175, 1) forwards'
              : 'fadeIn 0.35s cubic-bezier(0.77, 0, 0.175, 1) forwards',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !isClosing) {
              handleCloseMenu();
            }
          }}
          onAnimationEnd={() => {
            if (isClosing) {
              setIsMobileMenuOpen(false);
              setIsClosing(false);
            }
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(to right, transparent, #c99ccf 20%, #a87db7 50%, #c99ccf 80%, transparent)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(to right, transparent, #c99ccf 20%, #a87db7 50%, #c99ccf 80%, transparent)',
            }}
          />

          <button
            className="absolute top-5 right-5 flex flex-col gap-1.5 w-10 h-10 justify-center items-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
            onClick={handleCloseMenu}
            aria-label="Close menu"
            style={{
              zIndex: 10000,
              padding: '8px',
            }}
          >
            <span
              className="block w-6 h-0.5 bg-[#2B2B2B] transition-all duration-300 rotate-45 translate-y-2"
            />
            <span
              className="block w-6 h-0.5 bg-[#2B2B2B] transition-all duration-300 opacity-0"
            />
            <span
              className="block w-6 h-0.5 bg-[#2B2B2B] transition-all duration-300 -rotate-45 -translate-y-2"
            />
          </button>

          <div 
            className="min-h-screen flex flex-col items-center justify-between px-5" 
            style={{ 
              paddingTop: 'clamp(60px, 10vh, 80px)', 
              paddingBottom: 'clamp(80px, 12vh, 100px)',
            }}
          >
            <div
              className="header-gradient text-center"
              style={{
                fontFamily: 'var(--font-canela)',
                fontSize: '22px',
                letterSpacing: '0.02em',
                animation: 'fadeIn 0.5s cubic-bezier(0.77, 0, 0.175, 1) 0.1s both',
              }}
            >
              TalkWithBarb
            </div>

            <nav className="flex flex-col items-center gap-2 flex-1 justify-center py-8">
              {navLinks.map((link, index) => (
                <MobileNavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  index={index}
                  delay={index * 0.05}
                  isVisible={isMobileMenuOpen && !isClosing}
                  isClosing={isClosing}
                  onClick={handleCloseMenu}
                />
              ))}
            </nav>

            <div
              className="w-full max-w-sm px-5"
              style={{
                animation: `slideUpStagger 0.5s cubic-bezier(0.77, 0, 0.175, 1) ${navLinks.length * 0.05 + 0.15}s both`,
                position: 'sticky',
                bottom: 0,
                backgroundColor: 'rgba(253, 252, 251, 0.98)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                paddingTop: '20px',
                paddingBottom: '20px',
                marginTop: 'auto',
              }}
            >
              <MobileCTAButton
                isVisible={isMobileMenuOpen && !isClosing}
                isClosing={isClosing}
                onClick={handleCloseMenu}
              />
            </div>
          </div>
        </div>
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease h-16 md:h-[70px] lg:h-[80px] ${
          isMobileMenuOpen ? 'pointer-events-none' : ''
        }`}
        style={{
          opacity: isMobileMenuOpen ? 0 : undefined,
          background: isScrolled
            ? 'rgba(253, 252, 251, 1)'
            : 'rgba(253, 252, 251, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: isScrolled
            ? '0 2px 12px rgba(0, 0, 0, 0.04)'
            : 'none',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
        }}
      >
        <div className="mx-auto h-full flex items-center justify-between max-w-[1920px] px-5 md:px-10 lg:px-[60px]">
          <Link
            href="/"
            className="font-canela tracking-wide header-gradient flex items-center"
            style={{
              fontFamily: 'var(--font-canela)',
              fontSize: getLogoSize(),
              transition: 'font-size 0.3s ease',
            }}
            onMouseEnter={() => setCursorExpanded(true)}
            onMouseLeave={() => setCursorExpanded(false)}
          >
            {'TalkWithBarb'.split('').map((letter, index) => (
              <span
                key={index}
                className="inline-block"
                style={{
                  animation: logoAnimationComplete
                    ? 'none'
                    : `fadeInLetter 0.2s ease-out ${index * 0.08}s forwards`,
                  opacity: logoAnimationComplete ? 1 : 0,
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                index={index}
                fontSize="18px"
                onMouseEnter={() => setCursorExpanded(true)}
                onMouseLeave={() => setCursorExpanded(false)}
              />
            ))}
          </nav>

          <nav className="hidden md:flex lg:hidden items-center gap-6">
            {tabletVisibleLinks.map((link, index) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                index={index}
                fontSize="16px"
                onMouseEnter={() => setCursorExpanded(true)}
                onMouseLeave={() => setCursorExpanded(false)}
              />
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <CTAButton
              onMouseEnter={() => setCursorExpanded(true)}
              onMouseLeave={() => setCursorExpanded(false)}
            />
            
            <button
              className="lg:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-center"
              onClick={() => setIsTabletMenuOpen(!isTabletMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-[#2B2B2B] transition-all duration-300 ${
                  isTabletMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-[#2B2B2B] transition-all duration-300 ${
                  isTabletMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-[#2B2B2B] transition-all duration-300 ${
                  isTabletMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-[#2B2B2B] transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#2B2B2B] transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#2B2B2B] transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {isTabletMenuOpen && (
          <div className="hidden md:block lg:hidden absolute top-full left-0 right-0 bg-[#FDFCFB] shadow-lg border-t border-[#FDFCFB]">
            <div className="mx-auto px-10 py-4 flex items-center gap-6">
              {tabletHiddenLinks.map((link, index) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  index={index}
                  fontSize="16px"
                  onMouseEnter={() => setCursorExpanded(true)}
                  onMouseLeave={() => setCursorExpanded(false)}
                />
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

function NavLink({
  href,
  label,
  index,
  fontSize,
  onMouseEnter,
  onMouseLeave,
}: {
  href: string;
  label: string;
  index: number;
  fontSize: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className="relative text-[#2B2B2B] font-medium transition-transform duration-300 hover:scale-[1.02]"
      style={{
        fontFamily: 'var(--font-satoshi)',
        fontWeight: 600,
        fontSize: fontSize,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        onMouseEnter();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onMouseLeave();
      }}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-[#c99ccf] transition-all duration-300 ${
          isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </Link>
  );
}

function CTAButton({
  onMouseEnter,
  onMouseLeave,
}: {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/booking"
      className={`flex items-center justify-center px-6 py-3 rounded-full text-white font-medium text-base transition-all duration-300 ${
        !isHovered ? 'animate-breathe' : ''
      }`}
      style={{
        fontFamily: 'var(--font-satoshi)',
        background: isHovered
          ? 'linear-gradient(135deg, #a87db7 0%, #c99ccf 100%)'
          : 'linear-gradient(135deg, #c99ccf 0%, #a87db7 100%)',
        transform: isHovered ? 'scale(1.05)' : undefined,
        boxShadow: isHovered
          ? '0 4px 20px rgba(201,156,207,0.4)'
          : '0 2px 8px rgba(201,156,207,0.2)',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        onMouseEnter();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onMouseLeave();
      }}
    >
      Réserver une leçon
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  index,
  delay,
  isVisible,
  isClosing,
  onClick,
}: {
  href: string;
  label: string;
  index: number;
  delay: number;
  isVisible: boolean;
  isClosing: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  const handleClick = () => {
    setIsTapped(true);
    setTimeout(() => {
      onClick();
    }, 200);
  };

  return (
    <Link
      href={href}
      className="relative text-[#2B2B2B] font-medium transition-all duration-300"
      style={{
        fontFamily: 'var(--font-satoshi)',
        fontWeight: 600,
        fontSize: '20px',
        minHeight: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        opacity: isClosing ? 0 : (isVisible ? (isTapped ? 0.5 : 1) : 0),
        transform: isClosing 
          ? 'translateY(10px) scale(0.98)'
          : isTapped 
          ? 'translateY(8px) scale(0.98)' 
          : isHovered 
          ? 'scale(1.03)' 
          : 'scale(1)',
        animation: isClosing
          ? `fadeDown 0.3s cubic-bezier(0.77, 0, 0.175, 1) ${index * 0.03}s forwards`
          : isVisible && !isTapped
          ? `slideUpStagger 0.5s cubic-bezier(0.77, 0, 0.175, 1) ${delay}s both`
          : 'none',
        transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {label}
      <span
        className={`absolute bottom-2 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 ${
          isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to right, #c99ccf, #a87db7)',
          transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
        }}
      />
    </Link>
  );
}

function MobileCTAButton({
  isVisible,
  isClosing,
  onClick,
}: {
  isVisible: boolean;
  isClosing: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/booking"
      className="w-full rounded-full text-white font-medium transition-all duration-300 active:scale-[0.98] flex items-center justify-center"
      style={{
        fontFamily: 'var(--font-satoshi)',
        fontSize: '18px',
        minHeight: '56px',
        background: isHovered
          ? 'linear-gradient(135deg, #a87db7 0%, #c99ccf 100%)'
          : 'linear-gradient(135deg, #c99ccf 0%, #a87db7 100%)',
        transform: isClosing 
          ? 'translateY(10px) scale(0.98)'
          : isHovered 
          ? 'scale(1.05)' 
          : 'scale(1)',
        opacity: isClosing ? 0 : 1,
        boxShadow: isHovered
          ? '0 4px 20px rgba(201,156,207,0.4)'
          : '0 2px 8px rgba(201,156,207,0.2)',
        transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
        animation: isClosing 
          ? `fadeDown 0.3s cubic-bezier(0.77, 0, 0.175, 1) 0.1s forwards`
          : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      Réserver une leçon
    </Link>
  );
}
