import { View, StyleSheet, Platform } from "react-native";
import React, { FC, memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Constants from "expo-constants";
import {
  fetchItems,
  fetchVendors,
  fetchCategories,
  checkIfLoading,
  selectErrMsg,
} from "../redux/addedSlice";
import IsLoadingComponents from "../shared/IsLoadingComponents";
import ErrMsgComponent from "../shared/ErrMsgComponent";
import TabBarMain from "./TabBarComponents/TabBarMain";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@rneui/themed";
import { HEIGHT_100 } from "../shared/sharedStyles";

const Main: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchVendors());
    dispatch(fetchCategories());
  }, [dispatch]);

  const isLoading = useAppSelector(checkIfLoading);
  const errMsg = useAppSelector(selectErrMsg);

  if (isLoading) {
    return <IsLoadingComponents />;
  }

  if (errMsg) {
    return <ErrMsgComponent />;
  }

  return (
    // <SafeAreaView
    //   style={[HEIGHT_100, { backgroundColor: theme.colors.background }]}>
    <TabBarMain />
    // </SafeAreaView>
    // <View style={styles.container}>
    //   <TabBarMain />
    // </View>
    // <SafeAreaProvider>
    //   <TabBarMain />
    // </SafeAreaProvider>
  );
};

export default memo(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: statusBarHeight,
    // paddingTop: Constants.statusBarHeight,
    // paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    backgroundColor: "white",
    height: "100%",
  },
  DarkModeStyle: {
    color: "white",
    height: "100%",
  },
  LightModeStyle: {
    backgroundColor: "white",
    color: "black",
    height: "100%",
  },
});
