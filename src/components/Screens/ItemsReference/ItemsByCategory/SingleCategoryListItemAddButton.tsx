import { Chip } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback } from "react";
import { addItems } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { checkIfAddedToAllVendors } from "../../../../redux/selectors";
import useItemName from "../../../../shared/hooks/useItemName";
import {
  BACKGROUND_MAIN_COLOR,
  FONT_WEIGHT_700,
} from "../../../../shared/styles/sharedStyles";
import type { OnPress } from "../../../../types/missingTypes";
import AddIcon from "./AddIcon";

const SingleCategoryListItemAddButton: FC = () => {
  const itemName = useItemName();
  const IfAddedToAllVendors = useAppSelector(
    checkIfAddedToAllVendors(itemName)
  );

  const dispatch = useAppDispatch();

  const clickHandler: OnPress = useCallback(() => {
    IfAddedToAllVendors || dispatch(addItems(itemName));
  }, [IfAddedToAllVendors, dispatch, itemName]);

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

export default memo(SingleCategoryListItemAddButton);
