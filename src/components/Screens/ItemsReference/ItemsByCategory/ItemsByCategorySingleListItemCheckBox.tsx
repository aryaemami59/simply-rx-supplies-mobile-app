import { ListItem } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { VendorAndItemName } from "../../../../../CustomTypes/types";
import {
  setVendors,
} from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { selectVendorOfficialName, checkIfItemAddedToOneVendor, checkVendorsToAdd } from "../../../../redux/selectors";

type Props = VendorAndItemName;

const ItemsByCategorySingleListItemCheckBox: FC<Props> = ({
  itemName,
  vendorName,
}) => {
  const dispatch = useAppDispatch();
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
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

export default memo<Props>(ItemsByCategorySingleListItemCheckBox);
