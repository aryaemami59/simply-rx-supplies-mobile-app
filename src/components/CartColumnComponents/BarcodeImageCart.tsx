import { FC, memo, useState, useCallback } from "react";
import { itemInterface } from "../../redux/addedSlice";
import { Image, Modal, View } from "react-native";
import { Feather, MaterialCommunityIcons, EvilIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";

interface Props {
  itemObj: itemInterface;
}

const BarcodeImageCart: FC<Props> = ({ itemObj }): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const clickHandler = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  return (
    <>
      <Image
        source={{ uri: itemObj.src }}
        style={{ width: 132, aspectRatio: 33 / 28 }}
      />
      <Feather name="printer" size={30} color="black" />
      <MaterialCommunityIcons
        name="magnify-close"
        size={30}
        onPress={clickHandler}
      />
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
            <Image
              source={{ uri: itemObj.src }}
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
      </Modal>
    </>
  );
};

export default memo(BarcodeImageCart);
