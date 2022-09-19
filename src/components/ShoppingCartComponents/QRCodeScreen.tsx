import { FC, memo, useEffect, useRef, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import qrcode from "qrcode";
import QRCode from "react-native-qrcode-svg";
import { ShoppingCartStackParamList } from "../../../CustomTypes/types";
import { View, Platform, Pressable, TouchableOpacity } from "react-native";
import { Share } from "react-native";
import { JC_AI_CENTER, height100 } from "../../shared/sharedStyles";
// import Share from "react-native-share";
import * as Sharing from "expo-sharing";
import { Svg } from "react-native-svg";
import { Octicons } from "@expo/vector-icons";
import * as ImageManipulator from "expo-image-manipulator";

// import { ToastAndroid } from "react-native";
// import CameraRoll from "@react-native-community/cameraroll";
// import RNFS from "react-native-fs";

type Props = StackScreenProps<ShoppingCartStackParamList, "QRImage">;

const QRCodeScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  const { itemNumbers } = route.params;
  // const [image, setImage] = useState("");
  // const processImage = async (imgUri: string) => {
  //   const processedImage = await ImageManipulator.manipulateAsync(
  //     imgUri,
  //     [{ resize: { width: 400 } }],
  //     { format: ImageManipulator.SaveFormat.PNG }
  //   );
  //   console.log(processedImage);
  //   setImage(processedImage.uri);
  // };

  let svg = useRef<Svg>(null);
  const shareQR = () => {
    svg.toDataURL((data: string) => {
      const shareImageBase64 = {
        title: "QRCode",
        message: "this is the QR code image",
        url: `data:image/png;base64,${data}`,
      };
      Share.share(shareImageBase64);
    });
  };

  console.log(svg.current);

  // useEffect(() => {
  //   processImage(svg.toDataURL((e: string) => `data:image/png;base64,${e}`));
  // }, [itemNumbers]);

  return (
    <View style={{ ...JC_AI_CENTER, ...height100, paddingHorizontal: 50 }}>
      <TouchableOpacity onLongPress={shareQR}>
        <QRCode
          value={itemNumbers}
          size={300}
          getRef={e => {
            console.log(e);
            svg = e;
          }}
          // getRef={e => (svg = e)}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={shareQR}>
        <Octicons
          name={Platform.OS === "android" ? "share-android" : "share"}
          size={50}
          style={{ alignSelf: "flex-end", marginTop: 20 }}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
};

export default memo<Props>(QRCodeScreen);
