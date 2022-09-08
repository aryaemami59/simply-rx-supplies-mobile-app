import { FC, memo } from "react";
import { useAppSelector } from "../../redux/store";
import { selectByVendor } from "../../redux/addedSlice";
import { ListItem } from "@rneui/themed";
import { Text, View, Image } from "react-native";

interface Props {
  vendorName: string;
}

const CartColumnListItems: FC<Props> = ({ vendorName }): JSX.Element => {
  const addedItems = useAppSelector(selectByVendor(vendorName));

  return (
    <>
      {addedItems.map(e => (
        <ListItem bottomDivider key={e.name}>
          <View>
            <Text>Item Name: {e.name}</Text>
            <Text>Item Number: {e.itemNumber}</Text>
            <Image
              source={{ uri: e.src }}
              style={{ width: 132, height: 112 }}
            />
          </View>
        </ListItem>
      ))}
    </>
  );
};

export default memo(CartColumnListItems);
