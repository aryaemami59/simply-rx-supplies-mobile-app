import { FC, memo } from "react";
import { Image } from "react-native";
import { ItemObjType } from "../../../CustomTypes/types";

interface Props {
  itemObj: ItemObjType;
}

const BarcodeImageSearchResults: FC<Props> = ({ itemObj }): JSX.Element => {
  return (
    <Image
      source={{ uri: itemObj.src }}
      style={{ width: 132, aspectRatio: 33 / 28 }}
    />
  );
};

export default memo(BarcodeImageSearchResults);
