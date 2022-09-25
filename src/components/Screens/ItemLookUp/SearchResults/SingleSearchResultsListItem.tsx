import { ListItem } from "@rneui/themed";
import { FC, memo } from "react";
import { View } from "react-native";
import AddItemButton from "./AddItemButton";
import SearchResultsSwitch from "./SearchResultsCheckBox";
import { ItemObjType, vendorNameType } from "../../../../../CustomTypes/types";
import { fontWeight600 } from "../../../../shared/sharedStyles";

type Props = {
  item: ItemObjType;
};

const SingleSearchResultsListItem: FC<Props> = ({
  item: itemObj,
}): JSX.Element => {
  return (
    <View key={itemObj.id}>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={fontWeight600}>{itemObj.name}</ListItem.Title>
          {itemObj.vendors.map((e: vendorNameType) => (
            <SearchResultsSwitch key={e} vendorName={e} itemObj={itemObj} />
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
