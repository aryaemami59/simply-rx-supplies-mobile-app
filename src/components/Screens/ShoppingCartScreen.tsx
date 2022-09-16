import { FC, memo } from "react";
import { useAppSelector } from "../../redux/store";
import { selectVendorsArr } from "../../redux/addedSlice";
import { ScrollView } from "react-native";
import CartVendorColumns from "../ShoppingCartComponents/CartVendorColumns";
import { createStackNavigator } from "@react-navigation/stack";
import VendorColumnStack from "../ShoppingCartComponents/CartVendorColumns";
import { Button } from "@rneui/themed";

const Stack = createStackNavigator();

const MyStack = ({ navigation, route }) => {
  const vendors = useAppSelector(selectVendorsArr);
  return (
    <Stack.Navigator>
      {vendors.map(e => (
        <Stack.Screen
          name={e}
          component={ShoppingCartScreen}
          // component={props => (
          //   <CartVendorColumns {...props} vendorName={e} route={route} />
          // )}
        />
      ))}
    </Stack.Navigator>
  );
};

const CartVendorColumnsRender = props => <CartVendorColumns {...props} />;

const ShoppingCartScreen = ({ navigation, route }) => {
  const vendors = useAppSelector(selectVendorsArr);
  return (
    // <MyStack navigation={navigation} route={route} />
    <ScrollView>
      {/* <Stack.Navigator> */}
      {vendors.map(e => (
        // <Button title={e} onPress={() => navigation.push(e, { name: e })} />
        // <Stack.Screen
        //   name={e}
        //   component={<CartVendorColumns vendorName={e} />}
        // />
        <CartVendorColumns
          key={e}
          vendorName={e}
          onPress={() => navigation.push(e, { name: e })}
        />
      ))}
      {/* </Stack.Navigator> */}
    </ScrollView>
  );
};

// export default MyStack;
export default memo(ShoppingCartScreen);
