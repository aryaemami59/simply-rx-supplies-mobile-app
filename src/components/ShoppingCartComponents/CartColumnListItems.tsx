import { FC, memo } from "react";
import { useAppSelector } from "../../redux/store";
import { selectByVendor } from "../../redux/addedSlice";
import { ListItem } from "@rneui/themed";
import { View, ScrollView } from "react-native";
import ItemNameCart from "./ItemNameCart";
import ItemNumberCart from "./ItemNumberCart";
import BarcodeImageCart from "./BarcodeImageCart";
import ExpandCollapseButtonGroup from "./ExpandCollapseButtonGroup";

interface Props {
  vendorName: string;
}

const CartColumnListItems: FC<Props> = ({ vendorName }): JSX.Element => {
  const addedItems = useAppSelector(selectByVendor(vendorName));

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      {addedItems.map(e => (
        <ListItem bottomDivider key={e.name}>
          <View style={{ alignItems: "center" }}>
            <ExpandCollapseButtonGroup />
            <ItemNameCart itemObj={e} />
            <ItemNumberCart itemObj={e} />
            <BarcodeImageCart itemObj={e} />
          </View>
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default memo(CartColumnListItems);
