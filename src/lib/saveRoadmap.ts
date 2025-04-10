// lib/saveRoadmap.ts
import { User } from "firebase/auth";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { RoadmapStage } from "@/types/roadmap"; // Only if using typed stages

export const saveRoadmap = async (
  career: string,
  user: User,
  roadmap: RoadmapStage[] // <-- note the change from string to structured object
) => {
  try {
    await addDoc(collection(db, "users", user.uid, "roadmaps"), {
      career,
      roadmap,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("❌ Error saving roadmap:", error);
  }
};
