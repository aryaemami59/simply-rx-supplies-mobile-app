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
import {
  selectQRCodeContent,
  selectItemsAddedByVendor,
} from "../../../../redux/selectors";

type Props = {
  vendorName: VendorNameType;
};

const CartQRCodeImage: FC<Props> = ({ vendorName }) => {
  const itemNumbers = useAppSelector(selectQRCodeContent(vendorName));
  const itemsAdded = useAppSelector(selectItemsAddedByVendor(vendorName));

  const navigation =
    useNavigation<NativeStackNavigationProp<ShoppingCartStackParamList>>();

  const clickHandler = useCallback(() => {
    navigation.navigate("QRImage", { itemNumbers, itemsAdded });
  }, [itemNumbers, itemsAdded, navigation]);

  return (
    <TouchableOpacity onPress={clickHandler}>
      <QRCode value={itemNumbers} />
    </TouchableOpacity>
  );
};

export default memo<Props>(CartQRCodeImage);
