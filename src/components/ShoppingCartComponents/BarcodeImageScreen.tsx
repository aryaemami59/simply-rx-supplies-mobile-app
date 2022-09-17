import { FC, memo } from "react";
import { Image, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ShoppingCartStackParamList } from "../../../CustomTypes/types";
import { JC_AI_CENTER } from "../../shared/sharedStyles";

type Props = StackScreenProps<ShoppingCartStackParamList, "BarcodeImage">;

const BarcodeImageScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  const { src } = route.params;

  return (
    <View style={JC_AI_CENTER}>
      <Image
        source={{ uri: src }}
        style={{ aspectRatio: 33 / 28, width: "90%" }}
      />
    </View>
  );
};

export default memo<Props>(BarcodeImageScreen);
