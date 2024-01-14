import { getDefaultConfig } from "expo/metro-config";

const config = getDefaultConfig(__dirname, {
  // Enable CSS support.
  isCSSEnabled: true,
});

module.exports = config;
