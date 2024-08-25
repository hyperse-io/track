<div align="center">
<img alt="logo" width="196px" src="https://raw.githubusercontent.com/hyperse-io/track/main/website/static/img/logo-readme.svg?sanitize=true"/>
<h1 align="center">hyperse data tracker engine</h1>
</div>

<p align="center">
  <a aria-label="Build" href="https://github.com/hyperse-io/track/actions?query=workflow%3ACI">
    <img alt="build" src="https://img.shields.io/github/actions/workflow/status/hyperse-io/track/ci-integrity.yml?branch=main&label=ci&logo=github&style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="stable version" href="https://www.npmjs.com/package/@hyperse/track">
    <img alt="stable version" src="https://img.shields.io/npm/v/%40hyperse%2Ftrack?branch=main&label=version&logo=npm&style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="Top language" href="https://github.com/hyperse-io/track/search?l=typescript">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/hyperse-io/track?style=flat-square&labelColor=000&color=blue">
  </a>
  <a aria-label="Licence" href="https://github.com/hyperse-io/track/blob/main/LICENSE.md">
    <img alt="Licence" src="https://img.shields.io/github/license/hyperse-io/track?style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="Discord" href="https://www.hyperse.net/community">
    <img alt="Discord" src="https://img.shields.io/discord/1249658585227460703?label=Discord&color=5865F2" />
  </a>
  <a aria-label="Twitter" href="https://x.com/hyperse_net">
    <img alt="Twitter" src="https://img.shields.io/badge/Twitter-black?logo=x&logoColor=white" />
  </a>
</p>

<img alt="uml" src="https://raw.githubusercontent.com/hyperse-io/track/main/website/static/img/uml.svg"/>

<!-- hyperse-vitest-coverage-reporter-marker-readme -->

## Coverage Report

<table> <thead> <tr> <th align="center">Status</th> <th align="left">Category</th> <th align="right">Percentage</th> <th align="right">Covered / Total</th> </tr> </thead> <tbody> <tr> <td align="center">🔵</td> <td align="left">Lines</td> <td align="right">100%</td> <td align="right">191 / 191</td> </tr> <tr> <td align="center">🔵</td> <td align="left">Statements</td> <td align="right">100%</td> <td align="right">191 / 191</td> </tr> <tr> <td align="center">🔵</td> <td align="left">Functions</td> <td align="right">98.21%</td> <td align="right">55 / 56</td> </tr> <tr> <td align="center">🔵</td> <td align="left">Branches</td> <td align="right">93.02%</td> <td align="right">80 / 86</td> </tr> </tbody> </table>

## Prerequisites

Before you begin, make sure you have the following installed:

* Node.js (recommended version 16.x or higher)
* npm (comes with Node.js)

## Installation

```ts
// npm
npm i @hyperse/track

// yarn
yarn add @hyperse/track
```

## Development

> \[!IMPORTANT]
> The following instructions are for those who want to develop the hyperse related framework or plugins (e.g. if you intend to make a pull request). For instructions on how to build a project *using* Hyperse, please see the [Getting Started guide](https://hyperse-io.github.io/track/docs/community/contributing).

### 1. Clone project to the local directory

```bash
git clone https://github.com/hyperse-io/track.git
```

### 2. Install dependencies in the root directory

```bash
yarn install
```

or

```bash
npm install
```

The root directory has a `package.json` which contains build-related dependencies for tasks including:

* Building & deploying the docs
* Project for online presentation
* Linting, formatting & testing tasks to run on git commit & push

### 3. Testing

Make sure to thoroughly test your changes before submitting them. This includes running unit tests, integration tests, and any other relevant testing methods to ensure code quality and functionality.

The core and several other packages have unit tests which are can be run all together by running `npm run test` from the root directory, or individually by running it from the package directory.

Unit tests are co-located with the files which they test, and have the suffix `.spec.ts`.

### 4. Improve documentation

Documentation is a critical part of any software project. To improve or update the documentation:

1. Update Documentation Files: If your changes introduce new features, modify existing functionality, or fix bugs, update the relevant documentation files located in the /website directory.

2. Build and Preview: Ensure that your documentation builds correctly and looks good by running:

```bash
cd website

npm run start
```

3. Commit Documentation Changes: Make sure all updates to documentation are committed alongside your code changes.

### 5. Release Process

To make a release:

1. Commit the Changes: Push your updated files to your branch.

2. Create a Pull Request: [Open a pull request (PR)](https://github.com/hyperse-io/track/compare) with your changes. Make sure to include a clear description of what has been updated and why.

3. GitHub Actions: Once the PR is merged into the main branch, the release process will be automatically handled by GitHub Actions. This includes tasks such as publishing to npm and updating documentation.

## Documentation

You can find the Track documentation [on the website](https://hyperse-io.github.io/track/).

Check out the [Sample Example](https://hyperse-io.github.io/track/docs/intro/sample-example) page for a quick start.

## License

See [LICENSE](https://github.com/hyperse-io/track/blob/main/LICENSE.md)
