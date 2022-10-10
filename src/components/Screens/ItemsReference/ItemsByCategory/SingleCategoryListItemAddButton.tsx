import { Chip } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { shallowEqual } from "react-redux";
import { ItemObjType } from "../../../../../CustomTypes/types";
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
  itemObj: ItemObjType;
};

const SingleCategoryListItemAddButton: FC<Props> = ({ itemObj }) => {
  const IfAddedToAllVendors = useAppSelector(checkIfAddedToAllVendors(itemObj));

  const vendors = useAppSelector(selectVendorsToAddTo(itemObj), shallowEqual);

  const dispatch = useAppDispatch();

  const clickHandler = useCallback(() => {
    !IfAddedToAllVendors && dispatch(addItems({ itemObj, vendors }));
  }, [IfAddedToAllVendors, dispatch, itemObj, vendors]);

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
