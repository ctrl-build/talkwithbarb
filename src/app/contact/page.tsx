import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactCTA from '@/components/contact/ContactCTA';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <div className="bg-[#FDFCFB]">
      <ContactHero />
      <ContactForm />
      <ContactInfo />
      <ContactCTA />
      <Footer />
    </div>
  );
}

