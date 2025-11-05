'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { InstagramLogo, TiktokLogo, YoutubeLogo, Envelope } from 'phosphor-react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [logoHovered, setLogoHovered] = useState(false);
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

  const navigationLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/about', label: 'À propos' },
    { href: '/services', label: 'Services' },
    { href: '/journal', label: 'Journal' },
    { href: '/contact', label: 'Contact' },
  ];

  const discoverLinks = [
    { href: '/journal', label: 'Derniers articles' },
    { href: '/journal?category=conseils', label: 'Conseils linguistiques' },
    { href: '/about', label: 'Méthode TalkWithBarb' },
    { href: '/booking', label: 'Réserver un cours' },
  ];

  const socialLinks = [
    { 
      href: 'https://instagram.com/talkwithbarb', 
      icon: <InstagramLogo className="w-5 h-5" weight="regular" />, 
      label: 'Suivez Barb sur Instagram',
      platform: 'Instagram'
    },
    { 
      href: 'https://tiktok.com/@talkwithbarb', 
      icon: <TiktokLogo className="w-5 h-5" weight="regular" />, 
      label: 'Suivez Barb sur TikTok',
      platform: 'TikTok'
    },
    { 
      href: 'https://youtube.com/@talkwithbarb', 
      icon: <YoutubeLogo className="w-5 h-5" weight="regular" />, 
      label: 'Regardez sur YouTube',
      platform: 'YouTube'
    },
  ];

  return (
    <footer
      ref={sectionRef}
      className="relative"
      style={{ background: '#FAF7FB' }}
    >
      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <div 
          className="pt-20 md:pt-24 lg:pt-[100px] pb-12 md:pb-16"
          style={{ paddingBottom: windowWidth >= 1200 ? '60px' : undefined }}
        >
          {windowWidth >= 1200 ? (
            <div className="grid grid-cols-4 gap-12 lg:gap-16">
              <div className="col-span-1">
                <BrandBlock 
                  isVisible={isVisible} 
                  logoHovered={logoHovered}
                  setLogoHovered={setLogoHovered}
                  windowWidth={windowWidth}
                />
              </div>

              <div className="col-span-1">
                <NavigationLinks 
                  title="Navigation"
                  links={navigationLinks}
                  isVisible={isVisible}
                  windowWidth={windowWidth}
                />
              </div>

              <div className="col-span-1">
                <NavigationLinks 
                  title="Découvrir"
                  links={discoverLinks}
                  isVisible={isVisible}
                  windowWidth={windowWidth}
                  underlineFromLeft={true}
                />
              </div>

              <div className="col-span-1">
                <SocialContact 
                  socialLinks={socialLinks}
                  isVisible={isVisible}
                  windowWidth={windowWidth}
                />
              </div>
            </div>
          ) : windowWidth >= 768 ? (
            <div className="grid grid-cols-2 gap-12">
              <div className="flex flex-col space-y-12">
                <BrandBlock 
                  isVisible={isVisible} 
                  logoHovered={logoHovered}
                  setLogoHovered={setLogoHovered}
                  windowWidth={windowWidth}
                />
                <div className="grid grid-cols-2 gap-12">
                  <NavigationLinks 
                    title="Navigation"
                    links={navigationLinks}
                    isVisible={isVisible}
                    windowWidth={windowWidth}
                  />
                  <NavigationLinks 
                    title="Découvrir"
                    links={discoverLinks}
                    isVisible={isVisible}
                    windowWidth={windowWidth}
                    underlineFromLeft={true}
                  />
                </div>
              </div>

              <div>
                <SocialContact 
                  socialLinks={socialLinks}
                  isVisible={isVisible}
                  windowWidth={windowWidth}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-12 md:space-y-16 text-center">
              <BrandBlock 
                isVisible={isVisible} 
                logoHovered={logoHovered}
                setLogoHovered={setLogoHovered}
                windowWidth={windowWidth}
              />
              <NavigationLinks 
                title="Navigation"
                links={navigationLinks}
                isVisible={isVisible}
                windowWidth={windowWidth}
              />
              <NavigationLinks 
                title="Découvrir"
                links={discoverLinks}
                isVisible={isVisible}
                windowWidth={windowWidth}
                underlineFromLeft={true}
              />
              <SocialContact 
                socialLinks={socialLinks}
                isVisible={isVisible}
                windowWidth={windowWidth}
              />
            </div>
          )}
        </div>

        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            height: '1px',
            background: 'rgba(201,156,207,0.15)',
            marginBottom: '24px',
            transitionDelay: '0.4s',
          }}
        />

        <CopyrightBar isVisible={isVisible} windowWidth={windowWidth} />
      </div>
    </footer>
  );
}

