import { useNavigation } from "@react-navigation/native";
import type { FC } from "react";
import { memo, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { useAppSelector } from "../../../../redux/hooks";
import { selectQRCodeText } from "../../../../redux/selectors";
import type { ShoppingCartStackScreenProps } from "../../../../types/navigation";
import { qrImage } from "../../../../types/navigation";
import type { OnPress } from "../../../../types/tsHelpers";

type Props = {
  cartId: number;
};

const CartQRCodeImage: FC<Props> = ({ cartId }) => {
  const qrCodeText = useAppSelector(state => selectQRCodeText(state, cartId));

  const navigation =
    useNavigation<ShoppingCartStackScreenProps<"QRImage">["navigation"]>();

  const clickHandler = useCallback<OnPress>(() => {
    navigation.navigate(qrImage, { qrCodeText, cartId });
  }, [navigation, qrCodeText, cartId]);

  return (
    <TouchableOpacity onPress={clickHandler}>
      <QRCode value={qrCodeText} />
    </TouchableOpacity>
  );
};

export default memo<Props>(CartQRCodeImage);
