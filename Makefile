install:
	npm ci
	git submodule init
	git submodule update

lint:
	npx eslint .
	npx stylelint ./src/styles/scss/*.scss
	npx htmlhint ./index.html

develop:
	npx webpack serve

build:
	rm -rf dist
	NODE_ENV=production npx webpack
