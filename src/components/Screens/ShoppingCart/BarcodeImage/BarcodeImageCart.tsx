import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useAppSelector } from "../../../../redux/hooks";
import { selectItemSrc } from "../../../../redux/selectors";
import useItemName from "../../../../shared/hooks/useItemName";
import {
  AI_CENTER,
  BARCODE_ASPECT_RATIO,
} from "../../../../shared/styles/sharedStyles";
import type { ShoppingCartStackParamList } from "../../../../types/navigation";

const styles = StyleSheet.create({
  ImageStyle: {
    width: 132,
  },
});

const style = [styles.ImageStyle, BARCODE_ASPECT_RATIO];

const BarcodeImageCart: FC = () => {
  const itemName = useItemName();
  const src = useAppSelector(selectItemSrc(itemName));

  const navigation =
    useNavigation<NativeStackNavigationProp<ShoppingCartStackParamList>>();

  const clickHandler = useCallback(() => {
    navigation.push("BarcodeImage", { src, itemName });
  }, [itemName, navigation, src]);

  const source = useMemo(() => ({ uri: src }), [src]);

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
