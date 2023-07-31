import { ListItem, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { View } from "react-native";
import { shallowEqual } from "react-redux";

import useItemName from "../../../../hooks/useItemName";
import { useAppSelector } from "../../../../redux/hooks";
import { selectVendorsByItemName } from "../../../../redux/selectors";
import VendorNameProvider from "../../../../shared/contexts/VendorNameProvider";
import { FONT_WEIGHT_600 } from "../../../../shared/styles/sharedStyles";
import AddItemButton from "./AddItemButton";
import SearchResultsCheckBox from "./SearchResultsCheckBox";

const SingleSearchResultsListItem: FC = () => {
  const itemName = useItemName();
  const { theme } = useTheme();
  const { background } = theme.colors;
  const vendors = useAppSelector(
    selectVendorsByItemName(itemName),
    shallowEqual
  );

  const style: StyleProp<ViewStyle> = useMemo(
    () => ({ backgroundColor: background }),
    [background]
  );

  return (
    <View
      style={style}
      key={itemName}>
      <ListItem
        containerStyle={style}
        bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={FONT_WEIGHT_600}>{itemName}</ListItem.Title>
          {vendors.map(vendorName => (
            <VendorNameProvider
              vendorName={vendorName}
              key={vendorName}>
              <SearchResultsCheckBox />
            </VendorNameProvider>
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
