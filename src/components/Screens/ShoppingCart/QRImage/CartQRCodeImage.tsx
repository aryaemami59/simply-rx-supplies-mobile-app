import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, memo, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import {
  ShoppingCartStackParamList,
  VendorNameType,
} from "../../../../../CustomTypes/types";
import { useAppSelector } from "../../../../redux/hooks";
import { shallowEqual } from "react-redux";
import {
  selectQRCodeContent,
  selectItemsAddedByVendor,
} from "../../../../redux/selectors";

type Props = {
  vendorName: VendorNameType;
};

const CartQRCodeImage: FC<Props> = ({ vendorName }) => {
  const itemNumbers = useAppSelector(selectQRCodeContent(vendorName));
  const itemsAdded = useAppSelector(
    selectItemsAddedByVendor(vendorName),
    shallowEqual
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<ShoppingCartStackParamList>>();

  const clickHandler = useCallback(() => {
    navigation.navigate("QRImage", { itemNumbers, itemsAdded, vendorName });
  }, [itemNumbers, itemsAdded, navigation, vendorName]);

  return (
    <TouchableOpacity onPress={clickHandler}>
      <QRCode value={itemNumbers} />
    </TouchableOpacity>
  );
};

export default memo<Props>(CartQRCodeImage);
