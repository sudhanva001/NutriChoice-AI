import { ComparisonData, ScanResult, IndianSwapItem, HealthierSwapCard, GroceryItem, UserStats } from "../types";

export const DEFAULT_USER_STATS: UserStats = {
  dailyCalorieGoal: 2000,
  currentCalories: 1420,
  macroGoal: { protein: 120, carbs: 200, fat: 65 },
  currentMacros: { protein: 95, carbs: 140, fat: 45 },
  habitScore: 84,
  streakDays: 14,
  loggedDaysCount: 6,
};

export const INITIAL_COMPARISON: ComparisonData = {
  userChoice: {
    title: "Double Bacon Cheeseburger",
    calories: 840,
    macros: { protein: 32, carbs: 48, fat: 54 },
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCp88HXpClyLP9Oecuq8u0LQYXmxxoyppcQOf_2CNsQDuG2LcE4r8qm82rt-IHSqPuGGsL6nyGuW6_ub8_3UE7xdV2j8ayZ0s6mBIpGQTA9wG5pvlgFSa9HCKIlpoaMRh8ZKvQoNN4Vz1JiKsB4khFxh1nj5sJ3sxrcyQlZB4ukL8GyOHDvPNMcoOh6qp9eJbO1UT6xQ5MjID7nPGFu2IT5yieeIGFMPSeEaTqucPhPrZqcHBwyOxs5PLOWyrcsCYBAEmQe2F3uPB4A",
  },
  coachRecommendation: {
    title: "Grilled Chicken Avocado Club",
    calories: 420,
    calorieReductionPercentage: 50,
    macros: { protein: 38, carbs: 32, fat: 16 },
    badge: "HIGH PROTEIN",
    tip: "Save 420 calories while getting 6g more protein. This choice fits perfectly into your weight goal.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBxebWF4OS7iP9kZH62_Ll7nucdN_4m8_f1TOg69mSTG0was2zku-6clEdM57L_0afng45eflCD6B7HFzjhNBl2gA7HIhmxu6E0VJoUD9t_5wjpabY5dOfA_BHNeiAP6qdMUiVrThFSGF9ugdZEgeSO5VW-QYz8XWfkMyYoOlWeRbILc0VpsyZaoOgXFlgRQZoKBq0EffcMLomSivYCVEqOvBhQuIniaQjv--px38cYaqHzE3KOBrKV6GUAykg1JSGuxVXuoK2v-T_H",
  },
  whyRecommendation: {
    digestion: "Medium",
    satiety: "High",
  },
};

export const INITIAL_SCAN: ScanResult = {
  dishName: "Butter Chicken",
  calories: 580,
  macros: { protein: 32, carbs: 18, fat: 42 },
  imageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAbyZX1TqBsYEMKjWkiWFQcfTj1PCqN2EinZV4lXPizxF9ukJFmzZfLw304wn4hj-gP8UWUjtf5E8wwPVqNKVIPsn9YLKdCtaV2SuBhILe26TMUMKQl1xTR27F52TnB_xHBoV6BCJysaCDgw4xaGo60UDXn8TDbYRcM7e5I6VFDPAOWicGbBDQeJAIus3o7euoHAXj9zWRuXjGKfCQBhZ_-iyAM7PD3xhwmuwoGXOxS3HBvee-LFoeFoMUCvkYo148djpIs0l52IqQu",
  smartSwap: {
    title: "Tandoori Grilled Chicken",
    calories: 340,
    savedCalories: 240,
    tags: ["LOWER FAT", "HIGH PROTEIN"],
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZG-uYpWGswelarkeuZFjI64PuK_h5jXZrjmwZAu7On0aQXKQGLrpSTmhDYUYCt4FRxi5Mxo2ZgVFDWQWJJo1UIOIl9tv2TB0JQZKthRrGRZSlMJ3JkYe5-WVD7gZ5tzzdTW2i4toBsXAuX-AP3qc3rjSbX_G-pMjECU6rine7Chwn4EuGlg3e6w5xwUT1SjBi5k_eZ2T4V-J6r-ypXHvTKjxxvUG3vnebsQeQ5zoIpxAFnPYrf1zlQDBxYhk8G2rRITER4DNxUH9E",
  },
};

