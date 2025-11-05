'use client';

import { useState, useEffect } from 'react';
import { InstagramLogo, LinkedinLogo, YoutubeLogo, Envelope } from 'phosphor-react';

export default function ContactInfo() {
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWindowWidth();
    window.addEventListener('resize', updateWindowWidth);

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);

  return (
    <section
      className="relative py-20 md:py-24 lg:py-32"
      style={{ background: '#FAF7FB' }}
    >
      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-12">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-4">
                <Envelope
                  className="w-6 h-6"
                  weight="regular"
                  style={{ color: '#c99ccf' }}
                />
                <a
                  href="mailto:hello@talkwithbarb.com"
                  className="transition-all duration-300 relative group"
                  style={{
                    fontFamily: 'var(--font-satoshi)',
                    fontSize: windowWidth >= 768 ? '16px' : '14px',
                    fontWeight: 400,
                    color: '#2B2B2B',
                    transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#c99ccf';
                    const underline = e.currentTarget.querySelector('.underline') as HTMLElement;
                    if (underline) {
                      underline.style.transform = 'scaleX(1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#2B2B2B';
                    const underline = e.currentTarget.querySelector('.underline') as HTMLElement;
                    if (underline) {
                      underline.style.transform = 'scaleX(0)';
                    }
                  }}
                >
                  <span className="relative">
                    hello@talkwithbarb.com
                    <span
                      className="underline absolute bottom-0 left-0 right-0 h-0.5 bg-[#c99ccf] transition-all duration-300 ease-out"
                      style={{
                        transform: 'scaleX(0)',
                        transformOrigin: 'left',
                      }}
                    />
                  </span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200"
                style={{
                  color: '#2B2B2B',
                  transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.1)';
                  e.currentTarget.style.color = '#c99ccf';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.color = '#2B2B2B';
                }}
              >
                <InstagramLogo size={24} weight="regular" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200"
                style={{
                  color: '#2B2B2B',
                  transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.1)';
                  e.currentTarget.style.color = '#c99ccf';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.color = '#2B2B2B';
                }}
              >
                <LinkedinLogo size={24} weight="regular" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200"
                style={{
                  color: '#2B2B2B',
                  transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.1)';
                  e.currentTarget.style.color = '#c99ccf';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.color = '#2B2B2B';
                }}
              >
                <YoutubeLogo size={24} weight="regular" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

