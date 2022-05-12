module.exports = {
  "plugins": {
    "postcss-import": {},
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
        "filter": "**/*RGB.webp",
        "url": (asset) => asset.relativePath,
      },
      {
        "filter": "**/*RGB.jpg",
        "url": (asset) => asset.relativePath,
      },
    ],
    "postcss-preset-env": {},
    "autoprefixer": {},
    "cssnano": { preset: "default" },
  },
};
