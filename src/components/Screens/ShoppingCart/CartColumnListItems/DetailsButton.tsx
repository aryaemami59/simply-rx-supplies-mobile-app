import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import {
  ShoppingCartStackParamList,
  VendorAndItemName,
} from "../../../../../CustomTypes/types";
import { JC_SPACE_EVENLY } from "../../../../shared/sharedStyles";
import DetailsIconNode from "./DetailsIconNode";

type Props = VendorAndItemName & {
  reset: () => void;
};

const DetailsButton: FC<Props> = ({ itemName, vendorName, reset }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ShoppingCartStackParamList>>();

  const clickHandler = useCallback(() => {
    reset();
    navigation.push("ItemDetails", { itemName, vendorName });
  }, [itemName, navigation, reset, vendorName]);

  return (
    <Button
      onPress={clickHandler}
      icon={DetailsIconNode}
      size="md"
      title="Details"
      color="primary"
      buttonStyle={[JC_SPACE_EVENLY]}
    />
  );
};

export default memo<Props>(DetailsButton);
