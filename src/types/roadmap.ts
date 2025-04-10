export type RoadmapStep = {
    title: string;
    details: string;
    resources?: string[];
    duration?: string;
  };
  
  export type RoadmapStage = {
    stage: string;
    steps: RoadmapStep[];
  };
  