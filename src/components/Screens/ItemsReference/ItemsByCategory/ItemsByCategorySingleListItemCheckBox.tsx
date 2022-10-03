import { ListItem } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { ItemObjType, vendorNameType } from "../../../../../CustomTypes/types";
import {
  checkIfAddedToOneVendor,
  checkVendorsToAdd,
  selectVendorOfficialName,
  setVendors,
} from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const ItemsByCategorySingleListItemCheckBox: FC<Props> = ({
  itemObj,
  vendorName,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  const ifAddedToVendor = useAppSelector(
    checkIfAddedToOneVendor(itemObj, vendorName)
  );
  const checked = useAppSelector(checkVendorsToAdd(itemObj, vendorName));

  const onToggleSwitch = useCallback(() => {
    ifAddedToVendor || dispatch(setVendors({ itemObj, vendorName }));
  }, [dispatch, ifAddedToVendor, itemObj, vendorName]);

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
