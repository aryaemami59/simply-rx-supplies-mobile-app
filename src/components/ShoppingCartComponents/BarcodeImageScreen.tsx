import { FC, memo } from "react";
import {
  Image,
  View,
  Platform,
  Share,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ShoppingCartStackParamList } from "../../../CustomTypes/types";
import { height100, JC_AI_CENTER } from "../../shared/sharedStyles";
import { Octicons } from "@expo/vector-icons";

type Props = StackScreenProps<ShoppingCartStackParamList, "BarcodeImage">;

const BarcodeImageScreen: FC<Props> = ({ route }): JSX.Element => {
  const { src } = route.params;

  const shareBarcode = () => {
    Share.share({
      title: "Barcode Image",
      message: "This is the barcode image",
      url: src,
    });
  };

  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity onLongPress={shareBarcode}>
        <Image source={{ uri: src }} style={styles.imageStyle} />
      </TouchableOpacity>
      <TouchableOpacity onPress={shareBarcode}>
        <Octicons
          name={Platform.OS === "android" ? "share-android" : "share"}
          size={50}
          style={styles.iconStyle}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    ...JC_AI_CENTER,
    ...height100,
    paddingHorizontal: 40,
  },
  imageStyle: {
    aspectRatio: 33 / 28,
    width: "90%",
  },
  iconStyle: {
    alignSelf: "flex-end",
    marginTop: 20,
    marginEnd: 15,
  },
});

export default memo<Props>(BarcodeImageScreen);
