import dns from "dns/promises";

export async function checkConnection(timeout = 1000, maxAttempts = 3): Promise<boolean> {
  try {
    await dns.lookup("google.com");
    return true;
  } catch {
    return false;
  }
}

