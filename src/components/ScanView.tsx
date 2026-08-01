import React, { useState, useRef } from "react";
import { ScanResult } from "../types";
import { INITIAL_SCAN } from "../data/mockData";

interface ScanViewProps {
  onLogMeal: (title: string, calories: number, protein: number, carbs: number, fat: number) => void;
}

export const ScanView: React.FC<ScanViewProps> = ({ onLogMeal }) => {
  const [scanResult, setScanResult] = useState<ScanResult>(INITIAL_SCAN);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Preset quick scans for testing
  const presets: { name: string; image: string }[] = [
    {
      name: "Butter Chicken",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAbyZX1TqBsYEMKjWkiWFQcfTj1PCqN2EinZV4lXPizxF9ukJFmzZfLw304wn4hj-gP8UWUjtf5E8wwPVqNKVIPsn9YLKdCtaV2SuBhILe26TMUMKQl1xTR27F52TnB_xHBoV6BCJysaCDgw4xaGo60UDXn8TDbYRcM7e5I6VFDPAOWicGbBDQeJAIus3o7euoHAXj9zWRuXjGKfCQBhZ_-iyAM7PD3xhwmuwoGXOxS3HBvee-LFoeFoMUCvkYo148djpIs0l52IqQu",
    },
    {
      name: "Pepperoni Pizza",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCp88HXpClyLP9Oecuq8u0LQYXmxxoyppcQOf_2CNsQDuG2LcE4r8qm82rt-IHSqPuGGsL6nyGuW6_ub8_3UE7xdV2j8ayZ0s6mBIpGQTA9wG5pvlgFSa9HCKIlpoaMRh8ZKvQoNN4Vz1JiKsB4khFxh1nj5sJ3sxrcyQlZB4ukL8GyOHDvPNMcoOh6qp9eJbO1UT6xQ5MjID7nPGFu2IT5yieeIGFMPSeEaTqucPhPrZqcHBwyOxs5PLOWyrcsCYBAEmQe2F3uPB4A",
    },
    {
      name: "Grilled Salmon Bowl",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCZG-uYpWGswelarkeuZFjI64PuK_h5jXZrjmwZAu7On0aQXKQGLrpSTmhDYUYCt4FRxi5Mxo2ZgVFDWQWJJo1UIOIl9tv2TB0JQZKthRrGRZSlMJ3JkYe5-WVD7gZ5tzzdTW2i4toBsXAuX-AP3qc3rjSbX_G-pMjECU6rine7Chwn4EuGlg3e6w5xwUT1SjBi5k_eZ2T4V-J6r-ypXHvTKjxxvUG3vnebsQeQ5zoIpxAFnPYrf1zlQDBxYhk8G2rRITER4DNxUH9E",
    },
  ];

  const handleRunPreset = async (presetName: string, presetImg: string) => {
    setIsScanning(true);
    try {
      const res = await fetch("/api/scan-food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodName: presetName }),
      });
      const data = await res.json();
      setScanResult({
        dishName: data.dishName || presetName,
        calories: data.calories || 580,
        macros: {
          protein: data.protein || 32,
          carbs: data.carbs || 18,
          fat: data.fat || 42,
        },
        imageUrl: presetImg,
        smartSwap: {
          title: data.smartSwap?.title || "Tandoori Grilled Chicken",
          calories: data.smartSwap?.calories || 340,
          savedCalories: data.smartSwap?.savedCalories || 240,
          tags: data.smartSwap?.tags || ["LOWER FAT", "HIGH PROTEIN"],
          imageUrl:
            data.smartSwap?.imageUrl ||
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCZG-uYpWGswelarkeuZFjI64PuK_h5jXZrjmwZAu7On0aQXKQGLrpSTmhDYUYCt4FRxi5Mxo2ZgVFDWQWJJo1UIOIl9tv2TB0JQZKthRrGRZSlMJ3JkYe5-WVD7gZ5tzzdTW2i4toBsXAuX-AP3qc3rjSbX_G-pMjECU6rine7Chwn4EuGlg3e6w5xwUT1SjBi5k_eZ2T4V-J6r-ypXHvTKjxxvUG3vnebsQeQ5zoIpxAFnPYrf1zlQDBxYhk8G2rRITER4DNxUH9E",
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1];
      const previewUrl = reader.result as string;

      setIsScanning(true);
      try {
        const res = await fetch("/api/scan-food", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageBase64: base64,
            mimeType: file.type,
          }),
        });
        const data = await res.json();

        setScanResult({
          dishName: data.dishName || "Analyzed Meal",
          calories: data.calories || 520,
          macros: {
            protein: data.protein || 28,
            carbs: data.carbs || 35,
            fat: data.fat || 22,
          },
          imageUrl: previewUrl,
          smartSwap: {
            title: data.smartSwap?.title || "High Protein Salad Bowl",
            calories: data.smartSwap?.calories || 320,
            savedCalories: data.smartSwap?.savedCalories || 200,
            tags: data.smartSwap?.tags || ["HIGH FIBER", "CLEAN PROTEIN"],
            imageUrl:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCZG-uYpWGswelarkeuZFjI64PuK_h5jXZrjmwZAu7On0aQXKQGLrpSTmhDYUYCt4FRxi5Mxo2ZgVFDWQWJJo1UIOIl9tv2TB0JQZKthRrGRZSlMJ3JkYe5-WVD7gZ5tzzdTW2i4toBsXAuX-AP3qc3rjSbX_G-pMjECU6rine7Chwn4EuGlg3e6w5xwUT1SjBi5k_eZ2T4V-J6r-ypXHvTKjxxvUG3vnebsQeQ5zoIpxAFnPYrf1zlQDBxYhk8G2rRITER4DNxUH9E",
          },
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsScanning(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="pt-20 px-5 max-w-md mx-auto pb-32">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Preset Picker bar */}
      <div className="mb-4 flex items-center justify-between gap-2 overflow-x-auto pb-1 custom-scroll-hide">
        <span className="text-[11px] font-bold text-slate-400 uppercase flex-shrink-0">
          Sample Scans:
        </span>
        {presets.map((p) => (
          <button
            key={p.name}
            onClick={() => handleRunPreset(p.name, p.image)}
            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-[#10b981] transition-all flex-shrink-0"
          >
            {p.name}
          </button>
        ))}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#10b981] text-white hover:bg-emerald-600 transition-all flex-shrink-0 flex items-center gap-1 shadow-sm"
        >
          <span className="material-symbols-outlined text-xs">add_a_photo</span>
          Upload Photo
        </button>
      </div>

      {/* Scanning View Box */}
      <section className="relative rounded-xl overflow-hidden mb-6 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] bg-white dark:bg-slate-900 aspect-square flex flex-col items-center justify-center">
        <img
          alt={scanResult.dishName}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          src={scanResult.imageUrl}
        />

        {/* Detecting Frame Overlay */}
        <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center">
          <div className="w-64 h-64 border-2 border-[#10B981] rounded-2xl relative shadow-2xl">
            <div className="scan-overlay animate-pulse" />
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[#10B981] rounded-tl-lg" />
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[#10B981] rounded-tr-lg" />
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-[#10B981] rounded-bl-lg" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-[#10B981] rounded-br-lg" />
          </div>

          <div className="mt-6 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
            <span className="w-2.5 h-2.5 bg-[#10B981] rounded-full animate-ping" />
            <span className="text-white font-['Manrope'] font-semibold text-xs">
              {isScanning ? "Analyzing AI Vision..." : "Detecting Dish..."}
            </span>
          </div>
        </div>
      </section>

      {/* Recognition Result Card */}
      <section className="bg-white dark:bg-slate-900 rounded-xl p-4 mb-6 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="font-['Manrope'] font-bold text-[11px] text-slate-400 uppercase tracking-wider block mb-0.5">
              DETECTED DISH
            </span>
            <h2 className="font-['Lexend'] font-bold text-xl text-slate-900 dark:text-slate-100">
              {scanResult.dishName}
            </h2>
          </div>
          <div className="text-right">
            <span className="font-['Lexend'] font-bold text-xl text-slate-900 dark:text-slate-100">
              {scanResult.calories}
            </span>
            <span className="font-['Manrope'] text-xs text-slate-500 ml-1">kcal</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg text-center">
            <p className="font-['Manrope'] font-bold text-[10px] text-slate-400 uppercase">
              Protein
            </p>
            <p className="font-['Lexend'] font-bold text-lg text-[#006c49] dark:text-emerald-400">
              {scanResult.macros.protein}g
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg text-center">
            <p className="font-['Manrope'] font-bold text-[10px] text-slate-400 uppercase">
              Carbs
            </p>
            <p className="font-['Lexend'] font-bold text-lg text-[#e29100]">
              {scanResult.macros.carbs}g
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg text-center">
            <p className="font-['Manrope'] font-bold text-[10px] text-slate-400 uppercase">
              Fat
            </p>
            <p className="font-['Lexend'] font-bold text-lg text-[#ba1a1a]">
              {scanResult.macros.fat}g
            </p>
          </div>
        </div>

        <div className="macro-bar-container">
          <div
            className="macro-protein"
            style={{
              width: `${(scanResult.macros.protein / (scanResult.macros.protein + scanResult.macros.carbs + scanResult.macros.fat)) * 100}%`,
            }}
          />
          <div
            className="macro-carb"
            style={{
              width: `${(scanResult.macros.carbs / (scanResult.macros.protein + scanResult.macros.carbs + scanResult.macros.fat)) * 100}%`,
            }}
          />
          <div
            className="macro-fat"
            style={{
              width: `${(scanResult.macros.fat / (scanResult.macros.protein + scanResult.macros.carbs + scanResult.macros.fat)) * 100}%`,
            }}
          />
        </div>
      </section>

      {/* Smart Swap Suggestion */}
      <section className="bg-[#4b41e1]/5 border-2 border-[#4b41e1] rounded-xl p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] relative overflow-hidden mb-6">
        <div className="absolute -right-4 -top-4 opacity-10 pointer-events-none">
          <span
            className="material-symbols-outlined text-[#4b41e1] text-8xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_awesome
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span
            className="material-symbols-outlined text-[#4b41e1] text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_awesome
          </span>
          <span className="font-['Manrope'] font-bold text-[10px] text-[#4b41e1] uppercase tracking-widest">
            SMART SWAP RECOMMENDED
          </span>
        </div>

        <div className="flex gap-4 items-center">
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
            <img
              alt={scanResult.smartSwap.title}
              className="w-full h-full object-cover"
              src={scanResult.smartSwap.imageUrl}
            />
          </div>

          <div className="flex-grow">
            <h3 className="font-['Lexend'] font-bold text-base text-[#4b41e1] mb-1 leading-tight">
              {scanResult.smartSwap.title}
            </h3>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2 text-xs">
              <span className="font-semibold text-[#10b981]">
                {scanResult.smartSwap.calories} kcal
              </span>
              <span>•</span>
              <span>Save {scanResult.smartSwap.savedCalories} kcal</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {scanResult.smartSwap.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#4b41e1]/10 text-[#4b41e1] px-2 py-0.5 rounded-full text-[9px] font-bold uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() =>
            onLogMeal(
              scanResult.smartSwap.title,
              scanResult.smartSwap.calories,
              35,
              25,
              12
            )
          }
          className="w-full mt-4 bg-[#4b41e1] hover:bg-indigo-700 text-white font-['Lexend'] font-bold py-3 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md cursor-pointer"
        >
          Swap to this Meal
          <span className="material-symbols-outlined text-lg">trending_flat</span>
        </button>
      </section>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleRunPreset("Butter Chicken", presets[0].image)}
          className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-['Lexend'] font-bold py-3 rounded-xl active:scale-95 transition-all hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">refresh</span>
          Retake
        </button>
        <button
          onClick={() =>
            onLogMeal(
              scanResult.dishName,
              scanResult.calories,
              scanResult.macros.protein,
              scanResult.macros.carbs,
              scanResult.macros.fat
            )
          }
          className="flex items-center justify-center gap-2 bg-[#006c49] hover:bg-emerald-800 text-white font-['Lexend'] font-bold py-3 rounded-xl active:scale-95 transition-all shadow-md cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">check</span>
          Log Dish
        </button>
      </div>
    </main>
  );
};
