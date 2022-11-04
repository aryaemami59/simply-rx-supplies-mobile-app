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
  screenTabOptions,
  shoppingCartOptions,
} from "../../shared/sharedScreenOptions";
import HomeStackNavigator from "../StackNavigatorComponents/HomeStackNavigator";
import ItemLookup from "../StackNavigatorComponents/ItemLookup";
import ItemsReferenceStackNavigator from "../StackNavigatorComponents/ItemsReferenceStackNavigator";
import ShoppingCartStackNavigator from "../StackNavigatorComponents/ShoppingCartStackNavigator";

const Tab = createBottomTabNavigator<RootTabParamList>();
const initialParams = { inputFocused: true };

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

  const navigatorScreenOptions = useMemo(
    () => ({
      ...HEADER_SHOWN_FALSE,
      tabBarStyle: { backgroundColor: background },
    }),
    [background]
  );

  return (
    <SafeAreaProvider>
      <Tab.Navigator>
        <Tab.Group screenOptions={screenTabOptions}>
          <Tab.Screen
            name="Home"
            component={HomeStackNavigator}
            options={homeOptions}
          />
        </Tab.Group>
        <Tab.Screen
          name="ItemLookup"
          initialParams={initialParams}
          component={ItemLookup}
          options={itemLookupOptions}
        />
        <Tab.Group screenOptions={navigatorScreenOptions}>
          <Tab.Screen
            name="ShoppingCartStack"
            component={ShoppingCartStackNavigator}
            options={options}
          />
          <Tab.Screen
            name="ItemsReference"
            component={ItemsReferenceStackNavigator}
            options={itemsReferenceOptions}
          />
        </Tab.Group>
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default memo(TabBarMain);
