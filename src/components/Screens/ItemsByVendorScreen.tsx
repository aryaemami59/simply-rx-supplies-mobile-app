import { FC, memo } from "react";
import { StyleSheet } from "react-native";
import ParentItemsByVendor from "../ItemsByVendorComponents/ParentItemsByVendor";

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
