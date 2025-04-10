"use client";
import { motion } from "framer-motion";
import { Sparkles, Settings, CheckCircle2 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "1. Tell us your goal",
      desc: "Whether it's UPSC, Data Science, or your dream startup — start by entering your goal.",
      icon: <Sparkles size={28} className="text-[#4C5FD5]" />,
    },
    {
      title: "2. AI builds your roadmap",
      desc: "Gemini understands your path, Indian context, and creates a step-by-step plan just for you.",
      icon: <Settings size={28} className="text-[#4C5FD5]" />,
    },
    {
      title: "3. Take action, your way",
      desc: "From online courses to offline exams — SkillSync gives you realistic, flexible next steps.",
      icon: <CheckCircle2 size={28} className="text-[#4C5FD5]" />,
    },
  ];

  return (
    <section className="bg-[#0A0F2C] py-24 px-6 md:px-20 text-white">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
      >
        How SkillSync Works
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="bg-[#11152F] p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-white/70 text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
