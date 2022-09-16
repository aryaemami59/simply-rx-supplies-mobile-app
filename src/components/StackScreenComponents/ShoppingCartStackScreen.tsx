import { FC, memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ShoppingCartStackParamList } from "../../../CustomTypes/types";
import ShoppingCartScreen from "../Screens/ShoppingCartScreen";
import { useAppSelector } from "../../redux/store";
import {
  selectVendorsArr,
  selectAllVendorOfficialNames,
} from "../../redux/addedSlice";
import CartColumnListItemsScreen from "../Screens/CartColumnListItemsScreen";
import { screenOptions } from "../../shared/sharedScreenOptions";
import { mainColor } from "../../shared/sharedStyles";

const Stack = createStackNavigator<ShoppingCartStackParamList>();

const ShoppingCartStackScreen: FC = (): JSX.Element => {
  const vendors = useAppSelector(selectVendorsArr);
  const officialNames = useAppSelector(selectAllVendorOfficialNames);

  return (
    <Stack.Navigator
    // screenOptions={screenOptions}
    >
      <Stack.Screen
        name="ShoppingCartScreen"
        component={ShoppingCartScreen}
        options={{
          headerTitle: "Shopping Cart",
          headerStyle: { backgroundColor: mainColor },
          headerTitleStyle: { color: "white" },
        }}
      />
      {vendors.map((e: string, i: number) => (
        <Stack.Screen
          options={{
            headerTitle: officialNames[i],
            headerStyle: { backgroundColor: mainColor },
            headerTitleStyle: { color: "white" },
            headerBackTitleStyle: { color: "white" },
            headerBackTitleVisible: false,
            headerTintColor: "white",
          }}
          key={e}
          name={e}
          component={CartColumnListItemsScreen}
        />
      ))}
    </Stack.Navigator>
  );
};

export default memo(ShoppingCartStackScreen);
