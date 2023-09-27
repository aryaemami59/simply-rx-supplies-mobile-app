import { NavigationContainer } from "@react-navigation/native";
import { createTheme, ThemeProvider } from "@rneui/themed";
import type { FC } from "react";
import { memo } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";

import Main from "./src/components/Main";
import apiSlice from "./src/redux/apiSlice";
import { store } from "./src/redux/store";

enableScreens(true);

store.dispatch(apiSlice.endpoints.getMain.initiate());

const myTheme = createTheme({
  lightColors: {
    background: "rgb(255, 255, 255)",
    grey0: "rgba(28, 28, 30, 0.5)",
  },
  darkColors: {
    background: "rgb(21, 32, 43)",
    black: "white",
  },
  mode: "light",
});

const App: FC = () => (
  <SafeAreaProvider>
    <Provider
      store={store}
      noopCheck="always"
      stabilityCheck="always">
      <PaperProvider>
        <ThemeProvider theme={myTheme}>
          <NavigationContainer>
            <Main />
          </NavigationContainer>
        </ThemeProvider>
      </PaperProvider>
    </Provider>
  </SafeAreaProvider>
);

export default memo(App);
