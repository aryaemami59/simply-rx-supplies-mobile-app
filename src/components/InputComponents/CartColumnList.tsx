import { FC, memo } from "react";
import { GestureResponderEvent, Modal, Text } from "react-native";
import { Button } from "@rneui/themed";
import { useAppSelector } from "../../redux/store";
import { selectVendorsArr } from "../../redux/addedSlice";
import CartVendorColumns from "../CartColumnComponents/CartVendorColumns";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { EvilIcons, Ionicons, SimpleLineIcons } from "@expo/vector-icons";

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
    <Modal
      animationType="slide"
      transparent={false}
      visible={showModal}
      onRequestClose={clickHandler}>
      <SafeAreaView
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: Constants.statusBarHeight,
          marginTop: Constants.statusBarHeight + 10,
        }}>
        <View>
          <Text style={{ color: "red" }}>Shopping Cart</Text>
        </View>
        <View
          style={{
            position: "absolute",
            right: 0,
            top: 0,
          }}>
          {/* <Button title="X" onPress={clickHandler} color="error" /> */}
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

export default memo(CartColumnList);
