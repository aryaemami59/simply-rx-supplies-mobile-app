import { FC, memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ShoppingCartStackParamList } from "../../../CustomTypes/types";
import ShoppingCartScreen from "../Screens/ShoppingCartScreen";
import { useAppSelector } from "../../redux/store";
import { selectVendorsArr } from "../../redux/addedSlice";
import CartColumnListItemsScreen from "../Screens/CartColumnListItemsScreen";
import { screenOptions } from "../../shared/sharedScreenOptions";

const Stack = createStackNavigator<ShoppingCartStackParamList>();

const ShoppingCartStackScreen: FC = (): JSX.Element => {
  const vendors = useAppSelector(selectVendorsArr);
  return (
    <Stack.Navigator
    // screenOptions={screenOptions}
    >
      <Stack.Screen
        name="ShoppingCartScreen"
        component={ShoppingCartScreen}
        options={{ headerTitle: "Shopping Cart" }}
      />
      {vendors.map((e: string) => (
        <Stack.Screen key={e} name={e} component={CartColumnListItemsScreen} />
      ))}
    </Stack.Navigator>
  );
};

export default memo(ShoppingCartStackScreen);
