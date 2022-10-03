import { MaterialIcons } from "@expo/vector-icons";
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

const icon = (
  <MaterialIcons
    name="add"
    color="white"
    size={24}
  />
);

type Props = {
  itemObj: ItemObjType;
};

const AddItemButton: FC<Props> = ({ itemObj }): JSX.Element => {
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
      disabled={IfAddedToAllVendors}
      title="Add"
      titleStyle={FONT_WEIGHT_700}
      buttonStyle={BACKGROUND_MAIN_COLOR}
      icon={icon}
    />
  );
};

export default memo<Props>(AddItemButton);
