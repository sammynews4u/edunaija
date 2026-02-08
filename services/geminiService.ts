
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getCache = (key: string) => {
  const data = localStorage.getItem(`edunaija_v4_cache_${key}`);
  if (!data) return null;
  const parsed = JSON.parse(data);
  if (Date.now() - parsed.timestamp > 7 * 24 * 60 * 60 * 1000) {
    localStorage.removeItem(`edunaija_v4_cache_${key}`);
    return null;
  }
  return parsed.value;
};

const setCache = (key: string, value: any) => {
  localStorage.setItem(`edunaija_v4_cache_${key}`, JSON.stringify({
    value,
    timestamp: Date.now()
  }));
};

/**
 * MILLION-NODE SYLLABUS GATEWAY
 * Fetches real-time board data using Google Search Grounding to verify 2025 syllabus accuracy.
 */
export const getSyllabusContent = async (
  subject: string, 
  nodeId: string, 
  onChunk: (text: string, sources: any[]) => void
) => {
  const cacheKey = `syllabus_node_${subject}_${nodeId}`.replace(/\s+/g, '_');
  const cached = getCache(cacheKey);
  
  if (cached) {
    onChunk(cached.text, cached.sources);
    return cached;
  }

  // We use gemini-3-flash-preview with googleSearch for real-time board data
  const responseStream = await ai.models.generateContentStream({
    model: 'gemini-3-flash-preview',
    contents: `ACT AS THE OFFICIAL NIGERIAN SCHOLASTIC CLOUD.
    Fetch and synthesize the 2025 board requirements for Subject: ${subject}, Topic ID: ${nodeId}.
    1. SEARCH for the latest WAEC/JAMB/NECO syllabus updates for 2025.
    2. Write an EXHAUSTIVE, DETAILED textbook chapter based on these findings.
    3. Include worked examples, Nigerian context, and board-specific focus areas.
    Use LaTeX ($...$) for math. Use Markdown for layout.`,
    config: {
      tools: [{ googleSearch: {} }],
      temperature: 0.2, // Low temperature for high accuracy
    }
  });

  let fullText = "";
  let sources: any[] = [];

  for await (const chunk of responseStream) {
    const text = chunk.text;
    if (text) {
      fullText += text;
      // Extract grounding sources if available in the final chunk
      const currentSources = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      if (currentSources.length > 0) sources = currentSources;
      
      onChunk(fullText, sources);
    }
  }

  setCache(cacheKey, { text: fullText, sources });
  return { text: fullText, sources };
};

/**
 * NODE COORDINATE EXPLORER
 * Dynamically generates "Unit Nodes" in a 1,000,000 unit space.
 */
export const getSubNodes = async (subject: string, parentNode: string) => {
  const cacheKey = `subnodes_${subject}_${parentNode}`.replace(/\s+/g, '_');
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 15 granular curriculum sub-nodes for ${subject} under the parent unit "${parentNode}". 
    Format as: {"nodes": [{"id": "CODE-001", "name": "Topic Name", "desc": "Brief overview"}]}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          nodes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                desc: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });

  const result = JSON.parse(response.text || '{"nodes": []}');
  setCache(cacheKey, result);
  return result;
};

export const fetchBoardStandardQuestions = async (subject: string, board: string, year: number | string, count: number = 20, seed: number = 0) => {
  const cacheKey = `questions_v17_${subject}_${board}_${year}_s${seed}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate ${count} JAMB/WAEC standard questions for ${subject} (${board} syllabus). 
    Use real 2025 difficulty levels. Include detailed explanations.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            prompt: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.INTEGER },
            explanation: { type: Type.STRING },
            topic: { type: Type.STRING }
          },
          required: ["prompt", "options", "correctAnswer", "explanation"]
        }
      }
    }
  });
  
  const result = JSON.parse(response.text || '[]');
  setCache(cacheKey, result);
  return result;
};

export const getAIExplanation = async (question: string, options: string[], correctAnswer: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Explain clearly why "${correctAnswer}" is the correct answer to: "${question}". Use simple language.`,
  });
  return response.text;
};
