import { FC, memo } from "react";
import { GestureResponderEvent, Modal, Text, StyleSheet } from "react-native";
import { useAppSelector } from "../../redux/store";
import { selectVendorsArr } from "../../redux/addedSlice";
import CartVendorColumns from "./CartVendorColumns";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { EvilIcons } from "@expo/vector-icons";

type Props = {
  showModal: boolean;
  setShowModal: () => void;
  clickHandler: (e: GestureResponderEvent) => void;
};

const CartColumnList: FC<Props> = ({
  showModal,
  clickHandler,
}): JSX.Element => {
  const vendors = useAppSelector(selectVendorsArr);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={showModal}
      onRequestClose={clickHandler}>
      <SafeAreaView style={styles.SafeAreaViewStyle}>
        <View>
          <Text style={styles.shoppingCartTextStyle}>Shopping Cart</Text>
        </View>
        <View style={styles.closeIconViewStyle}>
          <EvilIcons
            name="close"
            color="#0000007f"
            size={30}
            onPress={clickHandler}
          />
        </View>
      </SafeAreaView>
      {vendors.map(e => (
        <CartVendorColumns key={e} vendorName={e} />
      ))}
    </Modal>
  );
};

const styles = StyleSheet.create({
  SafeAreaViewStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    marginTop: Constants.statusBarHeight + 10,
  },
  shoppingCartTextStyle: {
    color: "red",
  },
  closeIconViewStyle: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});

export default memo(CartColumnList);
