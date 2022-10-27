import { ListItem } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { setVendors } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  checkIfItemAddedToOneVendor,
  checkVendorsToAdd,
} from "../../../../redux/selectors";
import useItemName from "../../../../shared/customHooks/useItemName";
import useOfficialVendorName from "../../../../shared/customHooks/useOfficialVendorName";
import useVendorName from "../../../../shared/customHooks/useVendorName";

const ItemsByCategorySingleListItemCheckBox: FC = () => {
  const vendorName = useVendorName();
  const itemName = useItemName();
  const dispatch = useAppDispatch();
  const officialVendorName = useOfficialVendorName(vendorName);
  const ifAddedToVendor = useAppSelector(
    checkIfItemAddedToOneVendor(vendorName, itemName)
  );
  const checked = useAppSelector(checkVendorsToAdd(vendorName, itemName));

  const onToggleSwitch = useCallback(() => {
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
