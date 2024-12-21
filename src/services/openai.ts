import { Configuration, OpenAIApi } from "openai";
import products from "../data/products.json";

const configuration = new Configuration({
  apiKey: "YOUR_OPENAI_API_KEY_HERE", // Replace this with your API key
});

const openai = new OpenAIApi(configuration);

export const generateProductRecommendations = async (userInput: string) => {
  try {
    const completion = await openai.createChatCompletion({
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

    const response = completion.data.choices[0]?.message?.content;
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