import { FC, memo } from "react";
// import QRCode from "qrcode";
import { useAppSelector } from "../redux/store";
import { selectQRCodeContent } from "../redux/addedSlice";
import { Image, View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
// import QRCode from "react-native-qrcode";

interface Props {
  vendorName: string;
}

const CartQRCodeImage: FC<Props> = ({ vendorName }): JSX.Element => {
  const itemNumbers: string = useAppSelector<string>(
    selectQRCodeContent(vendorName)
  );

  return <QRCode value={itemNumbers} />;
};

export default memo(CartQRCodeImage);
