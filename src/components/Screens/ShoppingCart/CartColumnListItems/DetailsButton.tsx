import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { ShoppingCartStackParamList } from "../../../../../custom_types/navigation";
import useItemName from "../../../../shared/hooks/useItemName";
import useVendorName from "../../../../shared/hooks/useVendorName";
import { JC_SPACE_EVENLY } from "../../../../shared/styles/sharedStyles";
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
