import { FC, memo, useCallback, useState } from "react";
import { MaterialCommunityIcons, EvilIcons } from "@expo/vector-icons";
import { Modal, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import QRCode from "react-native-qrcode-svg";

type Props = {
  itemNumbers: string;
};

const QRCodeModal: FC<Props> = ({ itemNumbers }): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const clickHandler = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);
  return (
    <>
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
        <SafeAreaView style={styles.SafeAreaViewStyle}>
          <View>
            <QRCode value={itemNumbers} size={250} />
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
      </Modal>
    </>
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
  closeIconViewStyle: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});

export default memo<Props>(QRCodeModal);
