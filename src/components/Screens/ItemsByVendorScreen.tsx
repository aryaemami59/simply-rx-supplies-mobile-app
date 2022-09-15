import { FC, memo } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import ParentItemsByVendor from "../ItemsByVendorComponents/ParentItemsByVendor";

// type Props = DrawerScreenProps<RootStackParamList, "ItemsByVendor">;

const ItemsByVendorScreen: FC = (): JSX.Element => {
  return <ParentItemsByVendor />;
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: "stretch",
    justifyContent: "space-between",
    height: "100%",
    padding: 30,
  },
});

export default memo(ItemsByVendorScreen);
