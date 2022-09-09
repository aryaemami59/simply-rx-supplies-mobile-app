import { FC, memo, useCallback, useState } from "react";
// import QRCode from "qrcode";
import { useAppSelector } from "../../redux/store";
import { selectQRCodeContent } from "../../redux/addedSlice";
import { Image, View, Text, Modal } from "react-native";
import QRCode from "react-native-qrcode-svg";
// import QRCode from "react-native-qrcode";
import {
  AntDesign,
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
// import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { EvilIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";

interface Props {
  vendorName: string;
}

const CartQRCodeImage: FC<Props> = ({ vendorName }): JSX.Element => {
  const itemNumbers: string = useAppSelector<string>(
    selectQRCodeContent(vendorName)
  );

  const [showModal, setShowModal] = useState(false);

  const clickHandler = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  return (
    <>
      <QRCode value={itemNumbers} />
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
            <QRCode value={itemNumbers} size={250} />
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

export default memo(CartQRCodeImage);
