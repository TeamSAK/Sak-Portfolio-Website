import { GoogleGenAI, Chat, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Define custom error class for better error handling
export class GeminiError extends Error {
  constructor(message: string, public code: 'MISSING_API_KEY' | 'INVALID_API_KEY' | 'RATE_LIMIT' | 'CONNECTION_ERROR' | 'SERVER_ERROR' | 'UNKNOWN') {
    super(message);
    this.name = 'GeminiError';
  }
}

// Safely access env var, defaulting to empty string if process is undefined (browser env)
// Wrapped in try-catch to prevent "Uncaught ReferenceError" in strict browser environments
const getApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      return process.env.API_KEY || '';
    }
  } catch (e) {
    // Silently fail if process access is blocked
    return '';
  }
  return '';
};

const apiKey = getApiKey();

let client: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

const getClient = () => {
  if (!client && apiKey) {
    try {
        client = new GoogleGenAI({ apiKey });
    } catch (e) {
        console.error("Failed to initialize Gemini client", e);
    }
  }
  return client;
};

export const initializeChat = async (): Promise<void> => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Chat functionality will not work.");
    return;
  }

  try {
    const ai = getClient();
    if (ai) {
        chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            maxOutputTokens: 500,
        },
        });
    }
  } catch (error) {
    console.error("Failed to initialize chat session:", error);
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!apiKey) {
    throw new GeminiError("API Key is missing", 'MISSING_API_KEY');
  }
  
  if (!chatSession) {
    await initializeChat();
  }

  if (!chatSession) {
    throw new GeminiError("Failed to initialize chat session", 'CONNECTION_ERROR');
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "I didn't get a response. Please try again.";
  } catch (error: any) {
    console.error("Error sending message to Gemini:", error);
    
    const status = error.status || error.response?.status;
    const msg = error.message?.toLowerCase() || '';

    // Check for specific API errors
    if (status === 401 || msg.includes('api key') || msg.includes('unauthenticated')) {
        throw new GeminiError("Invalid API Key", 'INVALID_API_KEY');
    }
    
    if (status === 429 || msg.includes('429') || msg.includes('quota') || msg.includes('exhausted')) {
        throw new GeminiError("Rate limit exceeded", 'RATE_LIMIT');
    }

    if (status >= 500) {
        throw new GeminiError("Gemini Server Error", 'SERVER_ERROR');
    }

    if (msg.includes('fetch failed') || msg.includes('network') || msg.includes('connection')) {
        throw new GeminiError("Network connection error", 'CONNECTION_ERROR');
    }
    
    // Retry logic for transient errors
    try {
        console.log("Attempting retry...");
        await initializeChat();
        if(chatSession) {
            const retryResponse = await chatSession.sendMessage({ message });
            return retryResponse.text || "I didn't get a response.";
        }
    } catch (retryError: any) {
         console.error("Retry failed", retryError);
         // If retry fails, check if it was a specific error again
         if (retryError.status === 429 || retryError.message?.includes('429')) {
             throw new GeminiError("Rate limit exceeded", 'RATE_LIMIT');
         }
    }
    
    throw new GeminiError("Unknown error occurred", 'UNKNOWN');
  }
};

// Interface for the structured response
export interface ProjectIdea {
  title: string;
  tagline: string;
  description: string;
  features: string[];
  techStack: string[];
  monetization: string;
}

export const generateProjectIdea = async (industry: string): Promise<ProjectIdea | null> => {
  if (!apiKey) {
    console.warn("API Key missing");
    return null;
  }

  const ai = getClient();
  if (!ai) return null;

  try {
    const prompt = `Generate a unique, profitable, and modern SaaS web application idea for the "${industry}" industry. 
    Focus on solving a specific pain point. Suggest a modern tech stack (React/Next.js based).`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A catchy startup name" },
            tagline: { type: Type.STRING, description: "A short, punchy value prop" },
            description: { type: Type.STRING, description: "2 sentence pitch of the problem and solution" },
            features: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3 key features" 
            },
            techStack: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "4 technologies to use" 
            },
            monetization: { type: Type.STRING, description: "How it makes money" }
          },
          required: ["title", "tagline", "description", "features", "techStack", "monetization"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as ProjectIdea;
    }
    return null;

  } catch (error) {
    console.error("Error generating idea:", error);
    return null;
  }
};
