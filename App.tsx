import { Provider } from "react-redux";
import { FC, memo } from "react";
import { StyleSheet } from "react-native";
import Main from "./Main";
import { store } from "./src/redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

const App: FC = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <Main />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

import React from "react";
// import { whyDidYouUpdate } from "why-did-you-update";
// whyDidYouUpdate(React);

export default memo(App);

const styles = StyleSheet.create({
  ContainerStyle: {
    flex: 1,
  },
});
