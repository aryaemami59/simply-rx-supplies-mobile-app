import { FC, memo, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  vendorNameType,
  ShoppingCartStackParamList,
} from "../../../../../CustomTypes/types";
import { useAppSelector } from "../../../../redux/store";
import { selectQRCodeContent } from "../../../../redux/addedSlice";

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

export default memo<Props>(CartQRCodeImage);
