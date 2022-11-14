import createExpoWebpackConfigAsync from "@expo/webpack-config/webpack";
import { Arguments, Environment } from "@expo/webpack-config/webpack/types";

module.exports = async (env: Environment, argv: Arguments) => {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,

      babel: {
        dangerouslyAddModulePathsToTranspile: [
          // "@rneui/base",
          // "@rneui/themed",
          "react-native-reanimated",
        ],
      },
    },
    argv
  );
  config.module!.rules = [{ include: "react-native-reanimated" }];
  // Customize the config before returning it.
  return config;
};
