import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, memo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  ShoppingCartStackNavigatorProps,
  ShoppingCartStackParamList,
} from "../../../CustomTypes/navigation";
import useIsLoading from "../../shared/customHooks/useIsLoading";
import ErrMsgComponent from "../../shared/ErrMsgComponent";
import IsLoadingComponents from "../../shared/IsLoadingComponents";
import {
  itemDetailsOptions,
  refHeaderOptions,
  screenStackOptions,
} from "../../shared/sharedScreenOptions";
import BarcodeImageScreen from "../Screens/ShoppingCart/BarcodeImage/BarcodeImageScreen";
import CartColumnListItemsScreen from "../Screens/ShoppingCart/CartColumnListItems/CartColumnListItemsScreen";
import ItemDetailsScreen from "../Screens/ShoppingCart/CartColumnListItems/ItemDetails/ItemDetailsScreen";
import QRImageScreen from "../Screens/ShoppingCart/QRImage/QRImageScreen";
import ShoppingCartScreen from "../Screens/ShoppingCart/ShoppingCartScreen";

const Stack = createNativeStackNavigator<ShoppingCartStackParamList>();

type Props = ShoppingCartStackNavigatorProps;

const ShoppingCartStackNavigator: FC<Props> = ({ navigation, route }) => {
  const [isLoading, errMsg] = useIsLoading();

  if (isLoading) {
    return <IsLoadingComponents />;
  }

  if (errMsg) {
    return <ErrMsgComponent />;
  }

  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Group screenOptions={screenStackOptions}>
          <Stack.Screen
            name="ShoppingCartScreen"
            component={ShoppingCartScreen}
          />
        </Stack.Group>
        <Stack.Screen
          name="CartColumnListItems"
          component={CartColumnListItemsScreen}
          options={refHeaderOptions}
        />
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
          options={itemDetailsOptions}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default memo<Props>(ShoppingCartStackNavigator);
