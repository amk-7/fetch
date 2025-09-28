
export default interface AIProvider {
    textToText(prompt: string): Promise<string>;
    textToImage?(prompt: string): Promise<void | Buffer | string>;
    textToTextAndImage(prompt: string): Promise<void>;
    imageToImage?(imageUrl: string, prompt: string): Promise<string>;
    audioToText?(audioUrl: string): Promise<string>;
    textToSpeech?(text: string): Promise<string>;
    translate?(text: string, targetLanguage: string): Promise<string>;
    summarize?(text: string): Promise<string>;
    classify?(text: string, categories: string[]): Promise<string>;
    chat?(messages: { role: 'user' | 'assistant' | 'system'; content: string }[]): Promise<string>;
}