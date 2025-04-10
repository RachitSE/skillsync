type CareerSuggestionsProps = {
    setCareer: React.Dispatch<React.SetStateAction<string>>;
  };
  
  export default function CareerSuggestions({ setCareer }: CareerSuggestionsProps) {
    const careers = [
      "Software Engineer",
      "UPSC / IAS",
      "UX Designer",
      "MBA (IIMs)",
      "Startup Founder",
      "Study Abroad (MS)",
      "Chartered Accountant",
      "Product Manager",
    ];
  
    return (
      <section className="w-full py-20 bg-transparent">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
            Explore Popular Career Goals
          </h2>
  
          <div className="flex flex-wrap gap-4 justify-center">
            {careers.map((career, index) => (
              <button
                key={index}
                onClick={() => setCareer(career)}
                className="bg-[#151935] text-white text-sm px-5 py-2 rounded-full border border-[#2F3864] hover:bg-indigo-500 transition"
              >
                {career}
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }
  