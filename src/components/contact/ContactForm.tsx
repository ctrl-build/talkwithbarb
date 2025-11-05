'use client';

import { useState, useEffect, useRef } from 'react';

export default function ContactForm() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [fieldValues, setFieldValues] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const formRef = useRef<HTMLFormElement>(null);

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

  const isFieldActive = (fieldName: string) => {
    return focusedField === fieldName || fieldValues[fieldName as keyof typeof fieldValues].length > 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSubmitting(false);
    setShowSuccess(true);
    setFieldValues({ name: '', email: '', message: '' });
    setFocusedField(null);
  };

  return (
    <section
      id="contact-form"
      className="relative py-20 md:py-24 lg:py-32"
      style={{ background: '#FDFCFB' }}
    >
      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <div className="max-w-2xl mx-auto">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-8 bg-white rounded-xl"
            style={{
              padding: windowWidth < 768 ? '20px 24px' : windowWidth < 1200 ? '32px' : '48px',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
            }}
          >
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                required
                value={fieldValues.name}
                className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-[#E0D4EA] focus:border-[#c99ccf] outline-none transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-satoshi)',
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#2B2B2B',
                  transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
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
                  transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
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
                className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-[#E0D4EA] focus:border-[#c99ccf] outline-none transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-satoshi)',
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#2B2B2B',
                  transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
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
                  transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
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
                className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-[#E0D4EA] focus:border-[#c99ccf] outline-none transition-all duration-300 resize-none"
                style={{
                  fontFamily: 'var(--font-satoshi)',
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#2B2B2B',
                  transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
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
                  transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
                }}
              >
                Message
              </label>
            </div>

            {showSuccess ? (
              <div
                className="flex items-center gap-3 text-[#c99ccf] transition-all duration-800"
                style={{
                  fontFamily: 'var(--font-satoshi)',
                  fontSize: '16px',
                  fontWeight: 400,
                  transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)',
                }}
              >
                  <svg
                    className="w-6 h-6 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: '24',
                      strokeDashoffset: showSuccess ? '0' : '24',
                      transition: 'stroke-dashoffset 0.8s cubic-bezier(0.33, 1, 0.68, 1)',
                    }}
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                <span>Merci pour votre message !</span>
              </div>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full md:w-auto md:mx-auto flex items-center justify-center px-10 py-4 rounded-full text-white font-medium transition-all duration-300 relative overflow-hidden ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                style={{
                  fontFamily: 'var(--font-satoshi)',
                  fontSize: '18px',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #c99ccf 0%, #a87db7 100%)',
                  backgroundSize: '200% 200%',
                  boxShadow: '0 2px 8px rgba(201,156,207,0.2)',
                  transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
                  transform: isSubmitting ? 'scale(0.97)' : 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'scale(1.03)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,156,207,0.4)';
                    e.currentTarget.style.animation = 'gradientRipple 2s ease-in-out infinite';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(201,156,207,0.2)';
                    e.currentTarget.style.animation = 'none';
                  }
                }}
                onClick={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'scale(0.97)';
                  }
                }}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                      style={{
                        animation: 'spin 1s linear infinite',
                      }}
                    />
                    <span>Envoi en cours...</span>
                  </div>
                ) : (
                  'Envoyer le message'
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

