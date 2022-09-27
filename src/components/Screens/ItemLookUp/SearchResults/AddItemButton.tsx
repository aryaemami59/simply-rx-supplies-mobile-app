import { Chip } from "@rneui/themed";
import { FC, memo, useState, useCallback } from "react";

import {
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
  addItems,
} from "../../../../redux/addedSlice";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { shallowEqual } from "react-redux";
import { StyleSheet } from "react-native";
import { fontWeightBold, mainColor } from "../../../../shared/sharedStyles";
import { ItemObjType, vendorNameType } from "../../../../../CustomTypes/types";

type Props = {
  itemObj: ItemObjType;
};

const AddItemButton: FC<Props> = ({ itemObj }): JSX.Element => {
  useState<boolean>(false);
  const IfAddedToAllVendors: boolean = useAppSelector<boolean>(
    checkIfAddedToAllVendors(itemObj)
  );
  const vendors: vendorNameType[] = useAppSelector<vendorNameType[]>(
    selectVendorsToAddTo(itemObj),
    shallowEqual
  );
  const dispatch = useAppDispatch();

  const clickHandler = useCallback((): void => {
    !IfAddedToAllVendors && dispatch(addItems({ itemObj, vendors }));
  }, [IfAddedToAllVendors, dispatch, itemObj, vendors]);

  return (
    <>
      <Chip
        raised
        size="lg"
        onPress={clickHandler}
        title="Add"
        titleStyle={styles.titleStyle}
        buttonStyle={styles.buttonStyle}
        icon={{ name: "add", type: "Ionicons", color: "white" }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: mainColor,
  },
  titleStyle: {
    fontWeight: fontWeightBold,
  },
});

export default memo<Props>(AddItemButton);
