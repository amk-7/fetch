#!/bin/bash

IMAGE="amk07/fetch"
VERSION="v$(node -p "require('./package.json').version")"

docker build -t $IMAGE:latest .
docker tag $IMAGE:latest $IMAGE:$VERSION

docker push $IMAGE:latest
docker push $IMAGE:$VERSION
