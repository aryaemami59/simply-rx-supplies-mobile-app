import { Octicons } from "@expo/vector-icons";
import { Text, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo, useRef } from "react";
import type {
  ScrollViewProps,
  ShareContent,
  StyleProp,
  ViewStyle,
} from "react-native";
import {
  Platform,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import type { QRCodeProps } from "react-native-qrcode-svg";
import QRCode from "react-native-qrcode-svg";
import type Svg from "react-native-svg/lib/typescript/elements/Svg";

import { useAppSelector } from "../../../../redux/hooks";
import {
  selectCartItemNames,
  selectCartItemNamesStringified,
} from "../../../../redux/selectors";
import {
  AI_CENTER,
  HEIGHT_100,
  JC_SPACE_AROUND,
  JC_SPACE_EVENLY,
  PADDING_TOP_20,
  TEXT_CENTER,
} from "../../../../shared/styles/sharedStyles";
import type { ShoppingCartStackScreenProps } from "../../../../types/navigation";
import type { OnPress } from "../../../../types/tsHelpers";

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

const contentContainerStyle: ScrollViewProps["contentContainerStyle"] = [
  JC_SPACE_EVENLY,
  AI_CENTER,
  styles.container,
];

type Props = ShoppingCartStackScreenProps<"QRImage">;

const QRImageScreen: FC<Props> = ({ navigation, route }) => {
  const { qrCodeText, cartId } = route.params;

  const svg = useRef<Svg>(null);

  const itemNames = useAppSelector(state => selectCartItemNames(state, cartId));

  const itemNamesStringified = useAppSelector(state =>
    selectCartItemNamesStringified(state, cartId)
  );

  const shareQR = useCallback<OnPress>(() => {
    svg.current?.toDataURL((data: string) => {
      const shareImageBase64: ShareContent = {
        title: "QRCode",
        message: `this is the QR code image for the following items: \n${itemNamesStringified}`,
        url: `data:image/png;base64,${data}`,
      };
      Share.share(shareImageBase64).catch(e => {
        console.log(e);
      });
    });
  }, [itemNamesStringified]);

  const getRef = useCallback<NonNullable<QRCodeProps["getRef"]>>((e: Svg) => {
    svg.current = e;
  }, []);

  const { background: backgroundColor } = useTheme().theme.colors;

  const style = useMemo<StyleProp<ViewStyle>>(
    () => [HEIGHT_100, JC_SPACE_AROUND, { backgroundColor }],
    [backgroundColor]
  );

  return (
    <View style={style}>
      <ScrollView contentContainerStyle={contentContainerStyle}>
        <TouchableOpacity onPress={shareQR}>
          <QRCode
            value={qrCodeText}
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
        {itemNames.map(itemName => (
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
