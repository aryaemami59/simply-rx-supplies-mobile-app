import { FC, memo, useCallback, useState } from "react";
import { useAppSelector } from "../../redux/store";
import {
  selectQRCodeContent,
  selectVendorsLinks,
  vendorNameType,
} from "../../redux/addedSlice";
import { Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Feather } from "@expo/vector-icons";
import { ButtonGroup, Dialog } from "@rneui/themed";
import { shareAsync } from "expo-sharing";
import { Linking } from "react-native";
import { selectVendorOfficialName } from "../../redux/addedSlice";
import HideItemName from "./HideItemName";
import HideItemNumber from "./HideItemNumber";
import HideItemBarcode from "./HideItemBarcode";
import QRCodeModal from "./QRCodeModal";
import { mainColor } from "../../shared/sharedStyles";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";
import { ShoppingCartStackParamList } from "../../../CustomTypes/types";
// import { VendorItemsStackParamList } from "../../../CustomTypes/types";

// type Props = StackScreenProps<VendorItemsStackParamList, "QRImage">;

type Props = {
  vendorName: vendorNameType;
};

const CartQRCodeImage: FC<Props> = ({ vendorName }): JSX.Element => {
  // const { vendorName } = route.params;
  const itemNumbers: string = useAppSelector<string>(
    selectQRCodeContent(vendorName)
  );

  const navigation =
    useNavigation<StackNavigationProp<ShoppingCartStackParamList>>();
  // const navigation =
  //   useNavigation<StackNavigationProp<VendorItemsStackParamList>>();

  const clickHandler = useCallback(() => {
    navigation.navigate("QRImage", { itemNumbers });
  }, []);

  return (
    <>
      <TouchableOpacity onPress={clickHandler}>
        <QRCode value={itemNumbers} />
      </TouchableOpacity>
      {/* <Text onPress={openLink}>{officialVendorName} Website</Text>
      <HideItemName />
      <HideItemNumber />
      <HideItemBarcode /> */}
    </>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: mainColor,
    width: "100%",
  },
});

export default memo(CartQRCodeImage);
