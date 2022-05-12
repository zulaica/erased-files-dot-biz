# Erased Files Dot Biz

Website for the band Erased Files.

https://www.erasedfiles.biz

## Prerequisites

### Required

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) - Source
  code management
  - macOS users can install and manage `git` with [Homebrew](https://brew.sh)
- [Node.js](https://nodejs.org/) (Version 16 LTS)

### Recommended

- [NVM](https://github.com/nvm-sh/nvm) - Simplifies management of muliple
  versions of Node.js. This repo is configured to automatically load the
  required version.
- [Visual Studio Code](https://code.visualstudio.com) - A free source-code
  editor distributed by Microsoft. This repo is configured to automate workspace
  setup in Visual Studio Code, but you are free to use your preferred IDE.

## Development

1. Clone and pull the repository.
2. Run `npm install` from the project directory

## Scripts

- `npm run dev`
  - Launches the Python http server serving files from the `/source` directory
- `npm run build`
  - A series of scripts that processes and bundles the site into the `/build` directory suitable for deploying to production
- `npm run stage`
  - Builds the site from the current branch and deploys to Github Pages (which is used as a staging server).
