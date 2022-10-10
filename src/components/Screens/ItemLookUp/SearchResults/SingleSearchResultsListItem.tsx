import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo } from "react";
import { View } from "react-native";
import { ItemObjType } from "../../../../../CustomTypes/types";
import { FONT_WEIGHT_600 } from "../../../../shared/sharedStyles";
import AddItemButton from "./AddItemButton";
import SearchResultsCheckBox from "./SearchResultsCheckBox";

type Props = {
  itemObj: ItemObjType;
};

const SingleSearchResultsListItem: FC<Props> = ({ itemObj }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[{ backgroundColor: theme.colors.background }]}
      key={itemObj.id}>
      <ListItem
        containerStyle={[{ backgroundColor: theme.colors.background }]}
        bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={FONT_WEIGHT_600}>
            {itemObj.name}
          </ListItem.Title>
          {itemObj.vendors.map(vendorName => (
            <SearchResultsCheckBox
              key={vendorName}
              vendorName={vendorName}
              itemObj={itemObj}
            />
          ))}
        </ListItem.Content>
        <ListItem.Content right>
          <AddItemButton itemObj={itemObj} />
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

export default memo<Props>(SingleSearchResultsListItem);
