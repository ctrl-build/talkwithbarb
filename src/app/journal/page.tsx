import JournalHero from '@/components/journal/JournalHero';
import JournalEmptyState from '@/components/journal/JournalEmptyState';
import Footer from '@/components/Footer';

export default function JournalPage() {
  return (
    <div className="bg-[#FDFCFB]">
      <JournalHero />
      <JournalEmptyState />
      <Footer />
    </div>
  );
}

