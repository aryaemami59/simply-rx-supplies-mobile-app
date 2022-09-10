import { FC, memo } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../Main";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import ParentShoppingCart from "../ShoppingCartComponents/ParentShoppingCart";

type Props = DrawerScreenProps<RootStackParamList, "ShoppingCart">;

const ShoppingCartScreen: FC<Props> = ({ navigation }): JSX.Element => {
  return (
    <>
      <ParentShoppingCart />
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: "stretch",
    justifyContent: "space-between",
    height: "100%",
    padding: 30,
  },
});

export default memo(ShoppingCartScreen);
