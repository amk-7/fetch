#!/usr/bin/env node
import { Command } from 'commander';
import JokeAction from './jokeAction';
import Joke from './joke';
import logger from '../../utils/logger';

const jokeCommand = new Command('joke');

jokeCommand
  .option('-t, --theme <type>', 'Theme of the joke (e.g., general, geek)', 'general')
  .option('-k, --key <apiKey>', 'Gemini API key')
  .description('Fetch a random joke')
  .action(async (options) => {
    const apiKey = options.key || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      logger.info('❌ No Gemini API key provided. Please provide it via --key option or GEMINI_API_KEY environment variable.');
    }
    const jokeAction = JokeAction.getAction(apiKey);
    const joke: Joke = await jokeAction.generate({ theme: options.theme }); 
    logger.debug(`Blague générée :\n${joke.toString()}`);
  });

export default jokeCommand;