export const INDIAN_SWAPS: IndianSwapItem[] = [
  {
    id: "swap-1",
    title: "Paneer Tikka",
    insteadOf: "Butter Paneer",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCb-UGkV5U0m0cBV55JFByguhDOr1SgLPwTMmHpLcZ_Auj5cwauFbWXsELnJLYokq29pMNKsMLv2tucqEOo2YTr4uCm31f-WtdHHbESLOj9cldcs619Q2Q2Lo9ar1K6kY56rkMkDPIQI_wMJyttAwgEuEiq_AdZwMuK50rO9srzZ1mlyl2dnshUzl4J3N1h-aXanslF-zb97lDtTKyUcAquKCf0Y1ONqjn5VOEoz-cGu4YLvW6Dxj03ZBxPkbj-fHY4GvuzJRcWY3ds",
    benefitTag: "180 kcal less",
    benefitType: "calories_less",
    savedAmount: "180 kcal",
  },
  {
    id: "swap-2",
    title: "Moong Dal Chilla",
    insteadOf: "Plain Dosa",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBv20_wLsgVuIxuCV2Vy3zIw5bHgTj-X-LTc11LQRxdhhpa9KoXIBbpfPJufJF4HcPtr24cAqHsWtbqCzoCxi21c9We1b7eZtShgiqLD-RiUoWXaN5qMwAUIKEfhfptCfZxf58ebybylZ4s2hKJEdI96xPAwsZKGPftueAWtnIYo76VHSYizTv3uKZTGWVEn1e_bm5q1OTKH81VrMIEIC-PNs9ZdxlPVNFlW-fZeZXefr4DETsh2CqCnKO3__iVlAvzecxl1CnFjRsC",
    benefitTag: "+8g Protein",
    benefitType: "protein_more",
    savedAmount: "8g Protein",
  },
  {
    id: "swap-3",
    title: "Brown Rice Pulao",
    insteadOf: "White Rice Biryani",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBbPNJ0SAZOULvePMaTOy-aZRMAd0blSwD9EwoC0EJo2W6Aq11nldBm6uoZS8VwgfFe7oOX5xe7eU68nxk8VEHg3xik8_19qLZ151JPq1KBAtQFxBIEik-bfChThnISHkX7eiALZ_WOM2DATOReGZ1PLysZ8Ix60K5kEFF7-Tfklrksk8eSyxMNXTNGmOjEt7BmNPdnpNMMbidGdo0Lnm7NbleYJnF8bQvYAtnyrhrMJywZR1GXofaC36WzAnHpkgOLLweX4ulDuhVt",
    benefitTag: "Lower Glycemic",
    benefitType: "glycemic_lower",
    savedAmount: "Low GI",
  },
];

export const HEALTHIER_SWAPS_CAROUSEL: HealthierSwapCard[] = [
  {
    id: "hswap-1",
    title: "Swap Chips for Kale Chips",
    description: "Satisfies crunch with 70% fewer calories and high fiber.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9ya7cyZ2fq-YZMR-7ueXnxG2M11yEK_HqiQBe1sPY3MWneqvvaOzPWDWtQQHCdPIAu-Q1FOsh1iyrJXYaANpKM4k_nwvlpuNjNT0JioEPGv9LkKxRYfV423XKd-ogjz5LXTMPB_0KMbo-O2QT6iQQmf0VDrn992oosh-2tK0DB2wdNl1yAOU-_bqaaLwhsJ0rVdO9UPuFawIfpBMJchJCdSvRV55WHzgEftwNgnnFAFFzqCmwQr4AS8C4oUcSC551hBCkW-9w6L4k",
    category: "Snacks",
  },
  {
    id: "hswap-2",
    title: "Greek Yogurt vs. Sour Cream",
    description: "Triple the protein while maintaining the creamy texture you love.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBC2THXmKG_qZb2MKYTD6ZY3Jdd6cSq-v8yTHXpKzWd6yADmzrSOn0qgTBPqjw2zSRAW71QU--F01t8B05vlVo1SJe7p4wUgd_DACYSkC6WGyjKLwDlGsK-9vm3j5TA000YyBxwxFvsENmE6auX29NC0c5BxfgiJjNw0JnpJ5e4pIaqwrvqgJGoK1C9IhiqhrY1eT510718yluPePnULPndJba7i2S7cqKp0qtd8AIXxWOuz3UCMVh51ZaMYfLfRapx-KaOZyOEuIV-",
    category: "Dairy",
  },
  {
    id: "hswap-3",
    title: "Cauliflower Rice vs. White Rice",
    description: "Cuts carbs by 85% with high antioxidants and effortless texture.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBbPNJ0SAZOULvePMaTOy-aZRMAd0blSwD9EwoC0EJo2W6Aq11nldBm6uoZS8VwgfFe7oOX5xe7eU68nxk8VEHg3xik8_19qLZ151JPq1KBAtQFxBIEik-bfChThnISHkX7eiALZ_WOM2DATOReGZ1PLysZ8Ix60K5kEFF7-Tfklrksk8eSyxMNXTNGmOjEt7BmNPdnpNMMbidGdo0Lnm7NbleYJnF8bQvYAtnyrhrMJywZR1GXofaC36WzAnHpkgOLLweX4ulDuhVt",
    category: "Sides",
  },
];

export const INITIAL_GROCERY_ITEMS: GroceryItem[] = [
  { id: "g1", name: "Boneless Chicken Breast (for Grilled Club)", category: "Proteins", quantity: "500g", completed: false, isFromSwap: true },
  { id: "g2", name: "Avocado (ripe)", category: "Fresh Produce", quantity: "2 units", completed: false, isFromSwap: true },
  { id: "g3", name: "Whole Grain Artisan Bread", category: "Fresh Produce", quantity: "1 loaf", completed: true },
  { id: "g4", name: "Paneer Cubes (Low Fat)", category: "Proteins", quantity: "250g", completed: false, isFromSwap: true },
  { id: "g5", name: "Moong Dal (Yellow Split)", category: "Proteins", quantity: "1 kg", completed: false, isFromSwap: true },
  { id: "g6", name: "Plain Greek Yogurt (0% Fat)", category: "Dairy & Alternatives", quantity: "500g", completed: true, isFromSwap: true },
  { id: "g7", name: "Fresh Kale Leaves", category: "Fresh Produce", quantity: "200g", completed: false, isFromSwap: true },
  { id: "g8", name: "Herbal Chamomile Tea", category: "Healthy Snacks", quantity: "1 box", completed: false },
];
