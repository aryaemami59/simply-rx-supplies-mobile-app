import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback } from "react";
import type { TouchableWithoutFeedbackProps } from "react-native";
import useItemName from "../../../../shared/hooks/useItemName";
import useVendorName from "../../../../shared/hooks/useVendorName";
import { JC_SPACE_EVENLY } from "../../../../shared/styles/sharedStyles";
import type { ShoppingCartStackParamList } from "../../../../types/navigation";
import { itemDetails } from "../../../../types/navigation";
import DetailsIconNode from "./DetailsIconNode";

type Props = {
  reset: () => void;
};

const DetailsButton: FC<Props> = ({ reset }) => {
  const itemName = useItemName();
  const vendorName = useVendorName();
  const navigation =
    useNavigation<StackNavigationProp<ShoppingCartStackParamList>>();

  const clickHandler: NonNullable<TouchableWithoutFeedbackProps["onPress"]> =
    useCallback(() => {
      reset();
      navigation.push(itemDetails, { itemName, vendorName });
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
