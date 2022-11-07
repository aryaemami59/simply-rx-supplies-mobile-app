import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootTabParamList } from "../../../custom_types/navigation";
import { useAppSelector } from "../../redux/hooks";
import { checkIfAnyItemsAdded } from "../../redux/selectors";
import {
  HEADER_SHOWN_FALSE,
  homeOptions,
  itemLookupOptions,
  itemsReferenceOptions,
  shoppingCartOptions,
} from "../../shared/screen_options/sharedScreenOptions";
import HomeScreen from "../Screens/Home/HomeScreen";
import ItemLookupScreen from "../Screens/ItemLookUp/ItemLookupScreen";
import ItemsReferenceStackNavigator from "../StackNavigatorComponents/ItemsReferenceStackNavigator";
import ShoppingCartStackNavigator from "../StackNavigatorComponents/ShoppingCartStackNavigator";

const Tab = createBottomTabNavigator<RootTabParamList>();
const initialParams = { inputFocused: true };

const TabBarMain: FC = () => {
  const ifItemsAdded = useAppSelector(checkIfAnyItemsAdded);
  const { background: backgroundColor } = useTheme().theme.colors;
  const tabBarBadge = ifItemsAdded ? "" : undefined;

  const options = useMemo(
    () => ({
      ...shoppingCartOptions,
      tabBarBadge,
    }),
    [tabBarBadge]
  );

  const homeGroupOptions = useMemo(
    () => ({
      tabBarStyle: { backgroundColor },
    }),
    [backgroundColor]
  );

  const navigatorScreenOptions = useMemo(
    () => ({
      ...HEADER_SHOWN_FALSE,
      ...homeGroupOptions,
    }),
    [homeGroupOptions]
  );

  return (
    <SafeAreaProvider>
      <Tab.Navigator
      // screenOptions={{ headerStatusBarHeight: 0 }}
      >
        <Tab.Group screenOptions={homeGroupOptions}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={homeOptions}
          />
          <Tab.Screen
            name="ItemLookup"
            initialParams={initialParams}
            component={ItemLookupScreen}
            options={itemLookupOptions}
          />
        </Tab.Group>
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
