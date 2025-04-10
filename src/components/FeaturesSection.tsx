// src/components/FeaturesSection.tsx

import { LucideSparkles, LucideGlobe, LucideUserCheck } from "lucide-react";

const features = [
  {
    icon: <LucideSparkles className="h-6 w-6 text-indigo-400" />,
    title: "Made for India",
    description: "We factor in exams, jobs, and realities specific to the Indian education & career system.",
  },
  {
    icon: <LucideGlobe className="h-6 w-6 text-indigo-400" />,
    title: "Global Tech, Local Lens",
    description: "Powered by Gemini, trained on local contexts to give relevant roadmaps.",
  },
  {
    icon: <LucideUserCheck className="h-6 w-6 text-indigo-400" />,
    title: "You-first Design",
    description: "Minimal fluff, maximum clarity. Built to get you from confused → clear.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          Why SkillSync?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#111324] rounded-2xl p-6 text-left shadow-md hover:shadow-xl transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
