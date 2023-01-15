install:
	npm ci
	git submodule init
	git submodule update

lint:
	npx eslint .

develop:
	npx webpack serve

build:
	rm -rf dist
	NODE_ENV=production npx webpack
