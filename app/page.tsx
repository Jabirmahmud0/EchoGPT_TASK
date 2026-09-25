import { LandingNavbar } from "@/components/landing/navbar";
import { LandingHero } from "@/components/landing/hero";
import { FeaturesBento } from "@/components/landing/features-bento";
import { ModelsRibbon } from "@/components/landing/models-ribbon";
import { ProductPreview } from "@/components/landing/product-preview";
import { PricingSection } from "@/components/landing/pricing-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Sticky Marketing Navbar */}
      <LandingNavbar />

      {/* Main Landing Sections */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <LandingHero />

        {/* Features Bento Grid */}
        <FeaturesBento />

        {/* Supported AI Models Ribbon */}
        <ModelsRibbon />

        {/* Product Preview Section */}
        <ProductPreview />

        {/* Value Matrix & Pricing Section */}
        <PricingSection />
      </main>
    </div>
  );
}
