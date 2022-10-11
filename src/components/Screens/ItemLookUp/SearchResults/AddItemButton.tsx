import { MaterialIcons } from "@expo/vector-icons";
import { Chip } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { ItemName } from "../../../../../CustomTypes/types";
import { addItems } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { checkIfAddedToAllVendors } from "../../../../redux/selectors";
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

type Props = {
  itemName: ItemName;
};

const AddItemButton: FC<Props> = ({ itemName }) => {
  const IfAddedToAllVendors = useAppSelector(
    checkIfAddedToAllVendors(itemName)
  );

  const dispatch = useAppDispatch();

  const clickHandler = useCallback(() => {
    dispatch(addItems({ itemName }));
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

export default memo<Props>(AddItemButton);
