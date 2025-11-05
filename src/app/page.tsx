import Hero from '@/components/Hero';
import AboutBarb from '@/components/AboutBarb';
import ServicesOverview from '@/components/ServicesOverview';
import JournalPreview from '@/components/JournalPreview';
import ContactTeaser from '@/components/ContactTeaser';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="bg-[#FDFCFB]">
      <Hero />
      <AboutBarb />
      <ServicesOverview />
      <JournalPreview />
      <ContactTeaser />
      <Footer />
    </div>
  );
}
