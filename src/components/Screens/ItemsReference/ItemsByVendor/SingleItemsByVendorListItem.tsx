import { MaterialIcons } from "@expo/vector-icons";
import { Chip, ListItem, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { addItemsByVendor } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  checkIfAddedToAllVendors,
  checkIfItemAddedToOneVendor,
} from "../../../../redux/selectors";
import useItemName from "../../../../shared/hooks/useItemName";
import useVendorName from "../../../../shared/hooks/useVendorName";
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

const SingleItemsByVendorListItem: FC = () => {
  const itemName = useItemName();
  const vendorName = useVendorName();
  const { background } = useTheme().theme.colors;
  const dispatch = useAppDispatch();
  const ifAddedToAllVendors = useAppSelector(
    checkIfAddedToAllVendors(itemName)
  );

  const clickHandler: OnPress = useCallback(() => {
    ifAddedToAllVendors || dispatch(addItemsByVendor({ itemName, vendorName }));
  }, [vendorName, ifAddedToAllVendors, dispatch, itemName]);

  const ifAdded = useAppSelector(
    checkIfItemAddedToOneVendor(vendorName, itemName)
  );

  const containerStyle: StyleProp<ViewStyle> = useMemo(
    () => ({ backgroundColor: background }),
    [background]
  );

  return (
    <ListItem
      bottomDivider
      containerStyle={containerStyle}>
      <ListItem.Content>
        <ListItem.Title>{itemName}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Content right>
        <Chip
          raised
          size="lg"
          onPress={clickHandler}
          title="Add"
          disabled={ifAdded}
          titleStyle={FONT_WEIGHT_700}
          buttonStyle={BACKGROUND_MAIN_COLOR}
          icon={icon}
        />
      </ListItem.Content>
    </ListItem>
  );
};

export default memo(SingleItemsByVendorListItem);
