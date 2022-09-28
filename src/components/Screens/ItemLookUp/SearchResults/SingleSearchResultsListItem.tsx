import { ListItem } from "@rneui/themed";
import { FC, memo } from "react";
import { View } from "react-native";
import AddItemButton from "./AddItemButton";
import SearchResultsSwitch from "./SearchResultsCheckBox";
import { ItemObjType } from "../../../../../CustomTypes/types";
import { FONT_WEIGHT_600 } from "../../../../shared/sharedStyles";

type Props = {
  itemObj: ItemObjType;
};

const SingleSearchResultsListItem: FC<Props> = ({ itemObj }): JSX.Element => {
  return (
    <View key={itemObj.id}>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={FONT_WEIGHT_600}>
            {itemObj.name}
          </ListItem.Title>
          {itemObj.vendors.map(vendorName => (
            <SearchResultsSwitch
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
