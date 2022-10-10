import { Chip } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { shallowEqual } from "react-redux";
import { ItemName } from "../../../../../CustomTypes/types";
import {
  addItems,
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
} from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  BACKGROUND_MAIN_COLOR,
  FONT_WEIGHT_700,
} from "../../../../shared/sharedStyles";
import AddIcon from "./AddIcon";

type Props = {
  itemName: ItemName;
};

const SingleCategoryListItemAddButton: FC<Props> = ({ itemName }) => {
  const IfAddedToAllVendors = useAppSelector(
    checkIfAddedToAllVendors(itemName)
  );

  const vendorsToAddTo = useAppSelector(
    selectVendorsToAddTo(itemName),
    shallowEqual
  );

  const dispatch = useAppDispatch();

  const clickHandler = useCallback(() => {
    IfAddedToAllVendors ||
      !vendorsToAddTo.length ||
      dispatch(addItems({ itemName, vendorsToAddTo }));
  }, [IfAddedToAllVendors, dispatch, itemName, vendorsToAddTo]);

  return (
    <Chip
      raised
      size="lg"
      onPress={clickHandler}
      title="Add"
      disabled={IfAddedToAllVendors}
      titleStyle={FONT_WEIGHT_700}
      buttonStyle={BACKGROUND_MAIN_COLOR}
      icon={AddIcon}
    />
  );
};

export default memo<Props>(SingleCategoryListItemAddButton);
