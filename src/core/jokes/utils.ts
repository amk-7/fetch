import { readFile } from "node:fs/promises";
import Joke from "./joke";
import { writeFile } from "node:fs/promises";

async function loadLocalJoke(file_path: string): Promise<Joke[]> {
    try {
        const jokeStringData = await readFile(file_path, 'utf-8');
        const data = JSON.parse(jokeStringData);
        return data;
    } catch (error) {
        return [new Joke("Pourquoi les développeurs n'aiment-ils pas la nature?", "Parce qu'il y a trop de bugs.", {})];
    }
}

async function saveJoke(file_path: string, joke: Joke | Joke[]): Promise<void> {
    try {
        const data = await loadLocalJoke(file_path);
        if (Array.isArray(joke)) {
            data.push(...joke.map(j => j.toJSON()));
        } else {
            data.push(joke.toJSON());
        }
        await writeFile(file_path, JSON.stringify(data, null, 2), 'utf-8');
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
    getRandomJoke,
    saveJoke,
}
