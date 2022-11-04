import { Octicons } from "@expo/vector-icons";
import { Text, useTheme } from "@rneui/themed";
import { FC, memo, useCallback, useMemo, useRef } from "react";
import {
  Platform,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import QRCode from "react-native-qrcode-svg";
import { QRImageScreenProps } from "../../../../../CustomTypes/navigation";
import Svg from "../../../../../node_modules/react-native-svg/lib/typescript/elements/Svg";
import {
  AI_CENTER,
  HEIGHT_100,
  JC_SPACE_AROUND,
  JC_SPACE_EVENLY,
  PADDING_TOP_20,
  TEXT_CENTER,
} from "../../../../shared/sharedStyles";

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

const iconName = Platform.OS === "android" ? "share-android" : "share";

const contentContainerStyle = [JC_SPACE_EVENLY, AI_CENTER, styles.container];

type Props = QRImageScreenProps;

const QRImageScreen: FC<Props> = ({ navigation, route }) => {
  const { itemNumbers, itemsAdded } = route.params;

  const svg = useRef<Svg>(null!);

  const shareQR = useCallback(() => {
    // @ts-ignore
    svg.current.toDataURL((data: string) => {
      const shareImageBase64 = {
        title: "QRCode",
        message: `this is the QR code image for the following items: \n${itemsAdded.join(
          ", "
        )}`,
        url: `data:image/png;base64,${data}`,
      };
      Share.share(shareImageBase64);
    });
  }, [itemsAdded]);

  const getRef = useCallback((e: Svg) => (svg.current = e), []);

  const { background } = useTheme().theme.colors;

  const style = useMemo(
    () => [HEIGHT_100, JC_SPACE_AROUND, { backgroundColor: background }],
    [background]
  );

  return (
    <View style={style}>
      <ScrollView contentContainerStyle={contentContainerStyle}>
        <TouchableOpacity onPress={shareQR}>
          <QRCode
            value={itemNumbers}
            size={300}
            getRef={getRef}
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

export default memo<Props>(QRImageScreen);
