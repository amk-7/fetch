import fs from "node:fs";
import { removeJsonAnotaionOnString } from "../../utils/string.utils";
import AIProvider from "./provider";
import { GoogleGenAI } from "@google/genai";
import mime from "mime";
import config from "../../config";


export default class GPTProvider implements AIProvider {
    private gpt: GoogleGenAI | null= null;

    private static instance: GPTProvider | null = null;

    constructor() {
        this.gpt = new GoogleGenAI({
            apiKey: config.GPT_API_KEY || "",
        });
    }

    static getProvider(): GPTProvider {
        if (GPTProvider.instance == null) {
            GPTProvider.instance = new GPTProvider();
        }
        return GPTProvider.instance;
    }

    async textToText(prompt: string): Promise<string> {  
        throw new Error("Method not implemented.");
    }

    async textToTextAndImage(prompt: string): Promise<void> {
        
    }
}

