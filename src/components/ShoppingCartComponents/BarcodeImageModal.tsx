import { FC, memo, useCallback, useState } from "react";
import { MaterialCommunityIcons, EvilIcons } from "@expo/vector-icons";
import { Modal, View, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { ItemObjType } from "../../../CustomTypes/types";

interface Props {
  itemObj: ItemObjType;
}

const BarcodeImageModal: FC<Props> = ({ itemObj }): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const clickHandler = useCallback((): void => {
    setShowModal((prev: boolean) => !prev);
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
        <SafeAreaView style={styles.safeAreaViewStyle}>
          <View>
            <Image source={{ uri: itemObj.src }} style={styles.ImageStyle} />
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
  ImageStyle: {
    width: 264,
    aspectRatio: 33 / 28,
  },
  safeAreaViewStyle: {
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

export default memo(BarcodeImageModal);
