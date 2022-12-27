import { MaterialIcons } from "@expo/vector-icons";
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
import type { Icon, OnPress } from "../../../../types/missingTypes";

const icon: Icon = (
  <MaterialIcons
    name="add"
    color="white"
    size={24}
  />
);

const AddItemButton: FC = () => {
  const itemName = useItemName();
  const IfAddedToAllVendors = useAppSelector(
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
      disabled={IfAddedToAllVendors}
      title="Add"
      titleStyle={FONT_WEIGHT_700}
      buttonStyle={BACKGROUND_MAIN_COLOR}
      icon={icon}
    />
  );
};

export default memo(AddItemButton);
