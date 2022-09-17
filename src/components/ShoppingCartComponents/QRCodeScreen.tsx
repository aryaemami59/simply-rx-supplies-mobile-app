import { FC, memo } from "react";
import { StackScreenProps } from "@react-navigation/stack";
// import { VendorItemsStackParamList, ShoppingCartStackParamList } from '../../../CustomTypes/types';
import QRCode from "react-native-qrcode-svg";
import { useAppSelector } from "../../redux/store";
import { selectQRCodeContent } from "../../redux/addedSlice";
import { ShoppingCartStackParamList } from "../../../CustomTypes/types";
import { View } from "react-native";
import { JC_AI_CENTER, height100 } from "../../shared/sharedStyles";

type Props = StackScreenProps<ShoppingCartStackParamList, "QRImage">;
// type Props = StackScreenProps<VendorItemsStackParamList, "QRImage">;

const QRCodeScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  const { itemNumbers } = route.params;
  return (
    <View style={{ ...JC_AI_CENTER, paddingTop: 80 }}>
      <QRCode value={itemNumbers} size={300} />
    </View>
  );
};

export default memo<Props>(QRCodeScreen);
