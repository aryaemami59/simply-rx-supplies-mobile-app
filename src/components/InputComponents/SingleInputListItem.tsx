import { Card } from "@rneui/themed";
import { FC, memo } from "react";
import { View } from "react-native";
import { itemInterface } from "../../redux/addedSlice";
import AddItemButton from "./AddItemButton";
import BarcodeImageSearchResults from "./BarcodeImageSearchResults";
import SearchResultsSwitch from "./SearchResultsSwitch";

interface Props {
  item: itemInterface;
}

const SingleInputListItem: FC<Props> = ({ item }): JSX.Element => {
  return (
    <View key={item.id}>
      <Card>
        <Card.Title>{item.name}</Card.Title>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {item.vendors.map((e: string) => (
            <SearchResultsSwitch key={e} vendorName={e} itemObj={item} />
          ))}
        </View>
        <View style={{ alignItems: "center" }}>
          <BarcodeImageSearchResults itemObj={item} />
        </View>
        <Card.FeaturedSubtitle style={{ color: "black", textAlign: "center" }}>
          Item Number: {item.itemNumber}
        </Card.FeaturedSubtitle>
        <Card.Divider />
        <AddItemButton itemObj={item} />
      </Card>
    </View>
  );
};

export default memo(SingleInputListItem);
