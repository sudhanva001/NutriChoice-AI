import React, { useState } from "react";
import { ComparisonData } from "../types";
import { INITIAL_COMPARISON } from "../data/mockData";

interface AssistantViewProps {
  onChooseMeal: (title: string, calories: number, protein: number, carbs: number, fat: number) => void;
  onAddGroceryItem: (name: string, category: "Fresh Produce" | "Proteins" | "Dairy & Alternatives" | "Healthy Snacks") => void;
}

export const AssistantView: React.FC<AssistantViewProps> = ({
  onChooseMeal,
  onAddGroceryItem,
}) => {
  const [comparison, setComparison] = useState<ComparisonData>(INITIAL_COMPARISON);
  const [customOptionA, setCustomOptionA] = useState("");
  const [customOptionB, setCustomOptionB] = useState("");
  const [isComparing, setIsComparing] = useState(false);

  // AI Chat state
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([
    {
      sender: "bot",
      text: "Hi! I'm NutriCoach. Ask me to compare any two meals, or tell me what you're craving and I'll find a high-protein, satisfying swap!",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSendingMsg, setIsSendingMsg] = useState(false);

  const handleCustomCompareSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customOptionA.trim() || !customOptionB.trim()) return;

    setIsComparing(true);
    try {
      const res = await fetch("/api/compare-meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionA: customOptionA, optionB: customOptionB }),
      });
      const data = await res.json();
      if (data.userChoice && data.coachRecommendation) {
        setComparison({
          userChoice: {
            ...data.userChoice,
            macros: {
              protein: data.userChoice.protein || 30,
              carbs: data.userChoice.carbs || 45,
              fat: data.userChoice.fat || 40,
            },
            imageUrl:
              data.userChoice.imageUrl ||
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCp88HXpClyLP9Oecuq8u0LQYXmxxoyppcQOf_2CNsQDuG2LcE4r8qm82rt-IHSqPuGGsL6nyGuW6_ub8_3UE7xdV2j8ayZ0s6mBIpGQTA9wG5pvlgFSa9HCKIlpoaMRh8ZKvQoNN4Vz1JiKsB4khFxh1nj5sJ3sxrcyQlZB4ukL8GyOHDvPNMcoOh6qp9eJbO1UT6xQ5MjID7nPGFu2IT5yieeIGFMPSeEaTqucPhPrZqcHBwyOxs5PLOWyrcsCYBAEmQe2F3uPB4A",
          },
          coachRecommendation: {
            ...data.coachRecommendation,
            macros: {
              protein: data.coachRecommendation.protein || 35,
              carbs: data.coachRecommendation.carbs || 30,
              fat: data.coachRecommendation.fat || 15,
            },
            imageUrl:
              data.coachRecommendation.imageUrl ||
              "https://lh3.googleusercontent.com/aida-public/AB6AXuBxebWF4OS7iP9kZH62_Ll7nucdN_4m8_f1TOg69mSTG0was2zku-6clEdM57L_0afng45eflCD6B7HFzjhNBl2gA7HIhmxu6E0VJoUD9t_5wjpabY5dOfA_BHNeiAP6qdMUiVrThFSGF9ugdZEgeSO5VW-QYz8XWfkMyYoOlWeRbILc0VpsyZaoOgXFlgRQZoKBq0EffcMLomSivYCVEqOvBhQuIniaQjv--px38cYaqHzE3KOBrKV6GUAykg1JSGuxVXuoK2v-T_H",
          },
          whyRecommendation: data.whyRecommendation || { digestion: "Medium", satiety: "High" },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsComparing(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSendingMsg) return;

    const userText = inputMessage.trim();
    setInputMessage("");
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setIsSendingMsg(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });
      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply || "For balanced energy, prioritize lean protein and colorful greens!" },
      ]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: "I'm having trouble connecting right now, but feel free to ask again in a moment!" },
      ]);
    } finally {
      setIsSendingMsg(false);
    }
  };

  const { userChoice, coachRecommendation, whyRecommendation } = comparison;

  return (
    <main className="max-w-md mx-auto px-5 pt-20 pb-32">
      {/* Title Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <h2 className="font-['Lexend'] font-bold text-2xl text-slate-900 dark:text-slate-100">
            Decision Assistant
          </h2>
          <button
            onClick={() => setShowChat(!showChat)}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-[#4b41e1] hover:bg-indigo-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            {showChat ? "Hide Chat" : "AI Coach Chat"}
          </button>
        </div>
        <p className="font-['Manrope'] text-sm text-slate-500 dark:text-slate-400">
          Real-time comparison for your next meal
        </p>
      </div>

      {/* Optional Custom Comparison Form */}
      <details className="mb-6 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
        <summary className="font-['Manrope'] font-bold text-xs uppercase tracking-wider text-[#4b41e1] cursor-pointer flex items-center justify-between">
          <span>Compare custom meals with AI</span>
          <span className="material-symbols-outlined text-[18px]">expand_more</span>
        </summary>
        <form onSubmit={handleCustomCompareSubmit} className="mt-3 space-y-3">
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase">
              Option A (Craving / Usual)
            </label>
            <input
              type="text"
              placeholder="e.g. Pepperoni Pizza"
              value={customOptionA}
              onChange={(e) => setCustomOptionA(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-[#4b41e1]"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase">
              Option B (Healthier Swap)
            </label>
            <input
              type="text"
              placeholder="e.g. Grilled Chicken Caesar Wrap"
              value={customOptionB}
              onChange={(e) => setCustomOptionB(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-[#4b41e1]"
            />
          </div>
          <button
            type="submit"
            disabled={isComparing}
            className="w-full py-2.5 text-xs font-bold text-white bg-[#4b41e1] rounded-xl hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50"
          >
            {isComparing ? "Analyzing Meals with AI..." : "Compare Options"}
          </button>
        </form>
      </details>

      {/* Main Comparison Cards Stack */}
      <div className="space-y-4">
        {/* User Choice Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border-l-4 border-slate-300 dark:border-slate-700">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="font-['Manrope'] font-bold text-[11px] text-slate-500 uppercase tracking-wider block mb-1">
                USER'S CHOICE
              </span>
              <h3 className="font-['Lexend'] font-bold text-lg text-slate-900 dark:text-slate-100">
                {userChoice.title}
              </h3>
            </div>
            <span className="text-[#ba1a1a] font-bold text-lg font-['Lexend']">
              {userChoice.calories}{" "}
              <span className="text-xs font-normal text-slate-500">kcal</span>
            </span>
          </div>

          <div className="w-full aspect-[16/9] rounded-lg overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800">
            <img
              alt={userChoice.title}
              className="w-full h-full object-cover"
              src={userChoice.imageUrl}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-['Manrope'] text-slate-600 dark:text-slate-300">
              <span>Protein {userChoice.macros.protein}g</span>
              <span>Carbs {userChoice.macros.carbs}g</span>
              <span>Fat {userChoice.macros.fat}g</span>
            </div>
            <div className="macro-bar-container">
              <div
                className="macro-protein"
                style={{
                  width: `${(userChoice.macros.protein / (userChoice.macros.protein + userChoice.macros.carbs + userChoice.macros.fat)) * 100}%`,
                }}
              />
              <div
                className="macro-carb"
                style={{
                  width: `${(userChoice.macros.carbs / (userChoice.macros.protein + userChoice.macros.carbs + userChoice.macros.fat)) * 100}%`,
                }}
              />
              <div
                className="macro-fat"
                style={{
                  width: `${(userChoice.macros.fat / (userChoice.macros.protein + userChoice.macros.carbs + userChoice.macros.fat)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Smart Swap Badge & Coach Recommendation Card */}
        <div className="relative pt-2">
          {/* Floating Pill */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 bg-[#4b41e1] px-4 py-1 rounded-full flex items-center gap-2 shadow-lg">
            <span
              className="material-symbols-outlined text-white text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <span className="text-white font-['Manrope'] font-bold text-[10px] tracking-wider uppercase">
              SMART SWAP
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border-2 border-[#4b41e1]/20 bg-gradient-to-br from-white via-white to-indigo-50/40 dark:from-slate-900 dark:to-indigo-950/20">
            <div className="flex justify-between items-start mb-3 pt-2">
              <div>
                <span className="font-['Manrope'] font-bold text-[11px] text-[#4b41e1] uppercase tracking-wider block mb-1">
                  COACH'S RECOMMENDATION
                </span>
                <h3 className="font-['Lexend'] font-bold text-lg text-slate-900 dark:text-slate-100">
                  {coachRecommendation.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[#10b981] font-bold text-lg font-['Lexend']">
                  {coachRecommendation.calories}{" "}
                  <span className="text-xs font-normal text-slate-500">kcal</span>
                </span>
                <div className="text-[10px] text-[#10b981] font-bold tracking-wider">
                  -{coachRecommendation.calorieReductionPercentage}% CALORIES
                </div>
              </div>
            </div>

            <div className="w-full aspect-[16/9] rounded-lg overflow-hidden mb-4 relative bg-slate-100 dark:bg-slate-800">
              <img
                alt={coachRecommendation.title}
                className="w-full h-full object-cover"
                src={coachRecommendation.imageUrl}
              />
              <div className="absolute bottom-2 right-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-[#4b41e1] flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-[12px] text-[#4b41e1]">
                  check_circle
                </span>
                {coachRecommendation.badge}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-['Manrope'] text-slate-600 dark:text-slate-300">
                <span>Protein {coachRecommendation.macros.protein}g</span>
                <span>Carbs {coachRecommendation.macros.carbs}g</span>
                <span>Fat {coachRecommendation.macros.fat}g</span>
              </div>
              <div className="macro-bar-container">
                <div
                  className="macro-protein"
                  style={{
                    width: `${(coachRecommendation.macros.protein / (coachRecommendation.macros.protein + coachRecommendation.macros.carbs + coachRecommendation.macros.fat)) * 100}%`,
                  }}
                />
                <div
                  className="macro-carb"
                  style={{
                    width: `${(coachRecommendation.macros.carbs / (coachRecommendation.macros.protein + coachRecommendation.macros.carbs + coachRecommendation.macros.fat)) * 100}%`,
                  }}
                />
                <div
                  className="macro-fat"
                  style={{
                    width: `${(coachRecommendation.macros.fat / (coachRecommendation.macros.protein + coachRecommendation.macros.carbs + coachRecommendation.macros.fat)) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-4 p-3 bg-[#4b41e1]/5 dark:bg-[#4b41e1]/10 rounded-lg">
              <p className="text-xs text-[#4b41e1] font-medium flex gap-2 items-start leading-relaxed">
                <span className="material-symbols-outlined text-sm flex-shrink-0 mt-0.5">
                  lightbulb
                </span>
                <span>{coachRecommendation.tip}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Choice Action Buttons */}
      <div className="pt-5 space-y-2">
        <button
          onClick={() =>
            onChooseMeal(
              coachRecommendation.title,
              coachRecommendation.calories,
              coachRecommendation.macros.protein,
              coachRecommendation.macros.carbs,
              coachRecommendation.macros.fat
            )
          }
          className="w-full h-[48px] bg-[#10b981] hover:bg-emerald-600 text-white font-['Lexend'] font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all cursor-pointer"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            thumb_up
          </span>
          Choose Better
        </button>

        <button
          onClick={() =>
            onChooseMeal(
              userChoice.title,
              userChoice.calories,
              userChoice.macros.protein,
              userChoice.macros.carbs,
              userChoice.macros.fat
            )
          }
          className="w-full h-[48px] text-slate-400 dark:text-slate-500 font-['Manrope'] font-medium rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          I'll stick with my choice
        </button>
      </div>

      {/* Why This Recommendation */}
      <div className="mt-8 mb-4">
        <h4 className="font-['Manrope'] font-bold text-xs text-slate-500 uppercase tracking-wider mb-3">
          WHY THIS RECOMMENDATION?
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-100/80 dark:bg-slate-800/80 p-3 rounded-lg flex items-center gap-3">
            <div className="w-8 h-8 bg-[#ffddb8] rounded-full flex items-center justify-center text-[#855300]">
              <span className="material-symbols-outlined text-sm">timer</span>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                DIGESTION
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {whyRecommendation.digestion}
              </div>
            </div>
          </div>

          <div className="bg-slate-100/80 dark:bg-slate-800/80 p-3 rounded-lg flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-950 rounded-full flex items-center justify-center text-[#006c49] dark:text-emerald-400">
              <span className="material-symbols-outlined text-sm">
                energy_savings_leaf
              </span>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                SATIETY
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {whyRecommendation.satiety}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Drawer */}
      {showChat && (
        <div className="mt-6 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-lg border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
            <h4 className="font-['Lexend'] font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4b41e1] text-base">
                auto_awesome
              </span>
              NutriCoach Chat Assistant
            </h4>
            <button
              onClick={() => setShowChat(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          <div className="max-h-52 overflow-y-auto space-y-2 p-1 text-xs">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-2.5 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-[#10b981] text-white rounded-br-none"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isSendingMsg && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl text-slate-400 italic">
                  NutriCoach is thinking...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              placeholder="Ask about calories, substitutes, macros..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-[#10b981]"
            />
            <button
              type="submit"
              disabled={isSendingMsg}
              className="px-3 py-2 text-xs font-bold text-white bg-[#10b981] rounded-xl hover:bg-emerald-600 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </main>
  );
};
