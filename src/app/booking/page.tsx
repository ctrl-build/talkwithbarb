import BookingHero from '@/components/booking/BookingHero';
import BookingCalendly from '@/components/booking/BookingCalendly';
import BookingReassurance from '@/components/booking/BookingReassurance';
import Footer from '@/components/Footer';

export default function BookingPage() {
  return (
    <div className="bg-[#FDFCFB]">
      <BookingHero />
      <BookingCalendly />
      <BookingReassurance />
      <Footer />
    </div>
  );
}

