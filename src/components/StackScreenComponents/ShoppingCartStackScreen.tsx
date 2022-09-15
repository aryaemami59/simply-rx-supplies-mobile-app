import { FC, memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ShoppingCartStackParamList } from "../../../CustomTypes/types";
import ShoppingCartScreen from "../Screens/ShoppingCartScreen";

const Stack = createStackNavigator<ShoppingCartStackParamList>();

const ShoppingCartStackScreen: FC = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShoppingCart"
        component={ShoppingCartScreen}
        options={{ headerTitle: "Shopping Cart" }}
      />
    </Stack.Navigator>
  );
};

export default memo(ShoppingCartStackScreen);
