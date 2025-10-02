#!/bin/bash
set -e  # Arrête tout si une commande échoue

# 🎨 Couleurs
GREEN="\033[0;32m"
RED="\033[0;31m"
BLUE="\033[0;34m"
YELLOW="\033[1;33m"
NC="\033[0m" # Reset

IMAGE="amk07/fetch"
VERSION="v$(node -p "require('./package.json').version")"

# 🚀 Bannière
echo -e "${BLUE}"
echo "======================================="
echo " 🐳 Docker Build & Push - Mission Start "
echo "======================================="
echo -e "${NC}"

# ⚠️ Demander confirmation
read -p "🤔 Veux-tu vraiment builder et pousser l'image $IMAGE:$VERSION ? (y/n) " CONFIRM

if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
    echo -e "${RED}❌ Mission annulée. Ton image reste au sol.${NC}"
    exit 1
fi

# Compte à rebours style fusée 🚀
echo -e "${YELLOW}⏳ Préparation au décollage...${NC}"
for i in 3 2 1
do
  echo -e "${BLUE}🚀 Lancement dans $i...${NC}"
  sleep 1
done

# Build Docker
echo -e "${GREEN}🏗️  Construction de l'image Docker...${NC}"
docker build -t $IMAGE:latest .

# Tagging
echo -e "${GREEN}🏷️  Tagging de l'image avec la version $VERSION...${NC}"
docker tag $IMAGE:latest $IMAGE:$VERSION

# Push Docker
echo -e "${GREEN}📤 Poussée vers Docker Hub...${NC}"
docker push $IMAGE:latest
docker push $IMAGE:$VERSION

# ✅ Succès
echo -e "${GREEN}"
echo "======================================="
echo " ✅ Mission accomplie !"
echo " 🌍 Image $IMAGE:$VERSION est maintenant en orbite !"
echo "======================================="
echo -e "${NC}"