function BrandBlock({
  isVisible,
  logoHovered,
  setLogoHovered,
  windowWidth,
}: {
  isVisible: boolean;
  logoHovered: boolean;
  setLogoHovered: (hovered: boolean) => void;
  windowWidth: number;
}) {
  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)' }}>
      <Link 
        href="/"
        className="inline-block"
        onMouseEnter={() => setLogoHovered(true)}
        onMouseLeave={() => setLogoHovered(false)}
      >
        <h3
          className="relative header-gradient"
          style={{
            fontFamily: 'var(--font-canela)',
            fontSize: windowWidth >= 1200 ? '32px' : windowWidth >= 768 ? '28px' : '28px',
            fontWeight: 600,
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            textAlign: windowWidth >= 768 ? 'left' : 'center',
          }}
        >
          TalkWithBarb
          {logoHovered && (
            <span
              className="absolute inset-0 header-gradient"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(201,156,207,0.5), transparent)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shimmer 1s ease-in-out',
              }}
            />
          )}
        </h3>
      </Link>

      <div
        className={`mt-2 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          transitionDelay: '0.3s',
          transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
        }}
      >
        <svg
          className={`${windowWidth >= 768 ? 'w-32' : 'w-24 mx-auto'} h-auto`}
          viewBox="0 0 200 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            stroke: '#c99ccf',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        >
          <path
            d="M10 5 Q50 3, 100 5 T190 5"
            style={{
              fill: 'none',
              strokeDasharray: '200',
              strokeDashoffset: isVisible ? '0' : '200',
              transition: isVisible ? 'stroke-dashoffset 1.2s ease-out 0.5s' : 'none',
            }}
          />
        </svg>
      </div>

      <p
        className={`mt-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{
          fontFamily: 'var(--font-satoshi)',
          fontSize: '16px',
          fontWeight: 400,
          color: '#6C6C6C',
          lineHeight: '1.5',
          textAlign: windowWidth >= 768 ? 'left' : 'center',
          transitionDelay: '0.4s',
          transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
        }}
      >
        Apprenez l&apos;anglais avec confiance et curiosité.
      </p>
    </div>
  );
}

function NavigationLinks({
  title,
  links,
  isVisible,
  windowWidth,
  underlineFromLeft = false,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
  isVisible: boolean;
  windowWidth: number;
  underlineFromLeft?: boolean;
}) {
  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)' }}>
      <h4
        style={{
          fontFamily: 'var(--font-canela)',
          fontSize: '18px',
          fontWeight: 500,
          color: '#2B2B2B',
          marginBottom: '16px',
          textAlign: windowWidth >= 768 ? 'left' : 'center',
        }}
      >
        {title}
      </h4>
      <nav className="flex flex-col" style={{ gap: '8px' }}>
        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            className="group relative inline-block"
            style={{
              fontFamily: 'var(--font-satoshi)',
              fontSize: '16px',
              fontWeight: 500,
              color: '#6C6C6C',
              textAlign: windowWidth >= 768 ? 'left' : 'center',
              transitionDelay: `${0.1 + index * 0.05}s`,
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
            }}
            onMouseEnter={(e) => {
              if (windowWidth >= 768) {
                e.currentTarget.style.color = '#c99ccf';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#6C6C6C';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = '2px solid rgba(201,156,207,0.5)';
              e.currentTarget.style.outlineOffset = '4px';
              e.currentTarget.style.borderRadius = '2px';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            {link.label}
            <span
              className={`absolute bottom-0 h-0.5 bg-[#c99ccf] transition-all duration-300 group-hover:opacity-100 ${
                underlineFromLeft ? 'right-full group-hover:right-0 left-0' : 'left-1/2 right-1/2 group-hover:left-0 group-hover:right-0'
              }`}
              style={{
                opacity: 0,
                transition: underlineFromLeft 
                  ? 'right 0.3s ease-out, opacity 0.3s ease-out'
                  : 'left 0.3s ease-out, right 0.3s ease-out, opacity 0.3s ease-out',
              }}
            />
          </Link>
        ))}
      </nav>
    </div>
  );
}

