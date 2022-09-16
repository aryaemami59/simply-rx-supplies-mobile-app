import { FC, memo } from "react";
import { useAppSelector } from "../../redux/store";
import { selectByVendor } from "../../redux/addedSlice";
import { ListItem } from "@rneui/themed";
import { View, Text } from "react-native";
import ItemNameCart from "./ItemNameCart";
import ItemNumberCart from "./ItemNumberCart";
import BarcodeImageCart from "./BarcodeImageCart";
import ExpandCollapseButtonGroup from "./ExpandCollapseButtonGroup";
// import { VendorColumnStack } from "./CartVendorColumns";
import { createStackNavigator } from "@react-navigation/stack";

// interface Props {
//   vendorName: string;
// }
const Stack = createStackNavigator();

export const VendorColumnStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={route.params.vendorName}
        component={props => <CartColumnListItems {...props} />}
      />
    </Stack.Navigator>
  );
};
const CartColumnListItems = ({
  // vendorName,
  navigation,
  route,
}): JSX.Element => {
  const addedItems = useAppSelector(selectByVendor(route.params.name));
  // const addedItems = useAppSelector(selectByVendor(vendorName));

  return (
    <>
      {/* <View>
        <Text>{route.params.name}</Text>
      </View> */}
      {addedItems.map(e => (
        <ListItem bottomDivider key={e.name}>
          <View
            style={{
              alignItems: "center",
              width: "100%",
            }}>
            <ExpandCollapseButtonGroup />
            <ItemNameCart itemObj={e} />
            <ItemNumberCart itemObj={e} />
            <BarcodeImageCart itemObj={e} />
          </View>
        </ListItem>
      ))}
    </>
  );
};

export default memo(CartColumnListItems);
