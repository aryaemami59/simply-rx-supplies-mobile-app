import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback } from "react";
import type { TouchableWithoutFeedbackProps } from "react-native";

import useItemName from "../../../../hooks/useItemName";
import useVendorName from "../../../../hooks/useVendorName";
import { JC_SPACE_EVENLY } from "../../../../shared/styles/sharedStyles";
import type { ShoppingCartStackScreenProps } from "../../../../types/navigation";
import { itemDetails } from "../../../../types/navigation";
import DetailsIconNode from "./DetailsIconNode";

type Props = {
  reset: () => void;
};

const DetailsButton: FC<Props> = ({ reset }) => {
  const itemName = useItemName();
  const vendorName = useVendorName();
  const navigation =
    useNavigation<ShoppingCartStackScreenProps<"ItemDetails">["navigation"]>();

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
