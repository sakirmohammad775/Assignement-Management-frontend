import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";

import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSections";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import BenefitsSection from "@/components/home/BenefitsSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <Navbar></Navbar>
    
      {/* Hero */}
      <Hero></Hero>
      <FeaturesSection />
      <HowItWorksSection />
      <BenefitsSection/>
      <CTASection/>
      <Footer></Footer>
    </main>
  );
}