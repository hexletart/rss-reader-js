install:
	npm ci

lint:
	npx eslint .
	npx stylelint ./src/styles/scss/*.scss
	npx htmlhint ./index.html

develop:
	npx webpack serve

build:
	rm -rf dist
	NODE_ENV=production npx webpack
