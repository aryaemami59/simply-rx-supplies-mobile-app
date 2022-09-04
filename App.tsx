import { Provider } from "react-redux";
import { FC, memo, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Alert, Text } from "react-native";
import Main from "./Main";
import Constants from "expo-constants";
import { store, useAppSelector, useAppDispatch } from "./src/redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import {
  checkIfLoading,
  selectErrMsg,
  fetchItems,
  fetchVendors,
  fetchNavList,
} from "./src/redux/addedSlice";

const App: FC = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default memo(App);

const styles = StyleSheet.create({
  ContainerStyle: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
  },
});
