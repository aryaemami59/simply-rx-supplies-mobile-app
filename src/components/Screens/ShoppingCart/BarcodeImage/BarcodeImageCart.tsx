import { useNavigation } from "@react-navigation/native";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import type {
  ImageStyle,
  ImageURISource,
  StyleProp,
  TouchableWithoutFeedbackProps,
} from "react-native";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import useItemName from "../../../../hooks/useItemName";
import { useAppSelector } from "../../../../redux/hooks";
import { selectItemSrc } from "../../../../redux/selectors";
import {
  AI_CENTER,
  BARCODE_ASPECT_RATIO,
} from "../../../../shared/styles/sharedStyles";
import type { ShoppingCartStackScreenProps } from "../../../../types/navigation";
import { barcodeImage } from "../../../../types/navigation";

const styles = StyleSheet.create({
  ImageStyle: {
    width: 132,
  },
});

const style: StyleProp<ImageStyle> = [styles.ImageStyle, BARCODE_ASPECT_RATIO];

const BarcodeImageCart: FC = () => {
  const itemName = useItemName();
  const src = useAppSelector(selectItemSrc(itemName));

  const navigation =
    useNavigation<ShoppingCartStackScreenProps<"BarcodeImage">["navigation"]>();

  const clickHandler: NonNullable<TouchableWithoutFeedbackProps["onPress"]> =
    useCallback(() => {
      navigation.push(barcodeImage, { src, itemName });
    }, [itemName, navigation, src]);

  const source: ImageURISource = useMemo(() => ({ uri: src }), [src]);

  return (
    <TouchableOpacity
      onPress={clickHandler}
      style={AI_CENTER}>
      <Image
        source={source}
        style={style}
      />
    </TouchableOpacity>
  );
};

export default memo(BarcodeImageCart);
