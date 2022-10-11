import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import { View } from "react-native";
import { shallowEqual } from "react-redux";
import { ItemName } from "../../../../../CustomTypes/types";
import { useAppSelector } from "../../../../redux/hooks";
import { selectVendorsByItemName } from "../../../../redux/selectors";
import { FONT_WEIGHT_600 } from "../../../../shared/sharedStyles";
import AddItemButton from "./AddItemButton";
import SearchResultsCheckBox from "./SearchResultsCheckBox";

type Props = {
  itemName: ItemName;
};

const SingleSearchResultsListItem: FC<Props> = ({ itemName }) => {
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
            <SearchResultsCheckBox
              key={vendorName}
              vendorName={vendorName}
              itemName={itemName}
            />
          ))}
        </ListItem.Content>
        <ListItem.Content right>
          <AddItemButton itemName={itemName} />
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

export default memo<Props>(SingleSearchResultsListItem);
