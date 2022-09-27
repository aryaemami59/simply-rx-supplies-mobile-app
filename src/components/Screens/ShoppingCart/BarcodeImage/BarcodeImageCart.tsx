import { FC, memo, useCallback } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useAppSelector } from "../../../../redux/store";
import { useNavigation } from "@react-navigation/native";
import {
  ItemObjType,
  ShoppingCartStackParamList,
} from "../../../../../CustomTypes/types";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
  itemObj: ItemObjType;
};

const BarcodeImageCart: FC<Props> = ({ itemObj }): JSX.Element => {
  const itemBarcodeShown: boolean = useAppSelector<boolean>(
    (state): boolean => state.added.showItemBarcode
  );

  const { src, name } = itemObj;

  const navigation =
    useNavigation<StackNavigationProp<ShoppingCartStackParamList>>();

  const clickHandler = useCallback(() => {
    navigation.push("BarcodeImage", { src, name });
  }, []);

  return (
    <>
      {itemBarcodeShown ? (
        <TouchableOpacity onPress={clickHandler}>
          <Image
            source={{ uri: src }}
            style={styles.ImageStyle}
          />
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

export default memo(BarcodeImageCart);
