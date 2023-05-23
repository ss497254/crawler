#!/bin/bash
echo What should the version be?
read $VERSION

if [[ -z $VERSION ]];
then
    echo "building with latest"
    docker rmi crawler --force
    docker build -t crawler:latest .
else
    echo "building with "$VERSION
    docker build -t crawler:$VERSION .
fi