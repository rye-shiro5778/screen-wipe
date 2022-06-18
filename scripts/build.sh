#!/bin/bash
ENV=production

if [ $1=win ]; then
    OS=$1
elif [ $1=mac ]; then
    OS=$1
else
    exit 1
fi

echo "環境:$ENV,OS:$OS"

rm -r dist
mkdir dist
cp -r icons ./dist/icons

cross-env WEBPACK_ENV=$ENV webpack --config webpack.config.main.ts
cross-env WEBPACK_ENV=$ENV  webpack --config webpack.config.render.ts

# electronビルド
rm -r builder
electron-builder --$OS --x64




