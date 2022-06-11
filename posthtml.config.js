module.exports = {
  "plugins": {
    "htmlnano": {
      "collapseAttributeWhitespace": true,
      "collapseWhitespace": "aggressive",
      "deduplicateAttributeValues": true,
      "mergeScripts": false,
      "mergeStyles": false,
      "minifyConditionalComments": true,
      "minifyJs": false,
      "minifySvg": {
        "plugins": [
          {
            "name": "preset-default",
            "params": {
              "overrides": {
                "collapseGroups": false,
                "convertShapeToPath": false,
              },
            },
          },
        ],
      },
      "minifyUrls": false,
      "normalizeAttributeValues": true,
      "removeAttributeQuotes": false,
      "removeComments": "all",
      "removeEmptyAttributes": false,
      "removeOptionalTags": false,
      "removeRedundantAttributes": false,
      "removeUnusedCss": false,
      "sortAttributes": false,
    },
    "posthtml-hash": { path: "build", pattern: new RegExp(/hash/) },
  },
};
