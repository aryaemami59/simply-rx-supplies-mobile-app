import { FC, memo, useRef, useCallback } from "react";
import QRCode from "react-native-qrcode-svg";
import { View, Platform, TouchableOpacity, StyleSheet } from "react-native";
import { Share } from "react-native";
import { Svg } from "react-native-svg";
import { Octicons } from "@expo/vector-icons";
import {
  JC_AI_CENTER_HEIGHT100,
  HEIGHT_100,
  JC_CENTER,
} from "../../../../shared/sharedStyles";
import { ShoppingCartStackParamList } from "../../../../../CustomTypes/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, useTheme } from "@rneui/themed";
import { JC_SPACE_AROUND, TEXT_CENTER } from "../../../../shared/sharedStyles";
import { ScrollView } from "react-native-gesture-handler";
import {
  AI_CENTER,
  JC_SPACE_BETWEEN,
  JC_SPACE_EVENLY,
} from "../../../../shared/sharedStyles";
// import QRCode from "react-native-qrcode-generator";

const iconName = Platform.OS === "android" ? "share-android" : "share";

type Props = NativeStackScreenProps<ShoppingCartStackParamList, "QRImage">;

const QRImageScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  const { itemNumbers, itemsAdded } = route.params;

  let svg = useRef(null) as unknown as Svg;
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

  // const getRef = useCallback(e => (svg = e), []);

  const { theme } = useTheme();

  return (
    <View
      style={[
        HEIGHT_100,
        JC_SPACE_AROUND,
        { backgroundColor: theme.colors.background },
      ]}>
      <ScrollView
        contentContainerStyle={[JC_SPACE_EVENLY, AI_CENTER, styles.container]}>
        <TouchableOpacity onPress={shareQR}>
          {/* <QRCode value={itemNumbers} /> */}
          <QRCode
            value={itemNumbers}
            size={300}
            getRef={e => (svg = e)}
            // getRef={getRef}
            // ref={svg}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={shareQR}>
          <Octicons
            name={iconName}
            size={50}
            style={styles.icon}
            color="gray"
          />
        </TouchableOpacity>
        <Text h4>Items Included:</Text>
        {itemsAdded.map(itemObj => (
          <Text key={itemObj.id} style={[TEXT_CENTER]}>
            {itemObj.name}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  icon: {
    alignSelf: "flex-end",
    marginTop: 20,
  },
});

export default memo<Props>(QRImageScreen);
