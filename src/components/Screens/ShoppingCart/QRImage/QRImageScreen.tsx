import { FC, memo, useRef } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import QRCode from "react-native-qrcode-svg";
import { View, Platform, TouchableOpacity, StyleSheet } from "react-native";
import { Share } from "react-native";
import { Svg } from "react-native-svg";
import { Octicons } from "@expo/vector-icons";
import { height100, JC_AI_CENTER } from "../../../../shared/sharedStyles";
import { ShoppingCartStackParamList } from "../../../../../CustomTypes/types";

type Props = StackScreenProps<ShoppingCartStackParamList, "QRImage">;

const QRImageScreen: FC<Props> = ({ route }): JSX.Element => {
  const { itemNumbers } = route.params;

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

  return (
    <View style={styles.ContainerStyle}>
      <TouchableOpacity onLongPress={shareQR}>
        <QRCode value={itemNumbers} size={300} getRef={e => (svg = e)} />
      </TouchableOpacity>
      <TouchableOpacity onPress={shareQR}>
        <Octicons
          name={Platform.OS === "android" ? "share-android" : "share"}
          size={50}
          style={styles.IconStyle}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerStyle: {
    ...JC_AI_CENTER,
    ...height100,
    paddingHorizontal: 50,
  },
  IconStyle: {
    alignSelf: "flex-end",
    marginTop: 20,
  },
});

export default memo<Props>(QRImageScreen);
