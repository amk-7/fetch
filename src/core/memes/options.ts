
export interface MemeOptions {
  mood?: "normal" | "geek" | "political" | "animal" | "funny" | "sarcastic" | "dark" | "wholesome"; 
  format?: "jpg" | "png" | "gif" | "webp";  
  style?: "classic" | "modern" | "cartoon" | "realistic"; 
  topText?: string;             
  bottomText?: string;          
  language?: "fr" | "en";       
  nsfw?: boolean;               
  customImageUrl?: string;     
  characters?: string[];        // Personnages/objets dans le meme : ["will-smith", "cat", "elon-musk"]
}
