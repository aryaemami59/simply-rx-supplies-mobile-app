module.exports = function (api) {
  api.cache(true);
  const plugins = [
    "react-native-reanimated/plugin",
    "react-native-paper/babel",
  ];
  if (process.env.NODE_ENV !== "production") {
    plugins.push("babel-plugin-typescript-to-proptypes");
  }
  return {
    presets: [
      "@babel/preset-typescript",
      "@babel/preset-react",
      "babel-preset-expo",
    ],
    plugins,
  };
};
