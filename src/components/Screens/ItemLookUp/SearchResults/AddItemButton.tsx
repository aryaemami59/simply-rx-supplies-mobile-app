import { MaterialIcons } from "@expo/vector-icons";
import { Chip } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { addItems } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { checkIfAddedToAllVendors } from "../../../../redux/selectors";
import useItemName from "../../../../shared/customHooks/useItemName";
import {
  BACKGROUND_MAIN_COLOR,
  FONT_WEIGHT_700,
} from "../../../../shared/sharedStyles";

const icon = (
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

  const clickHandler = useCallback(() => {
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
