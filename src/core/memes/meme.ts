import { MemeOptions } from "./options";

export default class Meme {
  private id: number;
  private title: string;
  private imageUrl: string;
  private options: MemeOptions;

  constructor(id: number, title: string, imageUrl: string, options: MemeOptions) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.options = options;
  }

  getOptions(): MemeOptions {
    return this.options;
  }

  toString(): string {
    return `${this.title} -> ${this.imageUrl}`;
  }

  static fromJSON(json: any): Meme {
    return new Meme(json.id, json.title, json.imageUrl, json.options);
  }

  static toJSON(meme: Meme): any {
    return {
      id: meme.id,
      title: meme.title,
      imageUrl: meme.imageUrl,
      options: meme.options,
    };
  }

  static getPrompt(options: MemeOptions): string {
    let prompt = "Génère un meme drôle";
    if (options.mood) prompt += ` sur le mood (mood: string) "${options.mood}"`;
    if (options.characters?.length) prompt += ` avec  ${options.characters.join(", ")} (characters: string[])`;
    if (options.topText) prompt += ` avec le texte en haut (topText: string) "${options.topText}"`;
    if (options.bottomText) prompt += ` avec le texte en bas (bottomText: string) "${options.bottomText}"`;
    if (options.style) prompt += ` dans le style (style: string) "${options.style}"`;
    if (options.format) prompt += ` au format (format: string) "${options.format}"`;
    if (options.language) prompt += ` en langue (language: string) "${options.language}"`;
    if (options.nsfw !== undefined) prompt += ` et que ce soit ${options.nsfw ? "" : "pas "} NSFW (nsfw: boolean)`;
    if (options.customImageUrl) prompt += ` en utilisant cette image de base (customImageUrl: string) "${options.customImageUrl}"`;
    return prompt;
  }

  static getMediaPrompt(options: MemeOptions): string {
    let prompt = this.getPrompt(options);
    prompt += `. Réponds uniquement par l'URL de l'image générée.`;
    return prompt;
  }

  static getJsonPrompt(options: MemeOptions): string {
    let prompt = this.getPrompt(options);
    prompt += `. Réponds uniquement en JSON valide avec la structure suivante : 
        {
            "id": <number>,
            "title": "<titre du meme>",
            "options": {
                "mood": "<mood si défini>",
                "format": "<format si défini>",
                "style": "<style si défini>",
                "topText": "<topText si défini>",
                "bottomText": "<bottomText si défini>",
                "language": "<language si défini>",
                "nsfw": <nsfw si défini>,
                "customImageUrl": "<customImageUrl si défini>",
                "characters": <characters si défini>
            }
        }`;
    return prompt;
  }

  static getMixedPrompt(options: MemeOptions): string {
    let prompt = this.getPrompt(options);
    prompt += `. Génére moi l'image et donne moi le JSON valide avec la structure suivante correspondant au meme généré : 
        {
            "id": <number>,
            "title": "<titre du meme>",
            "options": {
                "mood": "<mood si défini>",
                "format": "<format si défini>",
                "style": "<style si défini>",
                "topText": "<topText si défini>",
                "bottomText": "<bottomText si défini>",
                "language": "<language si défini>",
                "nsfw": <nsfw si défini>,
                "customImageUrl": "<customImageUrl si défini>",
                "characters": <characters si défini>
            }
        }`;
    return prompt;
  }
}
