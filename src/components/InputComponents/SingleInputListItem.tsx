import { Button, Card } from "@rneui/themed";
import { FC, memo } from "react";
import { View, Image } from "react-native";
import { itemInterface } from "../../redux/addedSlice";
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
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {itemObj.vendors.map((e: string) => (
            <SearchResultsSwitch key={e} vendorName={e} itemObj={itemObj} />
          ))}
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: itemObj.src }}
            style={{ width: 132, aspectRatio: 33 / 28 }}
          />
        </View>
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
