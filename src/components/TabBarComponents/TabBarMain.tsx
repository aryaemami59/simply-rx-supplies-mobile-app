import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootTabParamList } from "../../../CustomTypes/navigation";
import { useAppSelector } from "../../redux/hooks";
import { checkIfAnyItemsAdded } from "../../redux/selectors";
import {
  HEADER_SHOWN_FALSE,
  homeOptions,
  itemLookupOptions,
  itemsReferenceOptions,
  shoppingCartOptions,
} from "../../shared/sharedScreenOptions";
import HomeStackNavigator from "../StackNavigatorComponents/HomeStackNavigator";
import ItemLookupStackNavigator from "../StackNavigatorComponents/ItemLookupStackNavigator";
import ItemsReferenceStackNavigator from "../StackNavigatorComponents/ItemsReferenceStackNavigator";
import ShoppingCartStackNavigator from "../StackNavigatorComponents/ShoppingCartStackNavigator";

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
          component={HomeStackNavigator}
          options={homeOptions}
        />
        <Tab.Screen
          name="ItemLookup"
          component={ItemLookupStackNavigator}
          options={itemLookupOptions}
        />
        <Tab.Screen
          name="ShoppingCart"
          component={ShoppingCartStackNavigator}
          options={options}
        />
        <Tab.Screen
          name="ItemsReference"
          component={ItemsReferenceStackNavigator}
          options={itemsReferenceOptions}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default memo(TabBarMain);
