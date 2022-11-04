import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, memo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  itemDetailsOptions,
  refHeaderOptions,
  screenOptions,
} from "../../shared/sharedScreenOptions";
import BarcodeImageScreen from "../Screens/ShoppingCart/BarcodeImage/BarcodeImageScreen";
import CartColumnListItemsScreen from "../Screens/ShoppingCart/CartColumnListItems/CartColumnListItemsScreen";
import ItemDetailsScreen from "../Screens/ShoppingCart/CartColumnListItems/ItemDetails/ItemDetailsScreen";
import QRImageScreen from "../Screens/ShoppingCart/QRImage/QRImageScreen";
import ShoppingCartScreen from "../Screens/ShoppingCart/ShoppingCartScreen";
import useStatus from "../../shared/customHooks/useStatus";
import useIsLoading from "../../shared/customHooks/useIsLoading";
import ErrMsgComponent from "../../shared/ErrMsgComponent";
import IsLoadingComponents from "../../shared/IsLoadingComponents";
import { ShoppingCartStackParamList, RootTabParamList } from "../../../CustomTypes/navigation";

const Stack = createNativeStackNavigator<ShoppingCartStackParamList>();

type Props = BottomTabScreenProps<RootTabParamList, "ShoppingCartStack">;

const ShoppingCartStackNavigator: FC<Props> = ({ navigation, route }) => {
  useStatus("ShoppingCartStackScreen");

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
            options={itemDetailsOptions}
          />
        </Stack.Group>
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default memo<Props>(ShoppingCartStackNavigator);
