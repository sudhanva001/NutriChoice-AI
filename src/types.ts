export type TabType = "home" | "assistant" | "scan" | "habits" | "grocery";

export interface MacroBreakdown {
  protein: number;
  carbs: number;
  fat: number;
}

export interface MealItem {
  id: string;
  title: string;
  calories: number;
  macros: MacroBreakdown;
  imageUrl?: string;
  badge?: string;
  timestamp?: string;
}

export interface ComparisonData {
  userChoice: {
    title: string;
    calories: number;
    macros: MacroBreakdown;
    imageUrl: string;
  };
  coachRecommendation: {
    title: string;
    calories: number;
    calorieReductionPercentage: number;
    macros: MacroBreakdown;
    badge: string;
    tip: string;
    imageUrl: string;
  };
  whyRecommendation: {
    digestion: "Easy" | "Medium" | "Slow";
    satiety: "Low" | "Medium" | "High";
  };
}

export interface ScanResult {
  dishName: string;
  calories: number;
  macros: MacroBreakdown;
  imageUrl: string;
  smartSwap: {
    title: string;
    calories: number;
    savedCalories: number;
    tags: string[];
    imageUrl: string;
  };
}

export interface IndianSwapItem {
  id: string;
  title: string;
  insteadOf: string;
  imageUrl: string;
  benefitTag: string;
  benefitType: "calories_less" | "protein_more" | "glycemic_lower";
  savedAmount: string;
}

export interface HealthierSwapCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface GroceryItem {
  id: string;
  name: string;
  category: "Fresh Produce" | "Proteins" | "Dairy & Alternatives" | "Healthy Snacks";
  quantity: string;
  completed: boolean;
  isFromSwap?: boolean;
}

export interface UserStats {
  dailyCalorieGoal: number;
  currentCalories: number;
  macroGoal: MacroBreakdown;
  currentMacros: MacroBreakdown;
  habitScore: number;
  streakDays: number;
  loggedDaysCount: number;
}
