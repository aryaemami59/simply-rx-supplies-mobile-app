import { Provider } from "react-redux";
import { FC, memo } from "react";
import { StyleSheet } from "react-native";
import Main from "./src/components/Main";
import { store } from "./src/redux/store";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { createTheme, ThemeProvider, useTheme } from "@rneui/themed";

// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: "tomato",
//     secondary: "yellow",
//   },
// };

const myTheme = createTheme({
  lightColors: {
    // background: "#f2f2f2",
    background: "rgb(255, 255, 255)",
    grey0: "rgba(28, 28, 30, 0.5)",
    // primary: "#f2f2f2",
  },
  darkColors: {
    background: "rgb(21, 32, 43)",
    black: "white",

    // primary: "#121212",
  },
  mode: "light",
  // mode: "dark",
});

const App: FC = (): JSX.Element => {
  // const { theme } = useTheme();
  return (
    <>
      <SafeAreaProvider>
        <Provider store={store}>
          <PaperProvider>
            <ThemeProvider theme={myTheme}>
              <NavigationContainer>
                {/* <SafeAreaView
                  style={{
                    height: "100%",
                    flex: 1,
                    backgroundColor: theme.colors.background,
                  }}> */}
                <Main />
                {/* </SafeAreaView> */}
              </NavigationContainer>
            </ThemeProvider>
          </PaperProvider>
        </Provider>
      </SafeAreaProvider>
    </>
  );
};

export default memo(App);
