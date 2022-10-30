import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootTabParamList } from "../../../CustomTypes/types";
import { useAppSelector } from "../../redux/hooks";
import { checkIfAnyItemsAdded } from "../../redux/selectors";
import {
  HEADER_SHOWN_FALSE,
  homeOptions,
  itemLookupOptions,
  itemsReferenceOptions,
  shoppingCartOptions,
} from "../../shared/sharedScreenOptions";
import HomeStackScreen from "../StackScreenComponents/HomeStackScreen";
import ItemLookupStackScreen from "../StackScreenComponents/ItemLookupStackScreen";
import ItemsReferenceStackScreen from "../StackScreenComponents/ItemsReferenceStackScreen";
import ShoppingCartStackScreen from "../StackScreenComponents/ShoppingCartStackScreen";

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabBarMain: FC = () => {
  const ifItemsAdded = useAppSelector(checkIfAnyItemsAdded);
  const { background } = useTheme().theme.colors;
  const tabBarBadge = ifItemsAdded ? "" : undefined;

  const options = useMemo(
    () => ({
      ...shoppingCartOptions,
      tabBarBadge,
    }),
    [tabBarBadge]
  );

  const screenOptions = useMemo(
    () => ({
      ...HEADER_SHOWN_FALSE,
      tabBarStyle: { backgroundColor: background },
    }),
    [background]
  );

  return (
    <SafeAreaProvider>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={homeOptions}
        />
        <Tab.Screen
          name="ItemLookup"
          component={ItemLookupStackScreen}
          options={itemLookupOptions}
        />
        <Tab.Screen
          name="ShoppingCart"
          component={ShoppingCartStackScreen}
          options={options}
        />
        <Tab.Screen
          name="ItemsReference"
          component={ItemsReferenceStackScreen}
          options={itemsReferenceOptions}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default memo(TabBarMain);
