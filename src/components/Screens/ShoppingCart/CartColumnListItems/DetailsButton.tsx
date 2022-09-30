import { Button } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import DetailsIconNode from "./DetailsIconNode";
import {
  ItemObjType,
  ShoppingCartStackParamList,
  vendorNameType,
} from "../../../../../CustomTypes/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { JC_SPACE_EVENLY } from "../../../../shared/sharedStyles";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const DetailsButton: FC<Props> = ({ itemObj, vendorName }): JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ShoppingCartStackParamList>>();

  const clickHandler = useCallback(() => {
    navigation.push("ItemDetails", { itemObj, vendorName });
  }, [itemObj, navigation, vendorName]);

  return (
    <>
      <Button
        onPress={clickHandler}
        icon={DetailsIconNode}
        size="lg"
        title="Details"
        color="primary"
        buttonStyle={[JC_SPACE_EVENLY]}
      />
    </>
  );
};

export default memo<Props>(DetailsButton);
