import { FC, memo } from "react";
import { useAppSelector } from "../../redux/store";
import { selectByVendor } from "../../redux/addedSlice";
import { ButtonGroup, ListItem } from "@rneui/themed";
import { View, ScrollView } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
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
            {/* <ButtonGroup
              containerStyle={{ borderWidth: 0 }}
              innerBorderStyle={{ width: 0 }}
              buttons={[
                <MaterialCommunityIcons
                  name="magnify-close"
                  size={30}
                  color="black"
                />,
                <AntDesign name="minuscircleo" size={30} color="black" />,
                <AntDesign name="closecircleo" size={30} color="black" />,
              ]}
            /> */}
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
