import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, memo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  RootTabParamList,
  ShoppingCartStackParamList,
} from "../../../CustomTypes/types";
import {
  refHeaderOptions,
  screenOptions,
} from "../../shared/sharedScreenOptions";
import BarcodeImageScreen from "../Screens/ShoppingCart/BarcodeImage/BarcodeImageScreen";
import CartColumnListItemsScreen from "../Screens/ShoppingCart/CartColumnListItems/CartColumnListItemsScreen";
import ItemDetailsScreen from "../Screens/ShoppingCart/CartColumnListItems/ItemDetails/ItemDetailsScreen";
import QRImageScreen from "../Screens/ShoppingCart/QRImage/QRImageScreen";
import ShoppingCartScreen from "../Screens/ShoppingCart/ShoppingCartScreen";

const Stack = createNativeStackNavigator<ShoppingCartStackParamList>();

type Props = BottomTabScreenProps<RootTabParamList, "ShoppingCart">;

const ShoppingCartStackScreen: FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="ShoppingCartScreen"
          component={ShoppingCartScreen}
          options={screenOptions}
        />
        <Stack.Screen
          name="CartColumnListItems"
          component={CartColumnListItemsScreen}
          options={refHeaderOptions}
        />
        <Stack.Group>
          <Stack.Screen
            name="QRImage"
            component={QRImageScreen}
            options={refHeaderOptions}
          />
          <Stack.Screen
            name="BarcodeImage"
            component={BarcodeImageScreen}
            options={refHeaderOptions}
          />
          <Stack.Screen
            name="ItemDetails"
            component={ItemDetailsScreen}
            options={{ ...refHeaderOptions, title: "Item Details" }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default memo<Props>(ShoppingCartStackScreen);
