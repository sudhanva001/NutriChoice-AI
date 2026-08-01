import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Helper to instantiate Gemini client
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Compare two meal options
app.post("/api/compare-meals", async (req, res) => {
  try {
    const { optionA, optionB } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Return structured fallback response if key is missing
      return res.json({
        userChoice: {
          title: optionA || "Double Bacon Cheeseburger",
          calories: 840,
          protein: 32,
          carbs: 48,
          fat: 54,
          imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCp88HXpClyLP9Oecuq8u0LQYXmxxoyppcQOf_2CNsQDuG2LcE4r8qm82rt-IHSqPuGGsL6nyGuW6_ub8_3UE7xdV2j8ayZ0s6mBIpGQTA9wG5pvlgFSa9HCKIlpoaMRh8ZKvQoNN4Vz1JiKsB4khFxh1nj5sJ3sxrcyQlZB4ukL8GyOHDvPNMcoOh6qp9eJbO1UT6xQ5MjID7nPGFu2IT5yieeIGFMPSeEaTqucPhPrZqcHBwyOxs5PLOWyrcsCYBAEmQe2F3uPB4A"
        },
        coachRecommendation: {
          title: optionB || "Grilled Chicken Avocado Club",
          calories: 420,
          calorieReductionPercentage: 50,
          protein: 38,
          carbs: 32,
          fat: 16,
          badge: "HIGH PROTEIN",
          tip: "Save 420 calories while getting 6g more protein. This choice fits perfectly into your weight goal.",
          imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxebWF4OS7iP9kZH62_Ll7nucdN_4m8_f1TOg69mSTG0was2zku-6clEdM57L_0afng45eflCD6B7HFzjhNBl2gA7HIhmxu6E0VJoUD9t_5wjpabY5dOfA_BHNeiAP6qdMUiVrThFSGF9ugdZEgeSO5VW-QYz8XWfkMyYoOlWeRbILc0VpsyZaoOgXFlgRQZoKBq0EffcMLomSivYCVEqOvBhQuIniaQjv--px38cYaqHzE3KOBrKV6GUAykg1JSGuxVXuoK2v-T_H"
        },
        whyRecommendation: {
          digestion: "Medium",
          satiety: "High"
        }
      });
    }

    const prompt = `Compare these two meal choices for a nutrition decision assistant:
Option A (User Choice): "${optionA}"
Option B (Healthier Recommendation): "${optionB}"

Analyze their nutritional profiles and return a JSON object with:
- userChoice: { title, calories, protein (g), carbs (g), fat (g) }
- coachRecommendation: { title, calories, calorieReductionPercentage (number, e.g. 50), protein (g), carbs (g), fat (g), badge (e.g. "HIGH PROTEIN" or "LOWER FAT"), tip (short motivational summary) }
- whyRecommendation: { digestion ("Easy" | "Medium" | "Slow"), satiety ("Low" | "Medium" | "High") }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            userChoice: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                calories: { type: Type.NUMBER },
                protein: { type: Type.NUMBER },
                carbs: { type: Type.NUMBER },
                fat: { type: Type.NUMBER },
              },
              required: ["title", "calories", "protein", "carbs", "fat"],
            },
            coachRecommendation: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                calories: { type: Type.NUMBER },
                calorieReductionPercentage: { type: Type.NUMBER },
                protein: { type: Type.NUMBER },
                carbs: { type: Type.NUMBER },
                fat: { type: Type.NUMBER },
                badge: { type: Type.STRING },
                tip: { type: Type.STRING },
              },
              required: ["title", "calories", "protein", "carbs", "fat", "tip"],
            },
            whyRecommendation: {
              type: Type.OBJECT,
              properties: {
                digestion: { type: Type.STRING },
                satiety: { type: Type.STRING },
              },
              required: ["digestion", "satiety"],
            },
          },
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Meal comparison error:", error);
    res.status(500).json({ error: error.message || "Failed to compare meals" });
  }
});

// Scan food image or name
app.post("/api/scan-food", async (req, res) => {
  try {
    const { imageBase64, mimeType, foodName } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Fallback preset
      return res.json({
        dishName: foodName || "Butter Chicken",
        calories: 580,
        protein: 32,
        carbs: 18,
        fat: 42,
        smartSwap: {
          title: "Tandoori Grilled Chicken",
          calories: 340,
          savedCalories: 240,
          tags: ["LOWER FAT", "HIGH PROTEIN"],
          imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZG-uYpWGswelarkeuZFjI64PuK_h5jXZrjmwZAu7On0aQXKQGLrpSTmhDYUYCt4FRxi5Mxo2ZgVFDWQWJJo1UIOIl9tv2TB0JQZKthRrGRZSlMJ3JkYe5-WVD7gZ5tzzdTW2i4toBsXAuX-AP3qc3rjSbX_G-pMjECU6rine7Chwn4EuGlg3e6w5xwUT1SjBi5k_eZ2T4V-J6r-ypXHvTKjxxvUG3vnebsQeQ5zoIpxAFnPYrf1zlQDBxYhk8G2rRITER4DNxUH9E"
        }
      });
    }

    let contents: any;
    if (imageBase64) {
      contents = {
        parts: [
          {
            inlineData: {
              data: imageBase64,
              mimeType: mimeType || "image/jpeg",
            },
          },
          {
            text: "Analyze this food image. Identify the dish name, estimate calories, protein (g), carbs (g), fat (g), and propose a healthier smart swap alternative dish with its calories, saved calories, and 2 highlight tags.",
          },
        ],
      };
    } else {
      contents = `Analyze this dish: "${foodName || "Butter Chicken"}". Provide its dish name, estimated calories, protein (g), carbs (g), fat (g), and propose a healthier smart swap alternative with its calories, saved calories, and 2 highlight tags.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            dishName: { type: Type.STRING },
            calories: { type: Type.NUMBER },
            protein: { type: Type.NUMBER },
            carbs: { type: Type.NUMBER },
            fat: { type: Type.NUMBER },
            smartSwap: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                calories: { type: Type.NUMBER },
                savedCalories: { type: Type.NUMBER },
                tags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ["title", "calories", "savedCalories", "tags"],
            },
          },
          required: ["dishName", "calories", "protein", "carbs", "fat", "smartSwap"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Food scan error:", error);
    res.status(500).json({ error: error.message || "Failed to scan food" });
  }
});

// Chat assistant endpoint
app.post("/api/ai-chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        reply: `Here is a quick advice for "${message}": For balanced energy, aim for a plate with 40% clean protein, 35% complex carbs, and 25% healthy fats. Try swapping fried items for grilled or baked alternatives!`,
      });
    }

    const chat = ai.chats.create({
      model: "gemini-3.6-flash",
      config: {
        systemInstruction:
          "You are NutriCoach, an empathetic, expert AI nutrition coach. You help users make smart meal decisions, recommend healthier swaps, calculate macros, and build positive eating habits. Keep answers concise, actionable, and encouraging.",
      },
    });

    const result = await chat.sendMessage({ message });
    res.json({ reply: result.text });
  } catch (error: any) {
    console.error("Chat error:", error);
    res.status(500).json({ error: error.message || "Chat service error" });
  }
});

// Start server with Vite middleware integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NutriCoach server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
