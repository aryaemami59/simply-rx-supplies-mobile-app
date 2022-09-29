import { FC, memo, useCallback } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useAppSelector } from "../../../../redux/hooks";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ItemObjType,
  ShoppingCartStackParamList,
} from "../../../../../CustomTypes/types";

type Props = {
  itemObj: ItemObjType;
};

const BarcodeImageCart: FC<Props> = ({ itemObj }): JSX.Element => {
  const itemBarcodeShown: boolean = useAppSelector<boolean>(
    (state): boolean => state.added.showItemBarcode
  );

  const { src, name } = itemObj;

  const navigation =
    useNavigation<NativeStackNavigationProp<ShoppingCartStackParamList>>();

  const clickHandler = useCallback(() => {
    navigation.push("BarcodeImage", { src, name });
  }, [name, navigation, src]);

  return (
    <>
      {itemBarcodeShown ? (
        <TouchableOpacity onPress={clickHandler}>
          <Image source={{ uri: src }} style={styles.ImageStyle} />
        </TouchableOpacity>
      ) : (
        ""
      )}
    </>
  );
};

const styles = StyleSheet.create({
  ImageStyle: {
    width: 132,
    aspectRatio: 33 / 28,
  },
});

export default memo<Props>(BarcodeImageCart);
