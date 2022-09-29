import { FC, memo, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useNavigation } from "@react-navigation/native";
import {
  vendorNameType,
  ShoppingCartStackParamList,
} from "../../../../../CustomTypes/types";
import { useAppSelector } from "../../../../redux/hooks";
import { selectQRCodeContent } from "../../../../redux/addedSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  vendorName: vendorNameType;
};

const CartQRCodeImage: FC<Props> = ({ vendorName }): JSX.Element => {
  const itemNumbers = useAppSelector(selectQRCodeContent(vendorName));

  const navigation =
    useNavigation<NativeStackNavigationProp<ShoppingCartStackParamList>>();

  const clickHandler = useCallback(() => {
    navigation.navigate("QRImage", { itemNumbers });
  }, [itemNumbers, navigation]);

  return (
    <>
      <TouchableOpacity onPress={clickHandler}>
        <QRCode value={itemNumbers} />
      </TouchableOpacity>
    </>
  );
};

export default memo<Props>(CartQRCodeImage);
