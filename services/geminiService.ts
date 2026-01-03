import { GoogleGenAI } from "@google/genai";
import { CapyState } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateCapybaraThought = async (
  state: CapyState, 
  stats: { hunger: number; chill: number }
): Promise<string> => {
  if (!apiKey) {
    return "Preciso de uma chave API para ter pensamentos profundos... (Verifique a configuração)";
  }

  const modelId = 'gemini-3-flash-preview';
  
  const prompt = `
    Você é uma Capivara Brasileira. Você é o animal mais tranquilo da terra.
    Estado Atual: ${state}
    Nível de Fome: ${stats.hunger}% (Baixo é faminto)
    Nível de Calma: ${stats.chill}% (Alto é zen)

    Gere um pensamento muito curto, engraçado ou filosófico (máx 15 palavras) em PORTUGUÊS que reflita sua situação atual.
    Exemplos:
    - "A água está fria, mas meu coração está quentinho."
    - "Comer a laranja é se tornar a laranja."
    - "Se mover é superestimado. A quietude é a chave."
    - "Preciso de mais crocância."
    - "A vida é apenas um grande rio."
    
    Apenas o texto do pensamento.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating thought:", error);
    return "Minha mente está vazia como um lago calmo.";
  }
};