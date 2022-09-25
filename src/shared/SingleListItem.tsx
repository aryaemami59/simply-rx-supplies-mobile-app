import { Button } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import {
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
  addItems,
} from "../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { shallowEqual } from "react-redux";
import { ItemObjType, vendorNameType } from "../../CustomTypes/types";

type Props = {
  itemObj: ItemObjType;
  vendorName?: vendorNameType;
};

const SingleListItem: FC<Props> = ({ itemObj, vendorName }): JSX.Element => {
  const dispatch = useAppDispatch();
  const ifAddedToAllVendors: boolean = useAppSelector<boolean>(
    checkIfAddedToAllVendors(itemObj)
  );

  const vendors: vendorNameType[] = vendorName
    ? [vendorName]
    : useAppSelector<vendorNameType[]>(
        selectVendorsToAddTo(itemObj),
        shallowEqual
      );

  const clickHandler = useCallback((): void => {
    ifAddedToAllVendors || dispatch(addItems({ itemObj, vendors }));
  }, [dispatch, itemObj, vendors, ifAddedToAllVendors]);

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