function SocialContact({
  socialLinks,
  isVisible,
  windowWidth,
}: {
  socialLinks: Array<{ href: string; icon: React.ReactNode; label: string; platform: string }>;
  isVisible: boolean;
  windowWidth: number;
}) {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`} style={{ transitionDelay: '0.2s', transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)' }}>
      <h4
        style={{
          fontFamily: 'var(--font-canela)',
          fontSize: '18px',
          fontWeight: 500,
          color: '#2B2B2B',
          marginBottom: '16px',
          textAlign: windowWidth >= 768 ? 'left' : 'center',
        }}
      >
        Suivez-moi
      </h4>

      <div 
        className="flex gap-4 mb-8"
        style={{ 
          justifyContent: windowWidth >= 768 ? 'flex-start' : 'center',
          gap: windowWidth < 768 ? '20px' : '16px',
        }}
      >
        {socialLinks.map((social, index) => (
          <a
            key={social.platform}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group"
            aria-label={social.label}
            style={{
              transitionDelay: `${0.3 + index * 0.05}s`,
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
            }}
            onMouseEnter={() => setHoveredSocial(social.platform)}
            onMouseLeave={() => setHoveredSocial(null)}
            onFocus={(e) => {
              e.currentTarget.style.outline = '2px solid rgba(201,156,207,0.5)';
              e.currentTarget.style.outlineOffset = '4px';
              e.currentTarget.style.borderRadius = '50%';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            <div
              style={{
                color: hoveredSocial === social.platform ? '#c99ccf' : '#2B2B2B',
                transform: hoveredSocial === social.platform ? 'translateY(-2px) scale(1.1)' : 'translateY(0) scale(1)',
                transition: 'color 0.3s ease-out, transform 0.3s ease-out',
                width: windowWidth < 768 ? '28px' : '20px',
                height: windowWidth < 768 ? '28px' : '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {social.icon}
            </div>
            {hoveredSocial === social.platform && windowWidth >= 768 && (
              <div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 rounded bg-[#2B2B2B] text-white text-xs whitespace-nowrap pointer-events-none"
                style={{
                  fontFamily: 'var(--font-satoshi)',
                  fontSize: '12px',
                  opacity: 0,
                  animation: 'fadeIn 0.2s ease-out forwards',
                }}
              >
                {social.label}
              </div>
            )}
          </a>
        ))}
      </div>

      <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.5s', transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)' }}>
        <a
          href="mailto:hello@talkwithbarb.com"
          className="group relative inline-block"
          style={{
            fontFamily: 'var(--font-satoshi)',
            fontSize: '16px',
            fontWeight: 400,
            color: '#6C6C6C',
            textAlign: windowWidth >= 768 ? 'left' : 'center',
          }}
          onMouseEnter={(e) => {
            if (windowWidth >= 768) {
              e.currentTarget.style.color = '#c99ccf';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#6C6C6C';
          }}
        >
          hello@talkwithbarb.com
          <span
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#c99ccf] to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          />
        </a>
      </div>
    </div>
  );
}

function CopyrightBar({
  isVisible,
  windowWidth,
}: {
  isVisible: boolean;
  windowWidth: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`pb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{
        paddingTop: '24px',
        paddingBottom: '16px',
        transitionDelay: '0.7s',
        transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
      }}
    >
      <div
        className={`flex ${windowWidth >= 768 ? 'flex-row justify-between items-center' : 'flex-col items-center gap-2'}`}
      >
        <p
          style={{
            fontFamily: 'var(--font-satoshi)',
            fontSize: '14px',
            fontWeight: 400,
            color: '#8C8C8C',
            textAlign: windowWidth >= 768 ? 'left' : 'center',
          }}
        >
          © 2025 TalkWithBarb. Tous droits réservés.
        </p>
        <a
          href="https://ctrl-build.com"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            fontFamily: 'var(--font-satoshi)',
            fontSize: '14px',
            fontWeight: 400,
            color: '#8C8C8C',
            textAlign: 'center',
          }}
        >
          Designed and developed by CTRL+BUILD
          <span
            className="absolute bottom-0 left-0 h-0.5 bg-[#8C8C8C]"
            style={{
              width: hovered ? '100%' : '0%',
              transition: 'width 0.4s ease',
            }}
          />
        </a>
      </div>
    </div>
  );
}

