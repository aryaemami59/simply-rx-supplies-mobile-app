import { useNavigation } from "@react-navigation/native";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import type { ImageStyle, ImageURISource, StyleProp } from "react-native";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import useItemId from "../../../../hooks/useItemId";
import { useAppSelector } from "../../../../redux/hooks";
import { selectItemSrc } from "../../../../redux/selectors";
import {
  AI_CENTER,
  BARCODE_ASPECT_RATIO,
} from "../../../../shared/styles/sharedStyles";
import type { ShoppingCartStackScreenProps } from "../../../../types/navigation";
import { barcodeImage } from "../../../../types/navigation";
import type { OnPress } from "../../../../types/tsHelpers";

const styles = StyleSheet.create({
  ImageStyle: {
    width: 132,
  },
});

const style: StyleProp<ImageStyle> = [styles.ImageStyle, BARCODE_ASPECT_RATIO];

const BarcodeImageCart: FC = () => {
  const itemId = useItemId();
  const src = useAppSelector(state => selectItemSrc(state, itemId));

  const navigation =
    useNavigation<ShoppingCartStackScreenProps<"BarcodeImage">["navigation"]>();

  const clickHandler = useCallback<OnPress>(() => {
    navigation.push(barcodeImage, { src, itemId });
  }, [itemId, navigation, src]);

  const source = useMemo<ImageURISource>(() => ({ uri: src }), [src]);

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
