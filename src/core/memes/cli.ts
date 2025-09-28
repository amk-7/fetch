#!/usr/bin/env node
import { Command } from 'commander';
import MemeAction from './memeAction';
import meme from './meme';
import logger from '../../utils/logger';
import { MemeOptions } from './options';
import Meme from './meme';

const memeCommand = new Command('meme');
const memeAction = MemeAction.getAction();

memeCommand
  .option('-m, --mood <type>', 'Mood of the meme (e.g., normal, geek, political)', 'normal')
  .option('-f, --format <type>', 'Image format (e.g., jpg, png, gif, webp)', 'jpg')
  .option('-s, --style <type>', 'Style of the meme (e.g., classic, modern, cartoon, realistic)', 'classic')
  .option('-t, --topText <text>', 'Top text for the meme', '')
  .option('-b, --bottomText <text>', 'Bottom text for the meme', '')
  .option('-l, --language <type>', 'Language of the meme (fr or en)', 'en')
  .option('--nsfw', 'Allow NSFW content', false)
  .option('--customImageUrl <url>', 'Custom base image URL for the meme', '')
  .option('-c, --characters <items>', 'Comma-separated list of characters/objects to include in the meme', (value) => value.split(','), [])
  .description('Generate a random meme')
  .action(async (options) => {
    const meme: meme = await memeAction.generateMediaAndJson(options);
    logger.debug("Success!");
    //logger.debug(`Meme généré :\n${meme.toString()}`);
  });

export default memeCommand;
