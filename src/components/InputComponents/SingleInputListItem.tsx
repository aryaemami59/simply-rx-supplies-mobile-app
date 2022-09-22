import { ListItem } from "@rneui/themed";
import { FC, memo } from "react";
import { View } from "react-native";
import AddItemButton from "./AddItemButton";
import SearchResultsSwitch from "./SearchResultsSwitch";
import { ItemObjType, vendorNameType } from "../../../CustomTypes/types";

type Props = {
  item: ItemObjType;
};

const SingleInputListItem: FC<Props> = ({ item: itemObj }): JSX.Element => {
  return (
    <View key={itemObj.id}>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "600" }}>
            {itemObj.name}
          </ListItem.Title>
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

export default memo(SingleInputListItem);
