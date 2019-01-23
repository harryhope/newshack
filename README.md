# 🗞 newshack 💻 
Newshack is just another hacker news client. It's a single-page React application that reads from the [official HN API](https://github.com/HackerNews/API) and is designed to work right in [GitHub Pages](https://pages.github.com). I built it because I wanted a simple, aesthetically pleasing way to read [hacker news](https://news.ycombinator.com), especially on mobile.

[You can see it here.](https://harryhope.github.io/newshack)

#### Here's what it looks like:
<img width="400" alt="screen shot 2019-01-22 at 11 49 00 pm" src="https://user-images.githubusercontent.com/2415156/51583829-6800e300-1ea0-11e9-85ca-261b3bc7a3c4.png">

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
