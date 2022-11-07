import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import { View } from "react-native";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../../../redux/hooks";
import { selectVendorsByItemName } from "../../../../redux/selectors";
import VendorNameProvider from "../../../../shared/contexts/VendorNameProvider";
import useItemName from "../../../../shared/hooks/useItemName";
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

  const style = useMemo(() => ({ backgroundColor: background }), [background]);

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
