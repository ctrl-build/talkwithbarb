'use client';

import { useState, useEffect, useRef } from 'react';
import { CaretDown } from 'phosphor-react';

export default function CoursesDetailed() {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const courses = [
    {
      title: 'Conversation fluide',
      subtitle: 'Parlez anglais avec naturel et aisance',
      description: 'Ces cours sont conçus pour vous aider à développer votre capacité à communiquer naturellement en anglais. Nous travaillons sur la fluidité, la prononciation et la confiance à l\'oral à travers des conversations authentiques et des exercices pratiques adaptés à votre niveau.',
      methods: 'Conversations guidées, jeux de rôle, exercices de prononciation, échanges sur des sujets variés.',
      duration: 'Sessions de 60 minutes, hebdomadaires ou bi-hebdomadaires.',
      outcomes: 'Confiance accrue à l\'oral, vocabulaire enrichi, prononciation améliorée.',
    },
    {
      title: 'Préparation d\'entretiens',
      subtitle: 'Excellence pour vos entretiens professionnels',
      description: 'Préparez-vous à réussir vos entretiens en anglais avec un programme personnalisé qui couvre tous les aspects : présentation personnelle, réponses aux questions courantes, gestion du stress, et communication professionnelle.',
      methods: 'Simulations d\'entretiens, analyse de questions types, techniques de présentation, feedback personnalisé.',
      duration: 'Sessions intensives de 90 minutes, sur 2 à 4 semaines selon vos besoins.',
      outcomes: 'Préparation complète, confiance renforcée, compétences de communication professionnelle.',
    },
    {
      title: 'Anglais professionnel',
      subtitle: 'Maîtrisez l\'anglais dans votre contexte professionnel',
      description: 'Développez vos compétences en anglais spécifiques à votre secteur d\'activité. Que vous travailliez dans le marketing, la finance, la tech ou tout autre domaine, nous adaptons le contenu à vos besoins professionnels.',
      methods: 'Vocabulaire sectoriel, cas pratiques professionnels, rédaction d\'emails et documents, présentations.',
      duration: 'Sessions de 60 à 90 minutes, fréquence adaptée à vos objectifs.',
      outcomes: 'Maîtrise du vocabulaire professionnel, communication efficace au travail, autonomie accrue.',
    },
    {
      title: 'Sessions intensives',
      subtitle: 'Progrès rapides et résultats mesurables',
      description: 'Accélérez votre apprentissage avec un programme intensif conçu pour des progrès rapides. Idéal pour une préparation à un examen, un entretien, ou simplement pour booster votre niveau rapidement.',
      methods: 'Sessions fréquentes, exercices ciblés, suivi personnalisé, évaluations régulières.',
      duration: 'Sessions de 90 minutes, 3 à 5 fois par semaine, sur 2 à 6 semaines.',
      outcomes: 'Progrès significatifs en peu de temps, objectifs atteints rapidement, motivation renforcée.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 lg:py-32"
      style={{ background: '#FAF7FB' }}
    >
      <div className="container mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        <div className="max-w-4xl mx-auto">
          {courses.map((course, index) => (
            <div
              key={course.title}
              className={`mb-6 transition-all duration-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: `${0.1 * index}s`,
                transitionDuration: '0.4s',
                transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left rounded-xl p-6 md:p-8 bg-white transition-all duration-300"
                style={{
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                  border: openIndex === index ? '2px solid #c99ccf' : '2px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (windowWidth >= 768 && openIndex !== index) {
                    e.currentTarget.style.borderColor = 'rgba(201, 156, 207, 0.5)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(201, 156, 207, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (windowWidth >= 768 && openIndex !== index) {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08)';
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3
                      style={{
                        fontFamily: 'var(--font-canela)',
                        fontSize: windowWidth >= 1200 ? '32px' : windowWidth >= 768 ? '28px' : '24px',
                        fontWeight: 400,
                        color: '#2B2B2B',
                        marginBottom: '8px',
                        lineHeight: '1.2',
                      }}
                    >
                      {course.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-satoshi)',
                        fontSize: '18px',
                        fontWeight: 400,
                        color: '#6C6C6C',
                        lineHeight: '1.4',
                      }}
                    >
                      {course.subtitle}
                    </p>
                  </div>
                  <CaretDown
                    className="ml-4 flex-shrink-0 transition-transform duration-500"
                    style={{
                      color: '#c99ccf',
                      transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transitionTimingFunction: 'cubic-bezier(0.42, 0, 0.58, 1)',
                    }}
                    weight="bold"
                    size={24}
                  />
                </div>
              </button>

              <div
                className="overflow-hidden transition-all duration-500"
                style={{
                  maxHeight: openIndex === index ? '2000px' : '0',
                  transitionTimingFunction: 'cubic-bezier(0.42, 0, 0.58, 1)',
                }}
              >
                <div className="pt-6 px-6 md:px-8 pb-8 bg-white rounded-b-xl">
                  <p
                    className="mb-6"
                    style={{
                      fontFamily: 'var(--font-satoshi)',
                      fontSize: '16px',
                      fontWeight: 400,
                      color: '#6C6C6C',
                      lineHeight: '1.8',
                    }}
                  >
                    {course.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-satoshi)',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#2B2B2B',
                          marginBottom: '4px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        Méthodes
                      </h4>
                      <p
                        style={{
                          fontFamily: 'var(--font-satoshi)',
                          fontSize: '16px',
                          fontWeight: 400,
                          color: '#6C6C6C',
                          lineHeight: '1.6',
                        }}
                      >
                        {course.methods}
                      </p>
                    </div>

                    <div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-satoshi)',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#2B2B2B',
                          marginBottom: '4px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        Durée
                      </h4>
                      <p
                        style={{
                          fontFamily: 'var(--font-satoshi)',
                          fontSize: '16px',
                          fontWeight: 400,
                          color: '#6C6C6C',
                          lineHeight: '1.6',
                        }}
                      >
                        {course.duration}
                      </p>
                    </div>

                    <div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-satoshi)',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#2B2B2B',
                          marginBottom: '4px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        Résultats attendus
                      </h4>
                      <p
                        style={{
                          fontFamily: 'var(--font-satoshi)',
                          fontSize: '16px',
                          fontWeight: 400,
                          color: '#6C6C6C',
                          lineHeight: '1.6',
                        }}
                      >
                        {course.outcomes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

