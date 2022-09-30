import { FC, memo } from "react";
import {
  ShoppingCartStackParamList,
  RootTabParamList,
} from "../../../CustomTypes/types";
import ShoppingCartScreen from "../Screens/ShoppingCart/ShoppingCartScreen";
import CartColumnListItemsScreen from "../Screens/ShoppingCart/CartColumnListItems/CartColumnListItemsScreen";
import {
  screenOptions,
  refHeaderOptions,
} from "../../shared/sharedScreenOptions";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import QRImageScreen from "../Screens/ShoppingCart/QRImage/QRImageScreen";
import BarcodeImageScreen from "../Screens/ShoppingCart/BarcodeImage/BarcodeImageScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ItemDetailsScreen from "../Screens/ShoppingCart/CartColumnListItems/ItemDetails/ItemDetailsScreen";

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
