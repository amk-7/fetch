import path from "node:path";
import JokeAction from "../jokeAction";
import { checkConnection } from "../../../utils/internet.utils";
import Joke from "../joke";

// Mock des dépendances
// Mock de GeminiProvider
jest.mock("../../../services/ai/gemini", () => {
  return {
    __esModule: true,
    default: {
      // ajoute getProvider comme dans ton code
      getProvider: () => ({
        textToText: jest.fn().mockResolvedValue(
          JSON.stringify({
            setup: "Setup mock",
            punchline: "Punchline mock",
            options: { theme: "mock" },
          })
        ),
      }),
    },
  };
});

jest.mock("../../../utils/internet.utils");

describe("JokeAction", () => {
  const jokeAction = JokeAction.getAction();
  const localFile = path.join(__dirname, "data.json");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("doit retourner un joke local si pas de connexion", async () => {
    (checkConnection as jest.Mock).mockResolvedValue(false);

    const joke = await jokeAction.generate({ theme: "dark" });
    expect(joke).toBeDefined();
    expect(joke).toBeInstanceOf(Joke);
  });

  it("doit retourner un joke de l'IA si connecté", async () => {
    (checkConnection as jest.Mock).mockResolvedValue(true);

    const joke = (await jokeAction.generate({ theme: "funny" })).toJSON();
    expect(joke.setup).toBe("Setup mock");
    expect(joke.punchline).toBe("Punchline mock");
  });
});
