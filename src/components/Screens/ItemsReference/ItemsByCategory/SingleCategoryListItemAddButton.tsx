import { Chip } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback } from "react";
import useItemName from "../../../../hooks/useItemName";
import { addItems } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { checkIfAddedToAllVendors } from "../../../../redux/selectors";
import {
  BACKGROUND_MAIN_COLOR,
  FONT_WEIGHT_700,
} from "../../../../shared/styles/sharedStyles";
import type { OnPress } from "../../../../types/missingTypes";
import AddIcon from "./AddIcon";

const SingleCategoryListItemAddButton: FC = () => {
  const itemName = useItemName();
  const ifAddedToAllVendors = useAppSelector(
    checkIfAddedToAllVendors(itemName)
  );

  const dispatch = useAppDispatch();

  const clickHandler: OnPress = useCallback(() => {
    ifAddedToAllVendors || dispatch(addItems(itemName));
  }, [ifAddedToAllVendors, dispatch, itemName]);

  return (
    <Chip
      raised
      size="lg"
      onPress={clickHandler}
      title="Add"
      disabled={ifAddedToAllVendors}
      titleStyle={FONT_WEIGHT_700}
      buttonStyle={BACKGROUND_MAIN_COLOR}
      icon={AddIcon}
    />
  );
};

export default memo(SingleCategoryListItemAddButton);
