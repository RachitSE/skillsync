"use client";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { saveRoadmap } from "@/lib/saveRoadmap";
import { generateRoadmap } from "@/lib/generateRoadmap";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";

type HeroProps = {
  career: string;
  setCareer: React.Dispatch<React.SetStateAction<string>>;
};

export default function Hero({ career, setCareer }: HeroProps) {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    if (!career.trim()) return;
    if (!user) {
      setError("Please log in to generate a roadmap.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const roadmap = await generateRoadmap(career);

      if (!roadmap) {
        setError("Something went wrong while generating. Try again!");
        return;
      }

      await saveRoadmap(career, user, roadmap);
      setShowModal(true); // Show modal on success
    } catch (err) {
      console.error(err);
      setError("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen w-full bg-[#0A0F2C] flex items-center relative overflow-hidden px-8 md:px-20">
      <div className="z-10 max-w-xl">
        <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-6">
          Craft your career,<br />the smart way.
        </h1>
        <p className="text-white/70 text-lg mb-8">
          AI-powered roadmaps tailored for you —<br />
          built for the Indian reality.
        </p>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="What career are you aiming for?"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
            className="bg-[#11152F] text-white placeholder-white/50 px-4 py-3 rounded-lg w-full max-w-sm focus:outline-none"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-[#4C5FD5] hover:bg-[#5e6ced] text-white px-4 py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>

      {/* Glowy blob */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4C5FD5] opacity-50 blur-[200px] rounded-full" />

      {/* Modal Popup */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-[#11152F] text-white p-6 space-y-4 border border-white/10 shadow-xl">
            <Dialog.Title className="text-2xl font-semibold">🎉 Roadmap Ready!</Dialog.Title>
            <p>
              Your roadmap for <span className="text-blue-400 font-medium">{career}</span> has been generated and saved.
            </p>
            <button
              onClick={() => {
                setShowModal(false);
                router.push("/dashboard");
              }}
              className="mt-4 bg-[#4C5FD5] hover:bg-[#5e6ced] text-white px-4 py-2 rounded-lg transition"
            >
              Go to Dashboard
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </section>
  );
}
