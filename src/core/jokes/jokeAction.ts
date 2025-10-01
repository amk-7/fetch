import path from "node:path";
import AIProvider from "../../services/ai/provider";
import { Action } from "../action";
import Joke from "./joke";
import { JokeOptions } from "./options";
import { getRandomJoke, jokesGenerator, saveJoke } from "./utils";
import { checkConnection } from "../../utils/internet.utils";
import GeminiProvider from "../../services/ai/gemini";


export default class JokeAction implements Action<Joke, JokeOptions> {
    private ai: AIProvider | null = null;
    private static localJokesFilePath: string = path.join(__dirname, "data.json");
    private static jokesGen = jokesGenerator(JokeAction.localJokesFilePath);
    private static instance: JokeAction | null = null;

    constructor(geminiAPIKey?: string) {
        if (geminiAPIKey) {
            this.ai = GeminiProvider.getProvider(geminiAPIKey);
        }
    }

    static getAction(geminiAPIKey?: string): JokeAction {
        if (JokeAction.instance==null){
            JokeAction.instance = new JokeAction(geminiAPIKey);
        }
        return JokeAction.instance;
    }

    static async getLocalJoke(): Promise<Joke> {
        let yield_content = (await this.jokesGen.next());
        if (yield_content.done){
            this.jokesGen = jokesGenerator(this.localJokesFilePath);
            yield_content = (await this.jokesGen.next());
        }
        return yield_content.value as Joke;
    }

    async generate(options?: JokeOptions): Promise<Joke> {
        try {
            const online = await checkConnection();
            if (!online || !this.ai) {
                return getRandomJoke(JokeAction.localJokesFilePath);
            }
            const prompt: string = Joke.getPrompt(options);
            const jokeData: string = await this.ai.textToText(prompt); 
            const joke = Joke.fromJSON(JSON.parse(jokeData));
            saveJoke(JokeAction.localJokesFilePath, joke);
            return joke;
        } catch (error) {
            throw error
        }
    }
}


