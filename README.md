# Fetch

**Fetch** is a simple Node.js module written in **TypeScript** that allows you to fetch jokes, memes, and more — powered by **AI**.  
It provides a clean interface for generating fun and dynamic content, either from local datasets or via AI providers.


### Features

- 🃏 Fetch random **jokes** (local or AI-generated).
- 😂 Generate custom **memes** with multiple options.
- 🤖 Plug-and-play with **AI providers** (e.g., Gemini, OpenAI).
- 📦 Written in **TypeScript** with type-safe options.
- ⚡ Simple CLI integration.



## About

- **Goal:**  
  Provide a simple and extensible module to easily generate fun content (jokes, memes, …) with or without AI.  
  The aim is to simplify the integration of humorous and creative content into apps, bots, or CLI tools.  

- **Target audience:**  
  - Node.js developers who want to quickly integrate jokes/memes.  
  - Bot creators (Discord, Slack, Telegram, etc.).  
  - Web or CLI applications looking for AI-generated content.  

- **Tech stack:**  
  - **Node.js** + **TypeScript** (project core).  
  - **Pino** (logging).  
  - **Jest** (testing).  
  - **Gemini / other AI providers** (AI-generated content).  
  

## Installation

### Prérequis
- Node.js >= 20  
- npm ou yarn  
- Docker (optionnel)

### Installation sans docker
```bash

# Installer depuis npm
npm install -g fetch
```

```bash
# Cloner le projet
git clone https://github.com/amk-7/fetch.git
cd fetch

# Installer les dépendances
npm ci

# Compiler le typescripte
npm run build
```


## Utilisation

### Configuration des providers AI
Créer un fichier `.env` à la racine du projet et ajouter les variables d'environnements suivantes :  

```env
# file : .env
GEMINI_API_KEY=your_gemini_api_key
```

### CLI
```bash
fetch  --help

// Générer une blage
fetch joke
```

### En tant que librairie
```ts
import { JokeAction } from "@amk-7/fetch";

async function main() {
  const joke = JokeAction.getAction();
  const result = await joke.generate()
  console.log(result);
}

main();

// Ou avec des options
import { JokeAction } from "@amk-7/fetch";

async function main() {
  const joke = JokeAction.getAction();
  const options = { theme: "One piece" };
  const result = await joke.generate(options); 
  console.log(result);
}

main();

```



## Roadmap

- [ ] Générer un meme  
- [ ] Ajouter une interface web  
- [ ] Support multi-langue  
- [ ] Ajouter un système de plugins  


## 🤝 Contribution

Les contributions sont les bienvenues 🎉  
1. Fork le repo  
2. Crée une branche `feature/ma-feature`  
3. Commit & push  
4. Ouvre une Pull Request  

Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour plus de détails.


## Licence

Distribué sous licence **MIT**.  
Voir [LICENSE](LICENSE) pour plus d’informations.


## Auteur

- **KONDI Abdoul Malik (amk-7)**  
- [Portfolio](https://kondi-code.vercel.app/) | [LinkedIn](https://www.linkedin.com/in/abdoul-malik-kondi-b51146210) | [whatsApp](https://wa.link/kzi7an)