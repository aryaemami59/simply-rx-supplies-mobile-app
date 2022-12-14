import { NavigationContainer } from "@react-navigation/native";
import { createTheme, ThemeProvider } from "@rneui/themed";
// import whyDidYouRender from "@welldone-software/why-did-you-render";
import type { FC } from "react";
import { memo } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import Main from "./src/components/Main";
import { fetchItems } from "./src/redux/addedSlice";
import { store } from "./src/redux/store";

// enableLayoutAnimations(false);
enableScreens(true);
// enableScreens(false);
// enableFreeze();

store.dispatch(fetchItems()).catch(e => console.log(e));

const myTheme = createTheme({
  // components
  // components: {

  // }
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

// export const backgroundContext = createContext(myTheme.lightColors?.background);

// whyDidYouRender(React, {
//   trackAllPureComponents: true,
// });

const App: FC = () => {
  // const { background: backgroundColor } = useTheme().theme.colors;

  // const style = useMemo(
  //   () => ({
  //     backgroundColor,
  //   }),
  //   [backgroundColor]
  // );
  // const bg =
  //   myTheme.mode === "light"
  //     ? myTheme.lightColors?.background
  //     : myTheme.darkColors?.background;
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PaperProvider>
          {/* <backgroundContext.Provider value={bg}> */}
          <ThemeProvider theme={myTheme}>
            <NavigationContainer>
              <Main />
            </NavigationContainer>
          </ThemeProvider>
          {/* </backgroundContext.Provider> */}
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default memo(App);
