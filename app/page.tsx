import { LandingNavbar } from "@/components/landing/navbar";
import { LandingHero } from "@/components/landing/hero";
import { FeaturesBento } from "@/components/landing/features-bento";
import { ModelsRibbon } from "@/components/landing/models-ribbon";
import { ProductPreview } from "@/components/landing/product-preview";
import { WhyChooseUs } from "@/components/landing/why-choose-us";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CtaBanner } from "@/components/landing/cta-banner";
import { LandingFooter } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-emerald-500/20 selection:text-emerald-400">
      {/* Marketing Navbar */}
      <LandingNavbar />

      {/* Main Landing Page Flow */}
      <main className="flex-1 flex flex-col">
        {/* 1. Hero Section */}
        <LandingHero />

        {/* 2. Features Bento Grid */}
        <FeaturesBento />

        {/* 3. AI Models Matrix */}
        <ModelsRibbon />

        {/* 4. Screenshots & Product Preview Tour */}
        <ProductPreview />

        {/* 5. Why Choose EchoGPT (Interactive Savings Calculator & Architecture Matrix) */}
        <WhyChooseUs />

        {/* 6. Pricing (3-Tier Cards & Simulated Checkout) */}
        <PricingSection />

        {/* 7. FAQ (Categorized & Searchable Accordion) */}
        <FaqSection />

        {/* 8. Testimonials (Verified Social Proof Grid) */}
        <TestimonialsSection />

        {/* 9. Call-to-Action Terminal Runner */}
        <CtaBanner />
      </main>

      {/* 10. Architectural 6-Column Footer */}
      <LandingFooter />
    </div>
  );
}
