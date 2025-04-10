import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { RoadmapStage } from "@/types/roadmap";

type RoadmapCardProps = {
  career: string;
  roadmap: RoadmapStage[];
  timestamp?: Date | null;
};

export default function RoadmapCard({
  career,
  roadmap,
  timestamp,
}: RoadmapCardProps) {
  const date = timestamp
    ? format(new Date(timestamp), "do MMM yyyy, h:mm a")
    : "Unknown date";

  return (
    <Card className="bg-[#11152F] text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden">
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">{career}</h2>
        <p className="text-sm text-white/50">Saved on {date}</p>

        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent">
        {roadmap.map((stage, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-semibold text-blue-400">
                {stage.stage}
              </h3>
              <ul className="list-disc list-inside mt-2 space-y-1 pl-2 text-sm">
                {stage.steps.map((step, i) => (
                  <li key={i}>
                    <strong>{step.title}:</strong> {step.details}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
