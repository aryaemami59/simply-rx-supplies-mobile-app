import { Chip, ListItem, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import addIcon from "../../../../Icons/addIcon";
import useItemName from "../../../../hooks/useItemName";
import useVendorName from "../../../../hooks/useVendorName";
import { addItemsByVendor } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  checkIfAddedToAllVendors,
  checkIfItemAddedToOneVendor,
} from "../../../../redux/selectors";
import {
  BACKGROUND_MAIN_COLOR,
  FONT_WEIGHT_700,
} from "../../../../shared/styles/sharedStyles";
import type { OnPress } from "../../../../types/missingTypes";

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
          icon={addIcon}
        />
      </ListItem.Content>
    </ListItem>
  );
};

export default memo(SingleItemsByVendorListItem);
