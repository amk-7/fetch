#!/usr/bin/env node
import { Command } from 'commander';
import JokeAction from './jokeAction';
import Joke from './joke';
import logger from '../../utils/logger';

const jokeCommand = new Command('joke');
const jokeAction = JokeAction.getAction();

jokeCommand
  .option('-t, --theme <type>', 'Theme of the joke (e.g., general, geek)', 'general')
  .description('Fetch a random joke')
  .action(async (options) => {
    const joke: Joke = await jokeAction.generate({ theme: options.theme }); 
    logger.debug(`Blague générée :\n${joke.toString()}`);
  });

export default jokeCommand;
