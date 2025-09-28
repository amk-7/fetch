# Joke & Meme Generator CLI

[![npm version](https://img.shields.io/npm/v/joke-meme-cli)](https://www.npmjs.com/package/joke-meme-cli)

[![Node.js CI](https://github.com/yourusername/joke-meme-cli/actions/workflows/node.js.yml/badge.svg)](https://github.com/yourusername/joke-meme-cli/actions/workflows/node.js.yml)

Un outil CLI et une librairie Node.js pour générer des **blagues et memes** avec intelligence artificielle ou localement.

## Fonctionnalités

- Génération de blagues aléatoires avec thème (`geek`, `fun`, `dark`, etc.)
- Génération de memes personnalisés avec :  
  - Texte en haut/bas
  - Mood (`geek`, `political`, `fun`)
  - Style (`classic`, `modern`, `cartoon`, `realistic`)
  - Format image (`png`, `jpg`, `webp`, `gif`)
  - Choix des personnages ou objets
- Support offline (fallback local) si pas de connexion ou quota IA dépassé
- Extensible pour intégrer d'autres fournisseurs IA (Gemini, OpenAI, etc.)

## Installation

```bash
# Installer depuis npm
npm install -g joke-meme-cli

# Ou depuis le dépôt
git clone https://github.com/yourusername/joke-meme-cli.git
cd jc
npm install
