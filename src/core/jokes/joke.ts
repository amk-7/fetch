import { JokeOptions } from "./options";

export default class Joke {
    private setup: string;
    private punchline: string;
    private options: JokeOptions;

    constructor(setup: string, punchline: string, options: JokeOptions) {
        this.setup = setup;
        this.punchline = punchline;
        this.options = options;
    }

    getOptions(): JokeOptions{
        return this.options;
    }

    toString(): string {
        return `${this.setup} - ${this.punchline}`;
    }

    static fromJSON(json: any): Joke {
        return new Joke(json.setup, json.punchline, json.options);
    }

    public toJSON(): any {
        return {
            setup: this.setup,
            punchline: this.punchline,
            options: this.options,
        };
    }

    static getPrompt(options: JokeOptions): string {
        let prompt = "Génère une blague courte et drôle";
        if (options.theme) {
            prompt += ` sur le thème "${options.theme}"`;
        }
        prompt += `. Réponds uniquement en JSON valide avec la structure suivante : 
        {
            "setup": "<texte de la mise en place>",
            "punchline": "<texte de la chute>",
            "options": {
                "theme": "<thème si défini>"
            }
        }`;
        return prompt;
    }
}



// console.log((Joke.prototype as any).__props);



