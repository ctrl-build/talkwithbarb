'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ShieldCheck, Lightbulb, Question, CaretLeft, CaretRight } from 'phosphor-react';

export default function AboutBarb() {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    updateWindowWidth();
    window.addEventListener('resize', updateWindowWidth);
    window.addEventListener('scroll', handleScroll);

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

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (windowWidth >= 768 && !isPaused && !isDragging) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [windowWidth, isPaused, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowWidth < 768) return;
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(currentTestimonial * (carouselRef.current?.scrollWidth || 0) / testimonials.length);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || windowWidth < 768) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    const scrollPercentage = ((scrollLeft - walk) / (carouselRef.current?.scrollWidth || 1)) * 100;
    const newIndex = Math.max(0, Math.min(testimonials.length - 1, Math.round(scrollPercentage / (100 / testimonials.length))));
    setCurrentTestimonial(newIndex);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setIsPaused(false), 1000);
  };

  const philosophyCards = [
    {
      title: 'Confiance',
      subtitle: 'Confidence',
      description: 'Encourager les apprenants à parler librement',
      icon: <ShieldCheck className="w-8 h-8" weight="regular" />,
    },
    {
      title: 'Clarté',
      subtitle: 'Clarity',
      description: 'Simplifier l\'apprentissage de l\'anglais sans stress',
      icon: <Lightbulb className="w-8 h-8" weight="regular" />,
    },
    {
      title: 'Curiosité',
      subtitle: 'Curiosity',
      description: 'Rendre les cours engageants et stimulants',
      icon: <Question className="w-8 h-8" weight="regular" />,
    },
  ];

  const testimonials = [
    {
      quote: "Barb m'a aidée à surmonter ma peur de parler anglais. Ses cours sont toujours encourageants et personnalisés.",
      name: "Sophie M.",
      context: "Élève depuis 6 mois",
    },
    {
      quote: "Grâce à Barb, j'ai enfin trouvé la confiance pour parler anglais au travail. Elle adapte chaque leçon à mes besoins.",
      name: "Thomas L.",
      context: "Élève depuis 1 an",
    },
    {
      quote: "Les cours avec Barb sont un plaisir. Elle rend l'apprentissage naturel et engageant.",
      name: "Marie D.",
      context: "Élève depuis 3 mois",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 lg:py-32 overflow-hidden"
      style={{ background: '#FDFCFB'       }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-32 h-32 rounded-full opacity-5"
          style={{
            background: 'linear-gradient(135deg, #c99ccf, #a87db7)',
            top: '10%',
            left: '5%',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-24 h-24 rounded-full opacity-5"
          style={{
            background: 'linear-gradient(135deg, #a87db7, #c99ccf)',
            bottom: '15%',
            right: '8%',
            animation: 'float 25s ease-in-out infinite',
            animationDelay: '3s',
          }}
        />
      </div>

      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <div className="hidden md:grid md:grid-cols-2 md:gap-12 lg:gap-16 items-start">
          <div className="flex flex-col space-y-8">
            <div
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-canela)',
                  fontSize: windowWidth >= 1200 ? '42px' : '36px',
                  color: '#2B2B2B',
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em',
                  marginBottom: '16px',
                }}
              >
                Bonjour, je suis Barb.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-satoshi)',
                  fontSize: windowWidth >= 1200 ? '18px' : '16px',
                  fontWeight: 400,
                  color: '#6C6C6C',
                  lineHeight: '1.6',
                }}
              >
                J&apos;accompagne mes élèves à trouver{' '}
                <span className="font-medium text-[#c99ccf] transition-colors">confiance</span> et{' '}
                <span className="font-medium text-[#c99ccf] transition-colors">fluidité</span> en anglais grâce à une approche humaine et personnalisée.
              </p>
            </div>

            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {philosophyCards.map((card, index) => (
                <div
                  key={card.title}
                  className={`rounded-xl p-6 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    border: '1px solid #c99ccf',
                    background: '#FDFCFB',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    transitionDelay: `${0.2 + index * 0.1}s`,
                    transition: 'opacity 0.7s ease-out, transform 0.7s ease-out, box-shadow 0.2s ease-out',
                    transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transition = 'transform 0.2s ease-out, box-shadow 0.2s ease-out';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(201, 156, 207, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transition = 'transform 0.2s ease-out, box-shadow 0.2s ease-out';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  <div
                    className="mb-4"
                    style={{
                      color: '#c99ccf',
                    }}
                  >
                    {card.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-canela)',
                      fontSize: '20px',
                      color: '#2B2B2B',
                      marginBottom: '4px',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-satoshi)',
                      fontSize: '12px',
                      color: '#a87db7',
                      marginBottom: '8px',
                      fontWeight: 500,
                    }}
                  >
                    {card.subtitle}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-satoshi)',
                      fontSize: '14px',
                      color: '#6C6C6C',
                      lineHeight: '1.5',
                    }}
                  >
                    {card.description}
                  </p>
                </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-8">
            <div
              className={`relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                maxWidth: windowWidth >= 1200 ? '500px' : '400px',
                transitionDelay: '0.3s',
                transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              }}
            >
              <Image
                src="/assets/fonts/images/hero-image.png"
                alt="Barb"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              />
            </div>
          </div>
        </div>

        <div className="md:hidden flex flex-col space-y-8">
          <div
            className={`relative w-full max-w-xs mx-auto aspect-square rounded-2xl overflow-hidden shadow-xl transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.12)',
            }}
          >
            <Image
              src="/assets/fonts/images/hero-image.png"
              alt="Barb"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 300px, 500px"
            />
          </div>

          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-canela)',
                fontSize: '32px',
                color: '#2B2B2B',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
                marginBottom: '16px',
              }}
            >
              Bonjour, je suis Barb.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-satoshi)',
                fontSize: '16px',
                fontWeight: 400,
                color: '#6C6C6C',
                lineHeight: '1.6',
              }}
            >
              J&apos;accompagne mes élèves à trouver{' '}
              <span className="font-medium text-[#c99ccf] transition-colors">confiance</span> et{' '}
              <span className="font-medium text-[#c99ccf] transition-colors">fluidité</span> en anglais grâce à une approche humaine et personnalisée.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {philosophyCards.map((card, index) => (
              <div
                key={card.title}
                className={`rounded-xl p-6 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  border: '1px solid #c99ccf',
                  background: '#FDFCFB',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  transitionDelay: `${0.2 + index * 0.1}s`,
                  transition: 'opacity 0.7s ease-out, transform 0.7s ease-out, box-shadow 0.2s ease-out',
                  transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
                }}
              >
                <div
                  className="mb-4"
                  style={{
                    color: '#c99ccf',
                  }}
                >
                  {card.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-canela)',
                    fontSize: '20px',
                    color: '#2B2B2B',
                    marginBottom: '4px',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-satoshi)',
                    fontSize: '12px',
                    color: '#a87db7',
                    marginBottom: '8px',
                    fontWeight: 500,
                  }}
                >
                  {card.subtitle}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-satoshi)',
                    fontSize: '14px',
                    color: '#6C6C6C',
                    lineHeight: '1.5',
                  }}
                >
                  {card.description}
                </p>
              </div>
                ))}
            </div>
        </div>

        <div className="mt-16 md:mt-20">
          {windowWidth >= 768 ? (
            <div
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div 
                ref={carouselRef}
                className="overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentTestimonial * 100}%)`,
                    transition: isDragging ? 'none' : 'transform 0.5s ease-in-out',
                  }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="min-w-full flex-shrink-0 px-4 md:px-8"
                    >
                      <div
                        className="rounded-xl p-8 md:p-12"
                        style={{
                          background: '#FDFCFB',
                          border: '1px solid rgba(201, 156, 207, 0.2)',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                        }}
                      >
                        <p
                          style={{
                            fontFamily: 'var(--font-satoshi)',
                            fontSize: '18px',
                            fontWeight: 400,
                            color: '#2B2B2B',
                            lineHeight: '1.6',
                            marginBottom: '24px',
                          }}
                        >
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                        <div>
                          <p
                            style={{
                              fontFamily: 'var(--font-satoshi)',
                              fontSize: '16px',
                              fontWeight: 300,
                              color: '#6C6C6C',
                              marginBottom: '4px',
                            }}
                          >
                            {testimonial.name}
                          </p>
                          <p
                            style={{
                              fontFamily: 'var(--font-satoshi)',
                              fontSize: '14px',
                              fontWeight: 300,
                              color: '#6C6C6C',
                            }}
                          >
                            {testimonial.context}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 mt-8">
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-[#c99ccf] text-[#c99ccf] hover:bg-[#c99ccf] hover:text-white transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <CaretLeft className="w-6 h-6" weight="bold" />
                </button>

                <div className="flex gap-4">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentTestimonial ? 'bg-[#c99ccf] w-8' : 'bg-[#c99ccf] opacity-30'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-[#c99ccf] text-[#c99ccf] hover:bg-[#c99ccf] hover:text-white transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <CaretRight className="w-6 h-6" weight="bold" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-8 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    background: '#FDFCFB',
                    border: '1px solid rgba(201, 156, 207, 0.2)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                    transitionDelay: `${0.8 + index * 0.1}s`,
                    transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-satoshi)',
                      fontSize: '16px',
                      fontWeight: 400,
                      color: '#2B2B2B',
                      lineHeight: '1.6',
                      marginBottom: '20px',
                    }}
                  >
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                    <div>
                      <p
                        style={{
                          fontFamily: 'var(--font-satoshi)',
                          fontSize: '16px',
                          fontWeight: 300,
                          color: '#6C6C6C',
                          marginBottom: '4px',
                        }}
                      >
                        {testimonial.name}
                      </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-satoshi)',
                        fontSize: '14px',
                        fontWeight: 300,
                        color: '#6C6C6C',
                      }}
                    >
                      {testimonial.context}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

