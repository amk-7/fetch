#!/bin/bash
set -e  # Arrête tout si une commande échoue

# 🎨 Couleurs
GREEN="\033[0;32m"
RED="\033[0;31m"
BLUE="\033[0;34m"
NC="\033[0m" # Reset

# Tests
echo -e "${GREEN}🧪 Lancement des tests...${NC}"
npm run test

# Build
echo -e "${GREEN}🏗️  Build du projet...${NC}"
npm run build

echo -e "${BLUE}🚀 Hey Dev, c'est l'heure de shipper ton code !${NC}"

# Demander si on veut commit
read -p "❓ Veux-tu faire un commit ? (y/n): " DO_COMMIT

if [[ "$DO_COMMIT" == "y" || "$DO_COMMIT" == "Y" ]]; then
    # Demander le message de commit
    read -p "✍️  Entre ton message de commit: " COMMIT_MSG

    echo -e "${GREEN}📦 Ajout des fichiers...${NC}"
    git add .

    echo -e "${GREEN}📝 Commit en cours...${NC}"
    git commit -m "$COMMIT_MSG"

    echo -e "${GREEN}📤 Push vers dev...${NC}"
    git push origin dev
else
    echo -e "${RED}⏩ Pas de commit effectué.${NC}"
fi

echo -e "${BLUE}✅ Process terminé.${NC}"
