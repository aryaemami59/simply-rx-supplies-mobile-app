import { Button } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import {
  itemInterface,
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
  addItems,
} from "../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { shallowEqual } from "react-redux";

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
  const vendors: string[] = useAppSelector<string[]>(
    selectVendorsToAddTo(itemObj),
    shallowEqual
  );
  const clickHandler = useCallback((): void => {
    ifAddedToAllVendors || dispatch(addItems({ itemObj, vendors }));
  }, [dispatch, itemObj, vendors, ifAddedToAllVendors]);
  return (
    <>
      <Button
        title={itemObj.name}
        radius="md"
        onPress={clickHandler}
        // type={ifAddedToAllVendors ? "outline" : "solid"}
        // type={ifAddedToAllVendors ? "solid" : "outline"}
        disabled={ifAddedToAllVendors ? true : false}
      />
    </>
  );
};

export default memo(SingleSideBarAccordionListItem);
