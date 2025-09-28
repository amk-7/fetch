import { readFile } from "node:fs/promises";
import Joke from "./meme";

async function loadLocalJoke(file_path: string){
    try {
        const jokeStringData = await readFile(file_path, 'utf-8');
        const data = JSON.parse(jokeStringData);
        return data;
    } catch (error) {
        throw error;
    }
}

async function* jokesGenerator(file_path: string){
    try {
        const jokes = await loadLocalJoke(file_path);
        for (let i = 0; i < jokes.length; i++) {
            yield Joke.fromJSON(jokes[i]);
        }
    } catch (error) {
        throw error;
    }
}

async function getRandomJoke(file_path: string): Promise<Joke>{
    try {
        const jokes = await loadLocalJoke(file_path);
        const randomIndex = Math.floor(Math.random() * jokes.length);
        return Joke.fromJSON(jokes[randomIndex]);
    } catch (error) {
        throw error;
    }
}

export {
    jokesGenerator,
    getRandomJoke
}
