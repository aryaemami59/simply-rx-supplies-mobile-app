import { Octicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, useTheme } from "@rneui/themed";
import { FC, memo, useCallback, useRef } from "react";
import {
  Platform,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import QRCode from "react-native-qrcode-svg";
import { ShoppingCartStackParamList } from "../../../../../CustomTypes/types";
import Svg from "../../../../../node_modules/react-native-svg/lib/typescript/elements/Svg";
import {
  AI_CENTER,
  HEIGHT_100,
  JC_SPACE_AROUND,
  JC_SPACE_EVENLY,
  PADDING_TOP_20,
  TEXT_CENTER,
} from "../../../../shared/sharedStyles";

const iconName = Platform.OS === "android" ? "share-android" : "share";

type Props = NativeStackScreenProps<ShoppingCartStackParamList, "QRImage">;

const QRImageScreen: FC<Props> = ({ navigation, route }) => {
  const { itemNumbers, itemsAdded, vendorName } = route.params;

  const svg = useRef<Svg>(null!);

  const shareQR = useCallback(() => {
    svg.current.toDataURL((data: string) => {
      const shareImageBase64 = {
        title: "QRCode",
        message: "this is the QR code image",
        url: `data:image/png;base64,${data}`,
      };
      Share.share(shareImageBase64);
    });
  }, []);

  const { theme } = useTheme();
  const { background } = theme.colors;

  return (
    <View
      style={[HEIGHT_100, JC_SPACE_AROUND, { backgroundColor: background }]}>
      <ScrollView
        contentContainerStyle={[JC_SPACE_EVENLY, AI_CENTER, styles.container]}>
        <TouchableOpacity onPress={shareQR}>
          {/* <Image source={{}} /> */}
          <QRCode
            value={itemNumbers}
            size={300}
            getRef={e => {
              svg.current = e;
            }}
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
        <Text
          style={PADDING_TOP_20}
          h4>
          Items Included:
        </Text>
        {itemsAdded.map(itemName => (
          <Text
            key={itemName}
            style={TEXT_CENTER}>
            {itemName}
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
