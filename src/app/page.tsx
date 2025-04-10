"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";
import CareerSuggestions from "@/components/CareerSuggestions";

export default function Home() {
  const [career, setCareer] = useState<string>("");

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-[#0A0F2C] text-white">
      <Navbar />
      <Hero career={career} setCareer={setCareer} />
      <HowItWorks />
      <FeaturesSection />
      <CareerSuggestions setCareer={setCareer} />
    </main>
  );
}
