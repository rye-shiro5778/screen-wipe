#!/bin/bash
ENV=development

rm -r dist
mkdir dist
cp -r icons ./dist/icons

cross-env WEBPACK_ENV=$ENV webpack --config webpack.config.main.ts
cross-env WEBPACK_ENV=$ENV  webpack --config webpack.config.render.ts


wait-on ./dist/renderer/splash.html && \
wait-on ./dist/renderer/app.html && \
cross-env NODE_ENV=$ENV ./node_modules/.bin/electron .


