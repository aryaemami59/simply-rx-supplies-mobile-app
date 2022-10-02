import { Provider } from "react-redux";
import { FC, memo } from "react";
import Main from "./src/components/Main";
import { store } from "./src/redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { createTheme, ThemeProvider } from "@rneui/themed";

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

const App: FC = (): JSX.Element => {
  return (
    <>
      <SafeAreaProvider>
        <Provider store={store}>
          <PaperProvider>
            <ThemeProvider theme={myTheme}>
              <NavigationContainer>
                <Main />
              </NavigationContainer>
            </ThemeProvider>
          </PaperProvider>
        </Provider>
      </SafeAreaProvider>
    </>
  );
};

export default memo(App);
