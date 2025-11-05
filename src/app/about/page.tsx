import AboutHero from '@/components/about/AboutHero';
import AboutPhilosophy from '@/components/about/AboutPhilosophy';
import AboutTeachingApproach from '@/components/about/AboutTeachingApproach';
import AboutJourney from '@/components/about/AboutJourney';
import AboutTestimonials from '@/components/about/AboutTestimonials';
import AboutCTABanner from '@/components/about/AboutCTABanner';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="bg-[#FDFCFB]">
      <AboutHero />
      <AboutPhilosophy />
      <AboutTeachingApproach />
      <AboutJourney />
      <AboutTestimonials />
      <AboutCTABanner />
      <Footer />
    </div>
  );
}

