import { FC, memo } from "react";
import { itemInterface } from "../../redux/addedSlice";
import { Image, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import BarcodeImageModal from "./BarcodeImageModal";
import { useAppSelector } from "../../redux/store";

interface Props {
  itemObj: itemInterface;
}

const BarcodeImageCart: FC<Props> = ({ itemObj }): JSX.Element => {
  const itemBarcodeShown: boolean = useAppSelector<boolean>(
    (state): boolean => state.added.showItemBarcode
  );

  return (
    <>
      {itemBarcodeShown ? (
        <>
          <Image source={{ uri: itemObj.src }} style={styles.ImageStyle} />
          <BarcodeImageModal itemObj={itemObj} />
        </>
      ) : (
        ""
      )}
    </>
  );
};

{
  /* <Feather name="printer" size={30} color="black" /> */
}
const styles = StyleSheet.create({
  ImageStyle: {
    width: 132,
    aspectRatio: 33 / 28,
  },
});

export default memo(BarcodeImageCart);
