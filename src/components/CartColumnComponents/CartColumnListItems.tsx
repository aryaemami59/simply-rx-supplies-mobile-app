import { FC, memo, useCallback, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { selectByVendor } from "../../redux/addedSlice";
import { ButtonGroup, ListItem } from "@rneui/themed";
import {
  Text,
  View,
  Image,
  ScrollView,
  Modal,
  GestureResponderEvent,
} from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  EvilIcons,
  AntDesign,
  Fontisto,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
// import Clipboard from "@react-native-clipboard/clipboard";
import * as Clipboard from "expo-clipboard";
import ItemNameCart from "./ItemNameCart";
import ItemNumberCart from "./ItemNumberCart";
import BarcodeImageCart from "./BarcodeImageCart";

interface Props {
  vendorName: string;
}

const CartColumnListItems: FC<Props> = ({ vendorName }): JSX.Element => {
  const addedItems = useAppSelector(selectByVendor(vendorName));
  // const [showModal, setShowModal] = useState(false);

  // const copyToClipboard = (e: GestureResponderEvent, i) => {
  //   Clipboard.setString(i);
  // };

  // const copyToClipboard = async (ev, i) => {
  //   await Clipboard.setStringAsync(i);
  // };

  // const clickHandler = useCallback(() => {
  //   setShowModal(prev => !prev);
  // }, []);

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      {addedItems.map(e => (
        <ListItem bottomDivider key={e.name}>
          <View style={{ alignItems: "center" }}>
            <ButtonGroup
              containerStyle={{ borderWidth: 0 }}
              innerBorderStyle={{ width: 0 }}
              buttons={[
                <MaterialCommunityIcons
                  name="magnify-close"
                  size={30}
                  color="black"
                />,
                <AntDesign name="minuscircleo" size={30} color="black" />,
                <AntDesign name="closecircleo" size={30} color="black" />,
              ]}
            />
            <ItemNameCart itemObj={e} />
            <ItemNumberCart itemObj={e} />
            <BarcodeImageCart itemObj={e} />
            {/* <Image
              source={{ uri: e.src }}
              style={{ width: 132, aspectRatio: 33 / 28 }}
            />
            <Feather name="printer" size={30} color="black" /> */}
            {/* <MaterialCommunityIcons
              name="magnify-close"
              size={30}
              onPress={clickHandler}
            /> */}
            {/* <Modal
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
                  <Image
                    source={{ uri: e.src }}
                    style={{ width: 264, aspectRatio: 33 / 28 }}
                  />
                </View>
                <View
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                  }}>
                  <EvilIcons
                    name="close"
                    color="#0000007f"
                    size={30}
                    onPress={clickHandler}
                  />
                </View>
              </SafeAreaView>
            </Modal> */}
          </View>
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default memo(CartColumnListItems);
