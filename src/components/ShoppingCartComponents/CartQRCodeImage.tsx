import { FC, memo, useCallback } from "react";
import { useAppSelector } from "../../redux/store";
import { selectQRCodeContent } from "../../redux/addedSlice";
import { TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  ShoppingCartStackParamList,
  vendorNameType,
} from "../../../CustomTypes/types";

type Props = {
  vendorName: vendorNameType;
};

const CartQRCodeImage: FC<Props> = ({ vendorName }): JSX.Element => {
  const itemNumbers: string = useAppSelector<string>(
    selectQRCodeContent(vendorName)
  );

  const navigation =
    useNavigation<StackNavigationProp<ShoppingCartStackParamList>>();

  const clickHandler = useCallback(() => {
    navigation.navigate("QRImage", { itemNumbers });
  }, []);

  return (
    <>
      <TouchableOpacity onPress={clickHandler}>
        <QRCode value={itemNumbers} />
      </TouchableOpacity>
    </>
  );
};

export default memo(CartQRCodeImage);
