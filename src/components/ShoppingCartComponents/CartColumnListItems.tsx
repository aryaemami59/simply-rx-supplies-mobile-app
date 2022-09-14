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
    // <ScrollView contentContainerStyle={{ alignItems: "center" }}>
    // <View style={{ paddingBottom: 100 }}>
    <>
      {addedItems.map(e => (
        <ListItem
          bottomDivider
          key={e.name}
          // style={{ alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              alignItems: "center",
              width: "100%",
              // paddingVertical: 50,
            }}>
            <ExpandCollapseButtonGroup />
            <ItemNameCart itemObj={e} />
            <ItemNumberCart itemObj={e} />
            <BarcodeImageCart itemObj={e} />
          </View>
        </ListItem>
      ))}
    </>
    // </View>
    // {/* </ScrollView> */}
  );
};

export default memo(CartColumnListItems);
