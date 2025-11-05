'use client';

import { useState, useEffect, useRef } from 'react';
import { CaretLeft, CaretRight } from 'phosphor-react';

export default function AboutTestimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!isPaused && !isDragging) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, isDragging]);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    if (windowWidth < 768) {
      setTouchStart(e.targetTouches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (windowWidth < 768) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    if (windowWidth < 768) {
      if (!touchStart || !touchEnd) return;
      
      const distance = touchStart - touchEnd;
      const minSwipeDistance = 50;

      if (distance > minSwipeDistance) {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }
      
      if (distance < -minSwipeDistance) {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      }
      
      setTouchStart(0);
      setTouchEnd(0);
    }
  };

  const testimonials = [
    {
      quote: "Barb m'a aidée à surmonter ma peur de parler anglais. Ses cours sont toujours encourageants et personnalisés.",
      name: "Sophie M.",
      occupation: "Étudiante en marketing",
    },
    {
      quote: "Grâce à Barb, j'ai enfin trouvé la confiance pour parler anglais au travail. Elle adapte chaque leçon à mes besoins.",
      name: "Marc L.",
      occupation: "Directeur commercial",
    },
    {
      quote: "Les cours de Barb sont dynamiques et pertinents. J'ai fait d'énormes progrès en peu de temps.",
      name: "Léa D.",
      occupation: "Développeuse web",
    },
    {
      quote: "Barb rend l'apprentissage de l'anglais naturel et agréable. Je recommande vivement ses cours.",
      name: "Thomas R.",
      occupation: "Consultant",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 lg:py-32"
      style={{ background: '#FDFCFB' }}
    >
      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <h2
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
          style={{
            fontFamily: 'var(--font-canela)',
            fontSize: windowWidth >= 1200 ? '42px' : windowWidth >= 768 ? '36px' : '32px',
            fontWeight: 400,
            color: '#2B2B2B',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
          }}
        >
          Ce que disent mes élèves
        </h2>

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
                className="flex transition-transform duration-500"
                style={{
                  transform: `translateX(-${currentTestimonial * (100 / (windowWidth >= 1200 ? 3 : 2))}%)`,
                  transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 px-4"
                    style={{
                      width: windowWidth >= 1200 ? '33.333%' : '50%',
                    }}
                  >
                    <div
                      className="rounded-xl p-8 md:p-12 bg-white h-full"
                      style={{
                        border: '1px solid rgba(201, 156, 207, 0.2)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                      }}
                      onMouseEnter={(e) => {
                        if (windowWidth >= 768) {
                          e.currentTarget.style.transform = 'translateY(-4px) rotateY(1deg)';
                          e.currentTarget.style.transition = 'transform 0.3s ease-out';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (windowWidth >= 768) {
                          e.currentTarget.style.transform = 'translateY(0) rotateY(0deg)';
                        }
                      }}
                    >
                      <div
                        className="mb-6"
                        style={{
                          width: '40px',
                          height: '2px',
                          background: 'linear-gradient(90deg, #c99ccf, transparent)',
                        }}
                      />
                      <p
                        style={{
                          fontFamily: 'var(--font-canela)',
                          fontSize: '20px',
                          fontStyle: 'italic',
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
                            fontWeight: 500,
                            color: '#2B2B2B',
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
                          {testimonial.occupation}
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
          <div
            className="overflow-hidden relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${currentTestimonial * 100}%)`,
                transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full px-2"
                >
                  <div
                    className={`rounded-xl p-8 bg-white transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      border: '1px solid rgba(201, 156, 207, 0.2)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                      transitionDelay: `${0.2 + index * 0.1}s`,
                      transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                  >
                <div
                  className="mb-6"
                  style={{
                    width: '40px',
                    height: '2px',
                    background: 'linear-gradient(90deg, #c99ccf, transparent)',
                  }}
                />
                    <p
                      style={{
                        fontFamily: 'var(--font-canela)',
                        fontSize: '20px',
                        fontStyle: 'italic',
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
                      fontWeight: 500,
                      color: '#2B2B2B',
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
                    {testimonial.occupation}
                    </p>
                  </div>
                </div>
              </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-8">
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
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

