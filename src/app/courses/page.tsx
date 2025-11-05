import CoursesHero from '@/components/courses/CoursesHero';
import CoursesOverview from '@/components/courses/CoursesOverview';
import CoursesDetailed from '@/components/courses/CoursesDetailed';
import CoursesApproach from '@/components/courses/CoursesApproach';
import CoursesCTA from '@/components/courses/CoursesCTA';
import Footer from '@/components/Footer';

export default function CoursesPage() {
  return (
    <div className="bg-[#FDFCFB]">
      <CoursesHero />
      <CoursesOverview />
      <CoursesDetailed />
      <CoursesApproach />
      <CoursesCTA />
      <Footer />
    </div>
  );
}

