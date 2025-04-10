import { RoadmapStage } from "@/types/roadmap";
import { ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
  career: string;
  stages: RoadmapStage[];
  onDelete?: () => void;
};

export default function RoadmapFlow({ career, stages, onDelete }: Props) {
  return (
    <div className="relative bg-gradient-to-br from-[#0D102B] to-[#090c24] p-8 rounded-3xl shadow-2xl border border-white/10">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-4xl font-bold text-center text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
          {career}
        </h2>
        {onDelete && (
          <Button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 text-sm"
            variant="destructive"
          >
            <Trash2 size={16} /> Delete
          </Button>
        )}
      </div>

      <div className="flex gap-8 items-start overflow-x-auto px-4 pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
        {stages.map((stage, index) => (
          <div key={index} className="flex items-center">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl p-6 w-[300px] shrink-0 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 ease-in-out">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                {stage.stage}
              </h3>
              <ul className="list-disc list-inside text-sm text-white/90 space-y-1 max-h-[200px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/20">
                {stage.steps.map((step, idx) => (
                  <li key={idx}>
                    <span className="font-bold">{step.title}:</span> {step.details}
                  </li>
                ))}
              </ul>
            </div>

            {index !== stages.length - 1 && (
              <div className="px-3 text-white/40">
                <ArrowRight size={28} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
