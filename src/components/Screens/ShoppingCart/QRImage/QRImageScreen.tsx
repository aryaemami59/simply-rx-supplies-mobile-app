import { FC, memo, useRef, useCallback } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import QRCode from "react-native-qrcode-svg";
import { View, Platform, TouchableOpacity, StyleSheet } from "react-native";
import { Share } from "react-native";
import { Svg } from "react-native-svg";
import { Octicons } from "@expo/vector-icons";
import { JC_AI_CENTER_HEIGHT100 } from "../../../../shared/sharedStyles";
import { ShoppingCartStackParamList } from "../../../../../CustomTypes/types";

const iconName = Platform.OS === "android" ? "share-android" : "share";

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

  const getRef = useCallback(e => (svg = e), []);

  return (
    <View style={[JC_AI_CENTER_HEIGHT100, styles.container]}>
      <TouchableOpacity onLongPress={shareQR}>
        <QRCode value={itemNumbers} size={300} getRef={getRef} />
      </TouchableOpacity>
      <TouchableOpacity onPress={shareQR}>
        <Octicons name={iconName} size={50} style={styles.icon} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
  },
  icon: {
    alignSelf: "flex-end",
    marginTop: 20,
  },
});

export default memo<Props>(QRImageScreen);
