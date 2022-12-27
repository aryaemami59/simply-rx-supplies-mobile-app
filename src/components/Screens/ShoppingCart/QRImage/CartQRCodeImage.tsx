import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import { memo, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../../../redux/hooks";
import {
  selectItemsAddedByVendor,
  selectQRCodeContent,
} from "../../../../redux/selectors";
import type { VendorNameType } from "../../../../types/api";
import type { OnPress } from "../../../../types/missingTypes";
import type { ShoppingCartStackParamList } from "../../../../types/navigation";
import { qrImage } from "../../../../types/navigation";

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
    useNavigation<StackNavigationProp<ShoppingCartStackParamList>>();

  const clickHandler: OnPress = useCallback(() => {
    navigation.navigate(qrImage, { itemNumbers, itemsAdded });
  }, [itemNumbers, itemsAdded, navigation]);

  return (
    <TouchableOpacity onPress={clickHandler}>
      <QRCode value={itemNumbers} />
    </TouchableOpacity>
  );
};

export default memo<Props>(CartQRCodeImage);
