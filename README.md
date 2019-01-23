# 🗞 newshack 💻 
Just another hacker news client.

## Getting Started
Clone the repository and make sure you have `node` installed.

Run `npm i` to install dependencies.

To run a development server with hot module reloading type:
```
npm run dev
```
Once you run this command, Newshack will be available at `localhost:3000/newshack`. The app will hot reload in-browser as you save your changes.

To build and minify a production-ready version:
```
npm run build
```

## Testing
To run all lints and tests against the codebase, run:
```
npm test
```

ESLint can automatically fix certain linting issues with the command:
```
npm run lint:fix
```

If for some reason you need to only run jest tests, use:
```
npm run test:jest
```

## Profiling
For a visualization of the projects dependencies and their size (both uncompressed and gzipped), you can run:
```
npm run profile
```
This is a good way to understand the impact libraries have on file size and load time.

## Deploying
Newshack is designed to be deployed on [GitHub Pages](https://pages.github.com). The `gh-pages` branch of this repo contains built js checked in to the repo. To deploy, simply merge `master` into `gh-pages`, run `npm run build`, and then commit and push the changes from `gh-pages` to GitHub.
