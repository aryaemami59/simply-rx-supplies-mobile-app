import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback } from "react";

import useItemId from "../../../../hooks/useItemId";
import useVendorId from "../../../../hooks/useVendorId";
import { JC_SPACE_EVENLY } from "../../../../shared/styles/sharedStyles";
import type { ShoppingCartStackScreenProps } from "../../../../types/navigation";
import { itemDetails } from "../../../../types/navigation";
import type { OnPress } from "../../../../types/tsHelpers";
import DetailsIconNode from "./DetailsIconNode";

type Props = {
  reset: () => void;
};

const DetailsButton: FC<Props> = ({ reset }) => {
  const itemId = useItemId();
  const vendorId = useVendorId();
  const navigation =
    useNavigation<ShoppingCartStackScreenProps<"ItemDetails">["navigation"]>();

  const clickHandler = useCallback<OnPress>(() => {
    reset();
    navigation.push(itemDetails, { itemId, vendorId });
  }, [itemId, navigation, reset, vendorId]);

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
