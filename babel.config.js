/** @type {import('@babel/core').ConfigFunction} */
module.exports = api => {
  // api.cache(false);
  api.cache.forever();
  return {
    plugins: ["react-native-reanimated/plugin"],
    presets: ["babel-preset-expo"],
  };
};
