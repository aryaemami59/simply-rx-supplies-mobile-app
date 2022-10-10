import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import {
  ItemObjType,
  ShoppingCartStackParamList,
  vendorNameType,
} from "../../../../../CustomTypes/types";
import { JC_SPACE_EVENLY } from "../../../../shared/sharedStyles";
import DetailsIconNode from "./DetailsIconNode";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
  reset: () => void;
};

const DetailsButton: FC<Props> = ({ itemObj, vendorName, reset }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ShoppingCartStackParamList>>();

  const clickHandler = useCallback(() => {
    reset();
    navigation.push("ItemDetails", { itemObj, vendorName });
  }, [itemObj, navigation, reset, vendorName]);

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
