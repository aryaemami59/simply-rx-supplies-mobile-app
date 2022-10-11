import { MaterialIcons } from "@expo/vector-icons";
import { Chip } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { shallowEqual } from "react-redux";
import { ItemName } from "../../../../../CustomTypes/types";
import {
  addItems,
} from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { checkIfAddedToAllVendors, selectVendorsToAddTo } from "../../../../redux/selectors";
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
      disabled={IfAddedToAllVendors}
      title="Add"
      titleStyle={FONT_WEIGHT_700}
      buttonStyle={BACKGROUND_MAIN_COLOR}
      icon={icon}
    />
  );
};

export default memo<Props>(AddItemButton);
