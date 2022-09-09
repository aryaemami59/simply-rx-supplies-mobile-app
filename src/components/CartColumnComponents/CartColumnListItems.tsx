import { FC, memo } from "react";
import { useAppSelector } from "../../redux/store";
import { selectByVendor } from "../../redux/addedSlice";
import { ListItem } from "@rneui/themed";
import { Text, View, Image, ScrollView } from "react-native";

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
            <Text style={{ textAlign: "center" }}>Item Name: {e.name}</Text>
            <Text style={{ textAlign: "center" }}>
              Item Number: {e.itemNumber}
            </Text>
            <Image
              source={{ uri: e.src }}
              style={{ width: 132, height: 112 }}
            />
          </View>
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default memo(CartColumnListItems);
