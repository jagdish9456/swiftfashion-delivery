import OpenAI from "openai";
import products from "../data/products.json";

const openai = new OpenAI({
  apiKey: "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", // Replace this with your API key
  dangerouslyAllowBrowser: true // Added this option to allow browser usage
});

export const generateProductRecommendations = async (userInput: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a shopping assistant. Analyze the user's input and return a JSON array of product IDs that match their requirements from our product catalog. Consider factors like type, color, size, season, and price range.`
        },
        {
          role: "user",
          content: userInput
        }
      ]
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) return [];

    try {
      const recommendedIds = JSON.parse(response);
      return products.products.filter(product => 
        recommendedIds.includes(product.id)
      );
    } catch (e) {
      console.error("Failed to parse OpenAI response:", e);
      return [];
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return [];
  }
};
