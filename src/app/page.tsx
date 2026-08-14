
import BenefitsSection from "@/components/home/BenefitsSection";
import CTASection from "@/components/home/CTASection";
import FeaturedSection from "@/components/home/FeaturedSection";
import Footer from "@/components/home/Footer";
import Banner from "@/components/home/Hero";
import HowItWorkSection from "@/components/home/HowItWorksSection";
import Navbar from "@/components/home/Navbar";

import { Contact } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <Navbar></Navbar>
      {/* Hero */}
      <Banner></Banner>
      <CTASection/>
      <BenefitsSection></BenefitsSection>
      <HowItWorkSection></HowItWorkSection>
      <FeaturedSection></FeaturedSection>
      <Contact></Contact>
      <Footer></Footer>
    </main>
  );
}