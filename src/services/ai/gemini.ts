import fs from "node:fs";
import { removeJsonAnotaionOnString } from "../../utils/string.utils";
import AIProvider from "./provider";
import { GoogleGenAI } from "@google/genai";
import mime from "mime";
import config from "../../config";


export default class GeminiProvider implements AIProvider {
    private gemini: GoogleGenAI | null= null;

    private static instance: GeminiProvider | null = null;

    constructor() {
        this.gemini = new GoogleGenAI({
            apiKey: config.GEMINI_API_KEY || "",
        });
    }

    static getProvider(): GeminiProvider {
        if (GeminiProvider.instance == null) {
            GeminiProvider.instance = new GeminiProvider();
        }
        return GeminiProvider.instance;
    }

    async textToText(prompt: string): Promise<string> {  
        if (!this.gemini) {
            throw new Error("Gemini client is not initialized.");
        }
        const response = await this.gemini.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });        
        return removeJsonAnotaionOnString(response.text);
    }

    private saveBinaryFile(fileName: string, content: Buffer) {
        fs.writeFile(fileName, content, (err) => {
            if (err) {
                console.error(`❌ Error writing file ${fileName}:`, err);
                return;
            }
            console.log(`✅ File ${fileName} saved to file system.`);
        });
    }

    async textToTextAndImage(prompt: string): Promise<void> {
        if (!this.gemini) {
            throw new Error("Gemini client is not initialized.");
        }

        const response = await this.gemini.models.generateContentStream({
            model: "gemini-2.5-flash", // modèle streaming (texte + image) gemini-2.5-flash-image-preview
            config: {
                responseModalities: ["TEXT"],
            },
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }],
                },
            ],
        });

        let fileIndex = 0;

        for await (const chunk of response) {
            if (!chunk.candidates?.[0]?.content?.parts) {
                continue;
            }

            const parts = chunk.candidates[0].content.parts;

            for (const part of parts) {
                if (part.text) {
                    console.log("📝 Texte généré:", part.text);
                } else if (part.inlineData) {
                    const fileName = `gemini-image-${fileIndex++}`;
                    const fileExtension = mime.getExtension(part.inlineData.mimeType || "") || "png";
                    const buffer = Buffer.from(part.inlineData.data || "", "base64");

                    this.saveBinaryFile(`${fileName}.${fileExtension}`, buffer);
                }
            }
        }
        return;
    }
}

