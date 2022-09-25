import { ListItem } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import {
  ItemObjType,
  vendorNameType,
  officialVendorNameType,
} from "../../../../../CustomTypes/types";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { checkIfAddedToOneVendor } from "../../../../redux/addedSlice";
import {
  selectVendorOfficialName,
  checkVendorsToAdd,
  setVendors,
} from "../../../../redux/addedSlice";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const ItemsByCategorySingleListItemCheckBox: FC<Props> = ({
  itemObj,
  vendorName,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const officialVendorName = useAppSelector<officialVendorNameType>(
    selectVendorOfficialName(vendorName)
  );
  const ifAddedToVendor = useAppSelector<boolean>(
    checkIfAddedToOneVendor(itemObj, vendorName)
  );
  const checked = useAppSelector<boolean>(
    checkVendorsToAdd(itemObj, vendorName)
  );

  const onToggleSwitch = useCallback(() => {
    ifAddedToVendor || dispatch(setVendors({ itemObj, vendorName }));
  }, []);

  return (
    <>
      <ListItem.CheckBox
        title={officialVendorName}
        checked={checked}
        disabled={ifAddedToVendor}
        onPress={onToggleSwitch}
      />
    </>
  );
};

export default memo<Props>(ItemsByCategorySingleListItemCheckBox);
