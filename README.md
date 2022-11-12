# Erased Files Dot Biz

Website for the band Erased Files.

https://www.erasedfiles.biz

## Prerequisites

### Required

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) - Source
  code management
- [Node.js](https://nodejs.org/) (Version 16.18.1 LTS)

### Recommended

- [Volta](https://volta.sh) - JavaScript tool manager used to simplify managing
  muliple versions of Node.js. This repo is configured to automatically load the
  required version.
- [Visual Studio Code](https://code.visualstudio.com) - A free source-code
  editor distributed by Microsoft. This repo is configured to automate workspace
  setup in Visual Studio Code, but you are free to use your preferred IDE.

## Development

1. Clone and pull the repository.
2. Run `npm ci` from the project directory

## Scripts

- `npm run dev`
  - Launches the `browser-sync` server, serving files from the `/source` directory
- `npm run build`
  - Processes and bundles the site into the `/release` directory suitable for
    deploying to production
- `npm run lint`
  - A series of scripts that lint the source code.
