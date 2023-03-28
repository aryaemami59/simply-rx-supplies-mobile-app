import { Chip } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback } from "react";
import addIcon from "../../../../Icons/addIcon";
import { addItems } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { checkIfAddedToAllVendors } from "../../../../redux/selectors";
import useItemName from "../../../../shared/hooks/useItemName";
import {
  BACKGROUND_MAIN_COLOR,
  FONT_WEIGHT_700,
} from "../../../../shared/styles/sharedStyles";
import type { OnPress } from "../../../../types/missingTypes";

const AddItemButton: FC = () => {
  const itemName = useItemName();
  const ifAddedToAllVendors = useAppSelector(
    checkIfAddedToAllVendors(itemName)
  );

  const dispatch = useAppDispatch();

  const clickHandler: OnPress = useCallback(() => {
    dispatch(addItems(itemName));
  }, [dispatch, itemName]);

  return (
    <Chip
      raised
      size="lg"
      onPress={clickHandler}
      disabled={ifAddedToAllVendors}
      title="Add"
      titleStyle={FONT_WEIGHT_700}
      buttonStyle={BACKGROUND_MAIN_COLOR}
      icon={addIcon}
    />
  );
};

export default memo(AddItemButton);
