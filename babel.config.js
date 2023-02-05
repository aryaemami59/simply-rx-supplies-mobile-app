/** @type {import('@babel/core').ConfigFunction} */
module.exports = api => {
  api.cache(true);
  return {
    plugins:
      process.env.NODE_ENV !== "production"
        ? [
            "react-native-reanimated/plugin",
            "babel-plugin-typescript-to-proptypes",
          ]
        : ["react-native-reanimated/plugin"],
    presets: ["babel-preset-expo"],
  };
};
