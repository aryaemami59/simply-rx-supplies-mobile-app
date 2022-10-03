import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { RootTabParamList } from "../../../CustomTypes/types";
import { checkIfAnyItemsAdded } from "../../redux/addedSlice";
import { useAppSelector } from "../../redux/hooks";
import {
  HEADER_SHOWN_FALSE,
  HomeOptions,
  ItemLookupOptions,
  ItemsReferenceOptions,
  ShoppingCartOptions,
} from "../../shared/sharedScreenOptions";
import HomeStackScreen from "../StackScreenComponents/HomeStackScreen";
import ItemLookupStackScreen from "../StackScreenComponents/ItemLookupStackScreen";
import ItemsReferenceStackScreen from "../StackScreenComponents/ItemsReferenceStackScreen";
import ShoppingCartStackScreen from "../StackScreenComponents/ShoppingCartStackScreen";

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabBarMain: FC = (): JSX.Element => {
  const ifItemsAdded = useAppSelector(checkIfAnyItemsAdded);
  const { theme } = useTheme();
  const tabBarBadge = ifItemsAdded ? "" : undefined;

  const options = useMemo(() => {
    return {
      ...ShoppingCartOptions,
      tabBarBadge,
    };
  }, [tabBarBadge]);

  enableScreens(false);

  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={{
          ...HEADER_SHOWN_FALSE,
          tabBarStyle: { backgroundColor: theme.colors.background },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={HomeOptions}
        />
        <Tab.Screen
          name="ItemLookup"
          component={ItemLookupStackScreen}
          options={ItemLookupOptions}
        />
        <Tab.Screen
          name="ShoppingCart"
          component={ShoppingCartStackScreen}
          options={options}
        />
        <Tab.Screen
          name="ItemsReference"
          component={ItemsReferenceStackScreen}
          options={ItemsReferenceOptions}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default memo(TabBarMain);
