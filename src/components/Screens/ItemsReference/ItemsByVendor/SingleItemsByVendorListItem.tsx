import { Chip, ListItem, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";

import useItemId from "../../../../hooks/useItemId";
import useVendorId from "../../../../hooks/useVendorId";
import AddIcon from "../../../../Icons/AddIcon";
import { addItemToCarts } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  checkIfAddedToAllVendors,
  checkIfAddedToVendor,
  selectItemName,
} from "../../../../redux/selectors";
import {
  BACKGROUND_MAIN_COLOR,
  FONT_WEIGHT_700,
} from "../../../../shared/styles/sharedStyles";
import type { OnPress } from "../../../../types/tsHelpers";

const SingleItemsByVendorListItem: FC = () => {
  const itemId = useItemId();
  const vendorId = useVendorId();
  const itemName = useAppSelector(state => selectItemName(state, itemId));
  const { background } = useTheme().theme.colors;
  const dispatch = useAppDispatch();
  const ifAddedToAllVendors = useAppSelector(state =>
    checkIfAddedToAllVendors(state, itemId)
  );

  const clickHandler = useCallback<OnPress>(() => {
    if (!ifAddedToAllVendors) {
      dispatch(addItemToCarts({ itemId }));
    }
  }, [dispatch, ifAddedToAllVendors, itemId]);

  const ifAdded = useAppSelector(state =>
    checkIfAddedToVendor(state, vendorId, itemId)
  );

  const containerStyle = useMemo<StyleProp<ViewStyle>>(
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
          icon={AddIcon}
        />
      </ListItem.Content>
    </ListItem>
  );
};

export default memo(SingleItemsByVendorListItem);
