import { FC, memo, useMemo } from "react";
import { Image, StyleSheet } from "react-native";
import { ItemObjType } from "../../../../../CustomTypes/types";

type Props = {
  itemObj: ItemObjType;
};

const BarcodeImageSearchResults: FC<Props> = ({ itemObj }): JSX.Element => {
  const source = useMemo(
    () => ({
      uri: itemObj.src,
    }),
    [itemObj.src]
  );

  return <Image source={source} style={styles.ImageStyle} />;
};

const styles = StyleSheet.create({
  ImageStyle: {
    width: 132,
    aspectRatio: 33 / 28,
  },
});

export default memo<Props>(BarcodeImageSearchResults);
