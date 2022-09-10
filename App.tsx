import { Provider } from "react-redux";
import { FC, memo } from "react";
import { StyleSheet } from "react-native";
import Main from "./Main";
import { store } from "./src/redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { MyTabs } from "./Main";

const App: FC = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Provider store={store}>
          <NavigationContainer>
            <Main />
          </NavigationContainer>
          {/* <NavigationContainer>
            <MyTabs />
          </NavigationContainer> */}
        </Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default memo(App);

const styles = StyleSheet.create({
  ContainerStyle: {
    flex: 1,
  },
});
