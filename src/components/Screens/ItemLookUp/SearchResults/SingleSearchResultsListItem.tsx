import { ListItem, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { View } from "react-native";

import useItemId from "../../../../hooks/useItemId";
import { useAppSelector } from "../../../../redux/hooks";
import {
  selectItemName,
  selectVendorIdsByItemId,
} from "../../../../redux/selectors";
import VendorIdProvider from "../../../../shared/contexts/VendorIdProvider";
import { FONT_WEIGHT_600 } from "../../../../shared/styles/sharedStyles";
import AddItemButton from "./AddItemButton";
import SearchResultsCheckBox from "./SearchResultsCheckBox";

const SingleSearchResultsListItem: FC = () => {
  const itemId = useItemId();
  const { background } = useTheme().theme.colors;
  const vendorIds = useAppSelector(state =>
    selectVendorIdsByItemId(state, itemId)
  );
  const itemName = useAppSelector(state => selectItemName(state, itemId));

  const style = useMemo<StyleProp<ViewStyle>>(
    () => ({ backgroundColor: background }),
    [background]
  );

  return (
    <View
      style={style}
      key={itemId}>
      <ListItem
        containerStyle={style}
        bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={FONT_WEIGHT_600}>{itemName}</ListItem.Title>
          {vendorIds.map(vendorId => (
            <VendorIdProvider
              vendorId={vendorId}
              key={vendorId}>
              <SearchResultsCheckBox />
            </VendorIdProvider>
          ))}
        </ListItem.Content>
        <ListItem.Content right>
          <AddItemButton />
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

export default memo(SingleSearchResultsListItem);
