#!/bin/bash
set -e  # Arrête tout si une commande échoue

# 🎨 Couleurs
GREEN="\033[0;32m"
RED="\033[0;31m"
BLUE="\033[0;34m"
NC="\033[0m" # Reset

echo -e "${BLUE}🚀 Hey Dev, c'est l'heure de shipper ton code !${NC}"

# Demander un message de commit
read -p "✍️  Entre ton message de commit: " COMMIT_MSG

# Git
echo -e "${GREEN}📦 Ajout des fichiers...${NC}"
git add .

echo -e "${GREEN}📝 Commit en cours...${NC}"
git commit -m "$COMMIT_MSG"

echo -e "${GREEN}📤 Push vers main...${NC}"
git push origin main

# Tests
echo -e "${GREEN}🧪 Lancement des tests...${NC}"
npm run test

# Build
echo -e "${GREEN}🏗️  Build du projet...${NC}"
npm run build

# # Publish
# echo -e "${GREEN}📡 Publication du package...${NC}"
# ./publish.sh

# # Docker build
# echo -e "${GREEN}🐳 Build Docker...${NC}"
# ./build.sh

# echo -e "${BLUE}✅ Tout est nickel ! Code pushé, testé, buildé et publié.${NC}"
