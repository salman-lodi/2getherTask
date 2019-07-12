#!/bin/bash
mkdir dist
cp package.json dist
cp index.js dist
cp -r bin dist
cp -r config dist
cp ./.env dist
npx babel app --out-dir dist/app --ignore node_modules --extensions '.js,.jsx,.ts,.tsx'