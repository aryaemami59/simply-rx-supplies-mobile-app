import { FC, memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ShoppingCartStackParamList } from "../../../CustomTypes/types";
import ShoppingCartScreen from "../Screens/ShoppingCartScreen";
import { useAppSelector } from "../../redux/store";
import { selectVendorsArr } from "../../redux/addedSlice";
import CartColumnListItems from "../ShoppingCartComponents/CartColumnListItems";

const Stack = createStackNavigator();
// const Stack = createStackNavigator<ShoppingCartStackParamList>();

const ShoppingCartStackScreen: FC = (): JSX.Element => {
  const vendors = useAppSelector(selectVendorsArr);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShoppingCartScreen"
        component={ShoppingCartScreen}
        options={{ headerTitle: "Shopping Cart" }}
      />
      {vendors.map(e => (
        <Stack.Screen name={e} component={CartColumnListItems} />
      ))}
    </Stack.Navigator>
  );
};

export default memo(ShoppingCartStackScreen);
