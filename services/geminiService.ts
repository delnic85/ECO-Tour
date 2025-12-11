import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const askGemini = async (question: string): Promise<string> => {
  try {
    const ai = getClient();
    const model = 'gemini-2.5-flash';
    
    const systemInstruction = `
      You are an expert local guide for the "ECO-Tour San Severo" app, created for an Erasmus project.
      Your goal is to promote sustainable tourism in San Severo (Foggia, Puglia) and the Gargano area.
      
      Knowledge Base:
      - Focus on San Severo history, culture, and nature.
      - Emphasize "Slow Tourism", walking, biking, and local products (Olive Oil, Wine, Stone).
      - Explain the "Green Rules" (recycling, respecting heritage).
      - If asked about "ECOEDU", explain it is the Erasmus project fostering sustainable economy through education.
      
      Tone: Friendly, educational, encouraging, and brief (under 150 words).
      Always mention an "Eco-Tip" related to the answer.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: question,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I'm sorry, I couldn't find an eco-friendly answer for that right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the sustainable knowledge base. Please try again later.";
  }
};
