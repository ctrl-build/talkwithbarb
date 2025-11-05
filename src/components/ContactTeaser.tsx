'use client';

import { useState, useEffect, useRef } from 'react';

export default function ContactTeaser() {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [scrollY, setScrollY] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const scrollProgress = Math.max(0, Math.min(1, (window.scrollY - elementTop + window.innerHeight) / (window.innerHeight + rect.height)));
        setScrollY(scrollProgress * 20);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      if (formRef.current) {
        formRef.current.reset();
      }
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1200);
  };

  const getHeadlineSize = () => {
    if (windowWidth >= 1200) return '42px';
    if (windowWidth >= 768) return '36px';
    return '28px';
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 lg:py-32 overflow-hidden"
      style={{ background: '#FDFCFB' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-32 h-32 rounded-full opacity-5"
          style={{
            background: 'linear-gradient(135deg, #c99ccf, #a87db7)',
            top: '15%',
            left: '5%',
            animation: 'float 7s ease-in-out infinite',
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <div
          className="absolute w-24 h-24 rounded-full opacity-5"
          style={{
            background: 'linear-gradient(135deg, #a87db7, #c99ccf)',
            bottom: '20%',
            right: '8%',
            animation: 'float 6s ease-in-out infinite',
            animationDelay: '2s',
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
      </div>

      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="flex flex-col">
            <h2
              className={`transition-all duration-700 mb-6 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
              }`}
              style={{
                fontFamily: 'var(--font-canela)',
                fontSize: getHeadlineSize(),
                fontWeight: 400,
                color: '#2B2B2B',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
                textAlign: windowWidth >= 768 ? 'left' : 'center',
                transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
              }}
            >
              Prêt·e à{' '}
              <span className="relative inline-block">
                discuter
                <span
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c99ccf] to-transparent"
                  style={{
                    animation: 'gradientSweep 3s ease-in-out infinite',
                    borderRadius: '2px',
                  }}
                />
              </span>{' '}
              en anglais ?
            </h2>

            <p
              className={`transition-all duration-700 mb-8 md:mb-12 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                fontFamily: 'var(--font-satoshi)',
                fontSize: windowWidth >= 1200 ? '18px' : '16px',
                fontWeight: 400,
                color: '#6C6C6C',
                lineHeight: '1.6',
                textAlign: windowWidth >= 768 ? 'left' : 'center',
                transitionDelay: '0.2s',
                transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
              }}
            >
              Écrivez-moi quelques mots. Je serais ravie d&apos;en savoir plus sur vous et vos objectifs.
            </p>

            <div
              className={`hidden md:block transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: '0.4s',
                transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
                transform: windowWidth >= 1200 ? `translateY(${scrollY * 0.5}px)` : 'none',
              }}
            >
              <div className="relative w-32 h-32">
                <div
                  className="absolute w-20 h-20 rounded-full opacity-10"
                  style={{
                    background: 'linear-gradient(135deg, #c99ccf, #a87db7)',
                    top: '10%',
                    left: '10%',
                    animation: 'float 5s ease-in-out infinite',
                  }}
                />
                <div
                  className="absolute w-16 h-16 rounded-full opacity-10"
                  style={{
                    background: 'linear-gradient(135deg, #a87db7, #c99ccf)',
                    bottom: '10%',
                    right: '10%',
                    animation: 'float 6s ease-in-out infinite',
                    animationDelay: '1s',
                  }}
                />
                <div
                  className="absolute w-12 h-12 rounded-full opacity-10"
                  style={{
                    background: 'linear-gradient(135deg, #c99ccf, #a87db7)',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    animation: 'float 7s ease-in-out infinite',
                    animationDelay: '2s',
                  }}
                />
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: '0.3s',
              transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
            }}
          >
            <ContactForm
              formRef={formRef}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              showSuccess={showSuccess}
              windowWidth={windowWidth}
              resetForm={() => {
                setIsSubmitting(false);
                setShowSuccess(false);
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm({
  formRef,
  handleSubmit,
  isSubmitting,
  showSuccess,
  windowWidth,
  resetForm,
}: {
  formRef: React.RefObject<HTMLFormElement | null>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  showSuccess: boolean;
  windowWidth: number;
  resetForm: () => void;
}) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [fieldValues, setFieldValues] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    if (!showSuccess && !isSubmitting) {
      setFieldValues({ name: '', email: '', message: '' });
      setFocusedField(null);
    }
  }, [showSuccess, isSubmitting]);

  const isFieldActive = (fieldName: string) => {
    return focusedField === fieldName || fieldValues[fieldName as keyof typeof fieldValues].length > 0;
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="relative">
        <input
          type="text"
          id="name"
          name="name"
          required
          value={fieldValues.name}
          className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-[#E0D4EA] focus:border-[#c99ccf] outline-none transition-colors duration-300"
          style={{
            fontFamily: 'var(--font-satoshi)',
            fontSize: '16px',
            fontWeight: 400,
            color: '#2B2B2B',
            background: '#FDFCFB',
          }}
          placeholder=" "
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          onChange={(e) => {
            setFieldValues({ ...fieldValues, name: e.target.value });
          }}
        />
        <label
          htmlFor="name"
          className="absolute left-0 transition-all duration-300 pointer-events-none"
          style={{
            fontFamily: 'var(--font-satoshi)',
            fontSize: isFieldActive('name') ? '12px' : '16px',
            fontWeight: 400,
            color: isFieldActive('name') ? '#c99ccf' : '#6C6C6C',
            top: isFieldActive('name') ? '0px' : '16px',
          }}
        >
          Nom
        </label>
      </div>

      <div className="relative">
        <input
          type="email"
          id="email"
          name="email"
          required
          value={fieldValues.email}
          className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-[#E0D4EA] focus:border-[#c99ccf] outline-none transition-colors duration-300"
          style={{
            fontFamily: 'var(--font-satoshi)',
            fontSize: '16px',
            fontWeight: 400,
            color: '#2B2B2B',
            background: '#FDFCFB',
          }}
          placeholder=" "
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          onChange={(e) => {
            setFieldValues({ ...fieldValues, email: e.target.value });
          }}
        />
        <label
          htmlFor="email"
          className="absolute left-0 transition-all duration-300 pointer-events-none"
          style={{
            fontFamily: 'var(--font-satoshi)',
            fontSize: isFieldActive('email') ? '12px' : '16px',
            fontWeight: 400,
            color: isFieldActive('email') ? '#c99ccf' : '#6C6C6C',
            top: isFieldActive('email') ? '0px' : '16px',
          }}
        >
          Adresse e-mail
        </label>
      </div>

      <div className="relative">
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={fieldValues.message}
          className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-[#E0D4EA] focus:border-[#c99ccf] outline-none transition-colors duration-300 resize-none"
          style={{
            fontFamily: 'var(--font-satoshi)',
            fontSize: '16px',
            fontWeight: 400,
            color: '#2B2B2B',
            background: '#FDFCFB',
            minHeight: '100px',
          }}
          placeholder=" "
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          onChange={(e) => {
            setFieldValues({ ...fieldValues, message: e.target.value });
          }}
        />
        <label
          htmlFor="message"
          className="absolute left-0 transition-all duration-300 pointer-events-none"
          style={{
            fontFamily: 'var(--font-satoshi)',
            fontSize: isFieldActive('message') ? '12px' : '16px',
            fontWeight: 400,
            color: isFieldActive('message') ? '#c99ccf' : '#6C6C6C',
            top: isFieldActive('message') ? '0px' : '16px',
          }}
        >
          Message
        </label>
      </div>

      <div className="pt-4">
        <ContactCTAButton
          isSubmitting={isSubmitting}
          showSuccess={showSuccess}
          windowWidth={windowWidth}
        />
      </div>
    </form>
  );
}

function ContactCTAButton({
  isSubmitting,
  showSuccess,
  windowWidth,
}: {
  isSubmitting: boolean;
  showSuccess: boolean;
  windowWidth: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <button
      type="submit"
      disabled={isSubmitting || showSuccess}
      className={`inline-flex items-center justify-center rounded-full text-white font-medium transition-all duration-300 ${
        windowWidth < 768 ? 'w-full' : 'px-10 py-4'
      }`}
      style={{
        fontFamily: 'var(--font-satoshi)',
        fontSize: '18px',
        fontWeight: 600,
        minHeight: windowWidth < 768 ? '56px' : 'auto',
        padding: windowWidth < 768 ? '16px 24px' : undefined,
        background: isHovered && !isSubmitting && !showSuccess
          ? 'linear-gradient(135deg, #a87db7 0%, #c99ccf 100%)'
          : 'linear-gradient(135deg, #c99ccf 0%, #a87db7 100%)',
        transform: isClicked ? 'scale(0.97)' : isHovered && !isSubmitting && !showSuccess ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered && !isSubmitting && !showSuccess
          ? '0 4px 20px rgba(201,156,207,0.4)'
          : '0 2px 8px rgba(201,156,207,0.2)',
        transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
        cursor: isSubmitting || showSuccess ? 'default' : 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
      onTouchStart={() => setIsClicked(true)}
      onTouchEnd={() => setIsClicked(false)}
    >
      {isSubmitting ? (
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            style={{ animation: 'spin 1s linear infinite' }}
          />
        </div>
      ) : showSuccess ? (
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ animation: 'bounceIn 0.5s ease-out' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Merci pour votre message !</span>
        </div>
      ) : (
        'Envoyer le message'
      )}
    </button>
  );
}

