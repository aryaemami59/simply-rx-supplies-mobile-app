import type { ConfigFunction } from "@babel/core";

// /** @type {import('@babel/core').ConfigFunction} */
const config: ConfigFunction = api => {
  // api.cache(false);
  api.cache.forever();
  return {
    plugins: [
      "react-native-reanimated/plugin",
      [
        "babel-plugin-transform-react-remove-prop-types",
        { removeImport: true },
      ],
    ],
    presets: [
      // ["@babel/preset-env", { targets: { node: "current" } }],
      ["babel-preset-expo", { targets: { node: "current" } }],
      // ["@babel/preset-typescript", { targets: { node: "current" } }],
    ],
  };
};

module.exports = config;
