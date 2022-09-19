import { Button } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import {
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
  addItems,
} from "../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { shallowEqual } from "react-redux";
import { itemInterface, vendorNameType } from "../../../CustomTypes/types";

interface Props {
  itemObj: itemInterface;
}

const SingleSideBarAccordionListItem: FC<Props> = ({
  itemObj,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const ifAddedToAllVendors: boolean = useAppSelector<boolean>(
    checkIfAddedToAllVendors(itemObj)
  );

  const vendors: vendorNameType[] = useAppSelector<vendorNameType[]>(
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
      disabled={ifAddedToAllVendors ? true : false}
    />
  );
};

export default memo<Props>(SingleSideBarAccordionListItem);
