import { ListItem } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback } from "react";
import type { PressableProps } from "react-native";

import useItemId from "../../../../hooks/useItemId";
import useOfficialVendorName from "../../../../hooks/useOfficialVendorName";
import useVendorId from "../../../../hooks/useVendorId";
import { toggleVendorForOneSearchResultItem } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { checkIfAddedToVendor } from "../../../../redux/selectors";

const ItemsByCategorySingleListItemCheckBox: FC = () => {
  const vendorId = useVendorId();
  const itemId = useItemId();
  const dispatch = useAppDispatch();
  const officialVendorName = useOfficialVendorName(vendorId);
  const ifAddedToVendor = useAppSelector(state =>
    checkIfAddedToVendor(state, vendorId, itemId)
  );
  // const checked = useAppSelector(checkVendorsToAdd(vendorName, itemName));

  const onToggleSwitch = useCallback<
    NonNullable<PressableProps["onPress"]>
  >(() => {
    if (!ifAddedToVendor) {
      dispatch(toggleVendorForOneSearchResultItem({ itemId, vendorId }));
    }
  }, [dispatch, ifAddedToVendor, itemId, vendorId]);

  return (
    <ListItem.CheckBox
      title={officialVendorName}
      checked={!ifAddedToVendor}
      disabled={ifAddedToVendor}
      onPress={onToggleSwitch}
    />
  );
};

export default memo(ItemsByCategorySingleListItemCheckBox);
