import { FC, memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ShoppingCartStackParamList,
  RootTabParamList,
} from "../../../CustomTypes/types";
import ShoppingCartScreen from "../Screens/ShoppingCart/ShoppingCartScreen";
import CartColumnListItemsScreen from "../Screens/ShoppingCart/VendorColumn/CartColumnListItemsScreen";
import {
  screenOptions,
  refHeaderOptions,
} from "../../shared/sharedScreenOptions";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import QRCodeScreen from "../ShoppingCartComponents/QRCodeScreen";
import BarcodeImageScreen from "../ShoppingCartComponents/BarcodeImageScreen";

const Stack = createStackNavigator<ShoppingCartStackParamList>();

type Props = BottomTabScreenProps<RootTabParamList, "ShoppingCart">;

const ShoppingCartStackScreen: FC<Props> = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShoppingCartScreen"
        component={ShoppingCartScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="VendorItems"
        component={CartColumnListItemsScreen}
        options={refHeaderOptions}
      />
      <Stack.Screen
        name="QRImage"
        component={QRCodeScreen}
        options={refHeaderOptions}
      />
      <Stack.Screen
        name="BarcodeImage"
        component={BarcodeImageScreen}
        options={refHeaderOptions}
      />
    </Stack.Navigator>
  );
};

export default memo<Props>(ShoppingCartStackScreen);
