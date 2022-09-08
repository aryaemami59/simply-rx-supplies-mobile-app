import { FC, memo } from "react";
import {
  GestureResponderEvent,
  Modal,
  NativeSyntheticEvent,
  Platform,
  Text,
} from "react-native";
import { Button } from "@rneui/themed";
import { useAppSelector } from "../redux/store";
import { selectVendorsArr } from "../redux/addedSlice";
import CartVendorColumns from "./CartVendorColumns";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";

interface Props {
  showModal: boolean;
  setShowModal: Function;
  clickHandler: (e: GestureResponderEvent) => void;
}

const CartColumnList: FC<Props> = ({
  showModal,
  clickHandler,
}): JSX.Element => {
  const vendors = useAppSelector(selectVendorsArr);

  return (
    // <View
    //   style={{
    //     flex: 1,
    //     paddingTop: 10,
    //   }}>
    // <SafeAreaView>
    <Modal
      animationType="slide"
      transparent={false}
      visible={showModal}
      onRequestClose={clickHandler}>
      {/* <View
            style={{
              flex: 1,
              paddingTop: 15,
            }}> */}
      <SafeAreaView
        style={{
          // flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: Constants.statusBarHeight,
          marginTop: Constants.statusBarHeight + 10,
          // position: "relative",
        }}>
        <View>
          <Text style={{ color: "red" }}>Shopping Cart</Text>
        </View>
        <View
          style={{
            position: "absolute",
            right: 0,
          }}>
          <Button title="X" onPress={clickHandler} color="error" />
        </View>
      </SafeAreaView>
      {vendors.map(e => (
        <CartVendorColumns key={e} vendorName={e} />
      ))}
      {/* </View> */}
    </Modal>
    // </View>
  );
};

export default memo(CartColumnList);
