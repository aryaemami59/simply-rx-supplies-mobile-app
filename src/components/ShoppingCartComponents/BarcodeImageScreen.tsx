import { FC, memo } from "react";
import {
  Image,
  View,
  Platform,
  Share,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ShoppingCartStackParamList } from "../../../CustomTypes/types";
import { height100, JC_AI_CENTER } from "../../shared/sharedStyles";
import { Octicons } from "@expo/vector-icons";

type Props = StackScreenProps<ShoppingCartStackParamList, "BarcodeImage">;

const BarcodeImageScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  const { src } = route.params;

  const shareBarcode = () => {
    // const shareImage = {
    //   title:
    // };
    // svg.toDataURL((data: string) => {
    //   const shareImageBase64 = {
    //     title: "QR",
    //     message: "Ehi, this is my QR code",
    //     url: `data:image/png;base64,${data}`,
    //   };
    Share.share({
      title: "Barcode Image",
      message: "This is the barcode image",
      url: src,
    });
  };

  return (
    <View style={{ ...JC_AI_CENTER, ...height100, paddingHorizontal: 40 }}>
      <TouchableOpacity onLongPress={shareBarcode}>
        <Image
          source={{ uri: src }}
          style={{ aspectRatio: 33 / 28, width: "90%" }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={shareBarcode}>
        <Octicons
          name={Platform.OS === "android" ? "share-android" : "share"}
          size={50}
          style={{ alignSelf: "flex-end", marginTop: 20, marginEnd: 15 }}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
};

export default memo<Props>(BarcodeImageScreen);
