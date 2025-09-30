#!/usr/bin/env node
import { Command } from 'commander';
import jokeCommand from './jokes/cli';
import memeCommand from '../../memes/cli';

const program = new Command();
// Configure the CLI program
program
  .name('joke-js-cli')
  .description('CLI to fetch random jokes')
  .version('1.0.0');

// Register jokes commands 
program.addCommand(jokeCommand);

// Register memes commands
program.addCommand(memeCommand);

program.parse(process.argv);