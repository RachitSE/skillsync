export type RoadmapStage = {
    stage: string;
    goal: string;
    duration: string;
    steps: {
      title: string;
      details: string;
    }[];
  };
  
  export const generateRoadmap = async (
    career: string
  ): Promise<RoadmapStage[] | null> => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
    if (!apiKey) {
      console.error("❌ Gemini API key not found.");
      return null;
    }
  
    const endpoint =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
  
    const headers = {
      "Content-Type": "application/json",
    };
  
    const body = {
      contents: [
        {
          parts: [
            {
              text: `You're an expert career counselor for Indian students. Return a JSON-formatted roadmap for someone who wants to become a ${career} in India.
  
  Strictly return only valid JSON, in this format:
  
  [
    {
      "stage": "Stage Name (e.g. Foundational Stage)",
      "goal": "Goal of this stage",
      "duration": "How long this stage usually takes",
      "steps": [
        {
          "title": "Step title",
          "details": "What to do, how to do it, resources, links, tips, etc."
        }
      ]
    }
  ]
  
  Make sure the content is relevant to India (education system, costs, resources, the salaries etc.). Do NOT include any explanation or commentary outside the JSON. Only valid JSON.`,
            },
          ],
        },
      ],
    };
  
    try {
      const res = await fetch(`${endpoint}?key=${apiKey}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        console.error("❌ API Error:", data);
        return null;
      }
  
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!raw) return null;
  
      // 🧼 Clean up Gemini's Markdown formatting (```json ... ```)
      const cleaned = raw
        .replace(/^```json\s*/, "")
        .replace(/```$/, "")
        .trim();
  
      try {
        const parsed = JSON.parse(cleaned);
        return parsed;
      } catch (err) {
        console.error("❌ Failed to parse Gemini response as JSON:", err);
        console.log("📦 Raw Gemini response:", raw);
        return null;
      }
    } catch (err) {
      console.error("❌ Error generating roadmap:", err);
      return null;
    }
  };
  