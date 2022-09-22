import { View, StyleSheet, Platform } from "react-native";
import React, { FC, memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import Constants from "expo-constants";
import {
  fetchItems,
  fetchVendors,
  fetchNavList,
  checkIfLoading,
  selectErrMsg,
} from "../redux/addedSlice";
import IsLoadingComponents from "../shared/IsLoadingComponents";
import ErrMsgComponent from "../shared/ErrMsgComponent";
import TabBarMain from "./TabBarComponents/TabBarMain";

const Main: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchVendors());
    dispatch(fetchNavList());
  }, [dispatch]);

  const isLoading: boolean = useAppSelector(checkIfLoading);
  const errMsg: string = useAppSelector(selectErrMsg);

  if (isLoading) {
    return <IsLoadingComponents />;
  }

  if (errMsg) {
    return <ErrMsgComponent />;
  }

  return (
    <View style={styles.ContainerStyle}>
      <TabBarMain />
    </View>
  );
};

export default memo(Main);

const styles = StyleSheet.create({
  ContainerStyle: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    backgroundColor: "white",
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
