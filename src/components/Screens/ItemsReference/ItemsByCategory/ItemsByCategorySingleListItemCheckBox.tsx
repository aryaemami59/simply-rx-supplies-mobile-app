import { ListItem } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback } from "react";
import type { PressableProps } from "react-native";
import { setVendors } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  checkIfItemAddedToOneVendor,
  checkVendorsToAdd,
} from "../../../../redux/selectors";
import useItemName from "../../../../shared/hooks/useItemName";
import useOfficialVendorName from "../../../../shared/hooks/useOfficialVendorName";
import useVendorName from "../../../../shared/hooks/useVendorName";

const ItemsByCategorySingleListItemCheckBox: FC = () => {
  const vendorName = useVendorName();
  const itemName = useItemName();
  const dispatch = useAppDispatch();
  const officialVendorName = useOfficialVendorName(vendorName);
  const ifAddedToVendor = useAppSelector(
    checkIfItemAddedToOneVendor(vendorName, itemName)
  );
  const checked = useAppSelector(checkVendorsToAdd(vendorName, itemName));

  const onToggleSwitch: NonNullable<PressableProps["onPress"]> =
    useCallback(() => {
      ifAddedToVendor || dispatch(setVendors({ itemName, vendorName }));
    }, [dispatch, ifAddedToVendor, itemName, vendorName]);

  return (
    <ListItem.CheckBox
      title={officialVendorName}
      checked={checked}
      disabled={ifAddedToVendor}
      onPress={onToggleSwitch}
    />
  );
};

export default memo(ItemsByCategorySingleListItemCheckBox);
