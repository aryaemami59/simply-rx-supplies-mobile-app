import { FC, memo, useCallback } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "../../redux/store";
import { checkIfAnyItemsAdded } from "../../redux/addedSlice";
import { Badge } from "@rneui/themed";
// import { StackScreenProps } from "@react-navigation/stack";
// import { RootStackParamList } from "../../../Main";
// import {
//   DrawerHeaderProps,
//   DrawerNavigationProp,
//   DrawerScreenProps,
// } from "@react-navigation/drawer";

export type HeaderRightProps = {
  tintColor?: string;
  pressColor?: string;
  pressOpacity?: number;
};

// type Props = DrawerNavigationProp<
//   RootStackParamList,
//   keyof RootStackParamList
// > &
//   HeaderRightProps;

const HeaderRight = ({ navigation }): JSX.Element => {
  const ifItemsAdded: boolean = useAppSelector(checkIfAnyItemsAdded);
  const clickHandler = useCallback(() => {
    navigation.navigate("ShoppingCart");
  }, []);

  return (
    <View style={styles.containerStyle}>
      <Ionicons
        name="contrast"
        size={30}
        color="white"
        style={{ marginEnd: 10 }}
      />
      <TouchableOpacity onPress={clickHandler}>
        <Ionicons
          name={ifItemsAdded ? "cart" : "cart-outline"}
          color="white"
          size={40}
          style={{ marginEnd: 10 }}
        />
      </TouchableOpacity>
      {ifItemsAdded ? (
        <Badge
          status="error"
          containerStyle={{ position: "absolute", right: 10, top: 5 }}
        />
      ) : (
        ""
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default memo(HeaderRight);
