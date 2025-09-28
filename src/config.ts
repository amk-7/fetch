import dotenv from "dotenv";

dotenv.config();

const env = process.env;

export default {
    GEMINI_API_KEY: env.GEMINI_API_KEY || '',
    GPT_API_KEY: env.GPT_API_KEY || '',
    DEEPSEEK_API_KEY: env.DEEPSEEK_API_KEY || '',
};