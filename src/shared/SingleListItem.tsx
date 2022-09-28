import { Button } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import {
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
  addItems,
} from "../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { shallowEqual } from "react-redux";
import { ItemObjType, vendorNameType } from "../../CustomTypes/types";

type Props = {
  itemObj: ItemObjType;
  vendorName?: vendorNameType;
};

const SingleListItem: FC<Props> = ({ itemObj, vendorName }): JSX.Element => {
  const dispatch = useAppDispatch();
  const ifAddedToAllVendors = useAppSelector(checkIfAddedToAllVendors(itemObj));

  const vendorsSelector = useAppSelector(
    selectVendorsToAddTo(itemObj),
    shallowEqual
  );

  const clickHandler = useCallback(() => {
    const vendors = vendorName ? [vendorName] : vendorsSelector;
    ifAddedToAllVendors || dispatch(addItems({ itemObj, vendors }));
  }, [vendorName, vendorsSelector, ifAddedToAllVendors, dispatch, itemObj]);

  return (
    <Button
      title={itemObj.name}
      radius="md"
      onPress={clickHandler}
      disabled={ifAddedToAllVendors}
    />
  );
};

export default memo<Props>(SingleListItem);
