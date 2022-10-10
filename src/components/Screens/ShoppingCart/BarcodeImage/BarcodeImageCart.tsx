import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, memo, useCallback } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  ItemObjType,
  ShoppingCartStackParamList,
} from "../../../../../CustomTypes/types";
import {
  AI_CENTER,
  BARCODE_ASPECT_RATIO,
} from "../../../../shared/sharedStyles";

type Props = {
  itemObj: ItemObjType;
};

const BarcodeImageCart: FC<Props> = ({ itemObj }) => {
  const { src, name } = itemObj;

  const navigation =
    useNavigation<NativeStackNavigationProp<ShoppingCartStackParamList>>();

  const clickHandler = useCallback(() => {
    navigation.push("BarcodeImage", { src, name });
  }, [name, navigation, src]);

  return (
    <TouchableOpacity
      onPress={clickHandler}
      style={[AI_CENTER]}>
      <Image
        source={{ uri: src }}
        style={[styles.ImageStyle, BARCODE_ASPECT_RATIO]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ImageStyle: {
    width: 132,
  },
});

export default memo<Props>(BarcodeImageCart);
