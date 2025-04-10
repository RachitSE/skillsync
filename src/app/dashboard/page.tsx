"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import RoadmapFlow from "@/components/RoadmapFlow";
import { RoadmapStage } from "@/types/roadmap";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

type RoadmapData = {
  id: string;
  career: string;
  roadmap: RoadmapStage[];
  timestamp: Date | null;
};

export default function DashboardPage() {
  const [user, loading] = useAuthState(auth);
  const [roadmaps, setRoadmaps] = useState<RoadmapData[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
      return;
    }

    const fetchRoadmaps = async () => {
      if (!user) return;

      const q = query(
        collection(db, "users", user.uid, "roadmaps"),
        orderBy("timestamp", "desc")
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => {
        const roadmap = doc.data();
        return {
          id: doc.id,
          career: roadmap.career,
          roadmap: roadmap.roadmap as RoadmapStage[],
          timestamp: roadmap.timestamp
            ? (roadmap.timestamp as Timestamp).toDate()
            : null,
        };
      });

      setRoadmaps(data);
      setIsFetching(false);
    };

    fetchRoadmaps();
  }, [user, loading, router]);

  const handleDelete = async (id: string) => {
    if (!user) return;

    await deleteDoc(doc(db, "users", user.uid, "roadmaps", id));
    setRoadmaps((prev) => prev.filter((r) => r.id !== id));
  };

  if (loading || isFetching) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F2C] to-[#090c24] text-white p-6 md:p-12 space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">Your Saved Roadmaps</h1>
        <Button
          onClick={() => router.push("/")}
          className="bg-[#11152F] text-white hover:bg-[#1a1f3b] flex items-center gap-2 border border-white/10"
          variant="outline"
        >
          <Home size={18} /> Home
        </Button>
      </div>

      {roadmaps.length === 0 ? (
        <p className="text-white/60">No roadmaps saved yet.</p>
      ) : (
        <div className="space-y-12">
          {roadmaps.map((r) => (
            <RoadmapFlow
              key={r.id}
              id={r.id}
              career={r.career}
              stages={r.roadmap}
              onDelete={() => handleDelete(r.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
