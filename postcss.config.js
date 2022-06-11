module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-preset-env": {},
    "postcss-url": [
      {
        "filter": "**/*.woff2",
        "url": "copy"
      },
      {
        "filter": "**/*.woff",
        "url": "copy"
      },
      {
        "filter": "**/*.ttf",
        "url": "copy"
      },
      {
        "filter": "**/*.webp",
        "url": (asset) => asset.relativePath,
      },
      {
        "filter": "**/*.jpg",
        "url": (asset) => asset.relativePath,
      },
    ],
    "cssnano": {
      preset: [
        "advanced",
        {
          minifyFontValues: false,
          normalizeUrl: false,
          normalizeString: {
            preferredQuote: 'single'
          }
        }
      ]
    },
  },
};
