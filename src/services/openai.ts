import OpenAI from "openai";
import products from "../data/product-all.json";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});

export const generateProductRecommendations = async (userInput: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a shopping assistant helping users find products from our catalog. 
          Analyze the user's input and return product IDs that best match their requirements.
          Consider these product attributes: brand, material, type, color, season, price range, style, and specific attributes like sleeveType and neckType,fit, material type, color. Also check the data in variants key.Also check for the tags and seo data.
          Even if the match isn't perfect, try to return at least 2-3 relevant products.
          The response should be a valid JSON array of strings containing only the product IDs.
          
          Available products: ${JSON.stringify(products.products.map(p => ({
            id: p.id,
            name: p.name,
            description: p.description,
            shortDescription: p.shortDescription,
            brand: p.brand,
            categoryId: p.categoryId,
            subcategoryId: p.subcategoryId,
            attributes: p.attributes,
            price: p.price,
            tags: p.tags
          })))}
          `
        },
        {
          role: "user",
          content: userInput
        }
      ],
      temperature: 0.7,
      max_tokens: 150
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
    throw error;
  }
};