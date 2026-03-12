import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { PortfolioPreview } from "@/components/PortfolioPreview";
import { ReviewsPreview } from "@/components/ReviewsPreview";
import { BookingCTA } from "@/components/BookingCTA";
import { ContactSection } from "@/components/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <PortfolioPreview />
      <ReviewsPreview />
      <BookingCTA />
      <ContactSection />
    </>
  );
}
