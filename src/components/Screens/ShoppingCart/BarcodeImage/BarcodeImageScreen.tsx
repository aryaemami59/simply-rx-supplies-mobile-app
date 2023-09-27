import { Octicons } from "@expo/vector-icons";
import { useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useEffect, useMemo } from "react";
import type {
  ImageStyle,
  ImageURISource,
  ShareContent,
  StyleProp,
  ViewStyle,
} from "react-native";
import {
  Image,
  Platform,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { useAppSelector } from "../../../../redux/hooks";
import { selectItemName } from "../../../../redux/selectors";
import {
  BARCODE_ASPECT_RATIO,
  JC_AI_CENTER_HEIGHT100,
  WIDTH_90,
} from "../../../../shared/styles/sharedStyles";
import type { ShoppingCartStackScreenProps } from "../../../../types/navigation";
import type { OnPress } from "../../../../types/tsHelpers";

const iconName = Platform.OS === "android" ? "share-android" : "share";

type Props = ShoppingCartStackScreenProps<"BarcodeImage">;

const style: StyleProp<ImageStyle> = [BARCODE_ASPECT_RATIO, WIDTH_90];

const shareFunc = async (content: ShareContent) => {
  try {
    const response = await Share.share(content);
    return response;
  } catch (err) {
    if (err instanceof Error) return err.message;
    console.log("Unexpected Error", err);
  }
  return null;
};

const BarcodeImageScreen: FC<Props> = ({ navigation, route }) => {
  const { background: backgroundColor } = useTheme().theme.colors;
  const { src, itemId } = route.params;
  const itemName = useAppSelector(state => selectItemName(state, itemId));

  const options = useMemo<
    NonNullable<Parameters<typeof navigation.setOptions>[0]>
  >(
    () => ({
      title: itemName,
    }),
    [itemName]
  );

  const shareContent = useMemo<ShareContent>(
    () => ({
      title: `Barcode Image for ${itemName}`,
      message: `This is the barcode image for ${itemName}`,
      url: src,
    }),
    [itemName, src]
  );

  const imageSource = useMemo<ImageURISource>(
    () => ({
      uri: src,
    }),
    [src]
  );

  const shareBarcode = useCallback<OnPress>(() => {
    shareFunc(shareContent);
    // try {
    //   const response: ShareAction = await Share.share(shareContent);
    //   console.log(response);
    //   // return response;
    // } catch (err) {
    //   if (err instanceof Error) {
    //     return err.message;
    //   }
    //   console.log("Unexpected Error", err);
    // }
    // return null;

    // (async () => {
    //   try {
    //     const response: ShareAction = await Share.share(shareContent);
    //     return response;
    //   } catch (err) {
    //     if (err instanceof Error) {
    //       return err.message;
    //     }
    //     console.log("Unexpected Error", err);
    //   }
    //   return null;
    // })();
    // Share.share(shareContent)
    //   .then(e => console.log(e))
    //   .catch(e => console.log(e));
  }, [shareContent]);

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);

  const viewStyle = useMemo<StyleProp<ViewStyle>>(
    () => [JC_AI_CENTER_HEIGHT100, styles.container, { backgroundColor }],
    [backgroundColor]
  );

  return (
    <View style={viewStyle}>
      <TouchableOpacity onLongPress={shareBarcode}>
        <Image
          source={imageSource}
          style={style}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={shareBarcode}>
        <Octicons
          name={iconName}
          size={50}
          style={styles.icon}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
  },
  icon: {
    alignSelf: "flex-end",
    marginEnd: 15,
    marginTop: 20,
  },
});

export default memo<Props>(BarcodeImageScreen);
