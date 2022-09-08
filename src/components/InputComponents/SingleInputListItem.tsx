import { Button, Card } from "@rneui/themed";
import { FC, memo } from "react";
import { View } from "react-native";
import { itemInterface } from "../redux/addedSlice";
import AddItemButton from "./AddItemButton";
import SearchResultsSwitch from "./SearchResultsSwitch";

interface Props {
  itemObj: itemInterface;
}

const SingleInputListItem: FC<Props> = ({ itemObj }): JSX.Element => {
  return (
    <View key={itemObj.id}>
      <Card>
        <Card.Title>{itemObj.name}</Card.Title>
        {itemObj.vendors.map(e => (
          <SearchResultsSwitch key={e} vendorName={e} itemObj={itemObj} />
        ))}
        <Card.FeaturedSubtitle style={{ color: "black", textAlign: "center" }}>
          Item Number: {itemObj.itemNumber}
        </Card.FeaturedSubtitle>
        <Card.Divider />
        <AddItemButton itemObj={itemObj} />
      </Card>
    </View>
  );
};

export default memo(SingleInputListItem);
