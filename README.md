# React Best Practices

<!-- TOC GFM -->

- [Run project](#run-project)
	- [Install](#install)
	- [Setup environment for development](#setup-environment-for-development)
	- [Run develop](#run-develop)
- [Working with the project](#working-with-the-project)
	- [Exercises/solutions](#exercisessolutions)
		- [Folder naming](#folder-naming)
- [Prerequisites](#prerequisites)
- [IDE](#ide)

<!-- TOC -->

## Run project

### Install

```
yarn
```

### Setup environment for development

```
yarn init:dev
```

### Run develop

```
yarn start
```

## Working with the project

### Exercises/solutions

Exercises are placed in the `exercises/*` folder.
Every exercise is its own small litle node module.
So you can install dependencies directly for the exercise.
Every exercise has its own `README.md` with the description of the assigment.

Solutions are placed in the `solutions/*` folder.
Explanation and needed theory will be explained at workshop.

#### Folder naming

* `exercise-x/README.md` - assigment and description
* `exercise-x/src/DemoX` - starting point for the demo _X_ that the tutor will show you
* `solution-x/src/DemoXSolution` - finished version of the demo _X_
* `(exercise|solution)-x/src/index` - uncomment what you want to run in the Workshop App
under the url `http://localhost:8000/exercise-x` or `http://localhost:8000/solution-x` respectively.

## Prerequisites

- Git v2,
- Node v10>=
- NPM v6>=
- Yarn v1.19.1 >= && &lt; v2

Following should work:
```
node -v
yarn -v
npm -v
git -v
```
## IDE
Use whatever you are comfortable with React development.

I use Vim. Here is my [`vimrc`](https://github.com/tommmyy/dotfiles/tree/master/.vim).
