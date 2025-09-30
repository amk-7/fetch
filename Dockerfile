# Etape 1 : builder TS
FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etape 2 : exécuter le code compilé
FROM node:20-slim
WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

# Commande par défaut (adapter à ton app)
CMD ["npm", "run", "fetch"]
