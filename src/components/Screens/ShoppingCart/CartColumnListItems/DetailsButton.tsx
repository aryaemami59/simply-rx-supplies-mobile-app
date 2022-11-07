import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { ShoppingCartStackParamList } from "../../../../../CustomTypes/navigation";
import useItemName from "../../../../shared/customHooks/useItemName";
import useVendorName from "../../../../shared/customHooks/useVendorName";
import { JC_SPACE_EVENLY } from "../../../../shared/sharedStyles";
import DetailsIconNode from "./DetailsIconNode";

type Props = {
  reset: () => void;
};

const DetailsButton: FC<Props> = ({ reset }) => {
  const itemName = useItemName();
  const vendorName = useVendorName();
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
      buttonStyle={JC_SPACE_EVENLY}
    />
  );
};

export default memo<Props>(DetailsButton);
