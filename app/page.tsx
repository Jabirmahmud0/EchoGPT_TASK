import { LandingNavbar } from "@/components/landing/navbar";
import { LandingHero } from "@/components/landing/hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Sticky Marketing Navbar */}
      <LandingNavbar />

      {/* Main Landing Sections */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <LandingHero />
      </main>
    </div>
  );
}
