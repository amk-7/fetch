import path from "node:path";
import AIProvider from "../../services/ai/provider";
import { Action } from "../action";
import Meme from "./meme";
import { checkConnection } from "../../utils/internet.utils";
import GeminiProvider from "../../services/ai/gemini";
import logger from "../../utils/logger";
import { MemeOptions } from "./options";


export default class MemeAction implements Action<Meme, MemeOptions> {
    private ai: AIProvider | null = null;
    private static localMemesFilePath: string = path.join(__dirname, "default.json");
    private static instance: MemeAction | null = null;

    static getAction() {
        if (MemeAction.instance==null){
            MemeAction.instance = new MemeAction();
        }
        return MemeAction.instance;
    }

    static async getLocalMeme(): Promise<Meme> {
        return new Meme(1, "Titre par défaut", "http://example.com/meme.jpg", {});
        // let yield_content = (await this.MemesGen.next());
        // if (yield_content.done){
        //     this.MemesGen = MemesGenerator(this.localMemesFilePath);
        //     yield_content = (await this.MemesGen.next());
        // }
        // return yield_content.value as Meme;
    }

    private getAI(): AIProvider {
        if(!this.ai){
            this.ai = GeminiProvider.getProvider();
        } return this.ai;
    }

    async generate(options: MemeOptions): Promise<Meme> {
        try {
            logger.debug("Vérification connexion...");
            const online = await checkConnection();
            if (!online) {
                logger.warn("Pas de connexion Internet. Utilisation du fallback local.");
                throw new Error("No internet connection.");
            }
            logger.info("Connexion OK, génération via IA");
            const prompt: string = Meme.getJsonPrompt(options);
            const MemeData: string = await this.getAI().textToText(prompt); 
            return Meme.fromJSON(JSON.parse(MemeData));
        } catch (error) {
            logger.error(error);
            throw new Error("Meme generation failed.");
            //return getRandomMeme(MemeAction.localMemesFilePath);
        }
    }

    async generateMediaAndJson(options: MemeOptions): Promise<Meme> {
        try {
            logger.debug("Vérification connexion...");
            const online = await checkConnection();
            if (!online) {
                logger.warn("Pas de connexion Internet. Utilisation du fallback local.");
                throw new Error("No internet connection.");
            }
            logger.info("Connexion OK, génération media via IA");
            const prompt: string = Meme.getMixedPrompt(options);
            const MemeData: void = await this.getAI().textToTextAndImage(prompt); 
            return Meme.fromJSON({id: 1, title: "Titre par défaut", imageUrl: "", options: options});
        } catch (error) {
            logger.error(error);
            throw new Error("Meme media generation failed.");
            //return getRandomMeme(MemeAction.localMemesFilePath);
        }
    }
}
