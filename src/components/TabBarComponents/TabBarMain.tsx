import { FC, memo } from "react";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { RootTabParamList, tabBarIconProps } from "../../../CustomTypes/types";
import TabBarIconShoppingCart from "./TabBarIconShoppingCart";
import TabBarIconItemLookup from "./TabBarIconItemLookup";
import TabBarIconHome from "./TabBarIconHome";
import HomeStackScreen from "../StackScreenComponents/HomeStackScreen";
import ItemLookupStackScreen from "../StackScreenComponents/ItemLookupStackScreen";
import ShoppingCartStackScreen from "../StackScreenComponents/ShoppingCartStackScreen";
import ItemsReferenceStackScreen from "../StackScreenComponents/ItemsReferenceStackScreen";
import TabBarIconItemsReference from "./TabBarIconItemsReference";
import { HEADER_SHOWN_FALSE } from "../../shared/sharedScreenOptions";

const Tab = createBottomTabNavigator<RootTabParamList>();

const HomeOptions: BottomTabNavigationOptions = {
  tabBarIcon: (props: tabBarIconProps) => <TabBarIconHome {...props} />,
};

const ItemLookupOptions: BottomTabNavigationOptions = {
  tabBarLabel: "Item Lookup",
  tabBarIcon: (props: tabBarIconProps) => <TabBarIconItemLookup {...props} />,
} as const;

const ShoppingCartOptions: BottomTabNavigationOptions = {
  tabBarLabel: "Shopping Cart",
  tabBarIcon: (props: tabBarIconProps) => <TabBarIconShoppingCart {...props} />,
  headerTitle: "Shopping Cart",
  headerTitleAlign: "center",
} as const;

const ItemsReferenceOptions: BottomTabNavigationOptions = {
  tabBarLabel: "Items Reference",
  tabBarIcon: (props: tabBarIconProps) => (
    <TabBarIconItemsReference {...props} />
  ),
  headerTitle: "Items Reference",
  headerTitleAlign: "center",
} as const;

const TabBarMain: FC = (): JSX.Element => {
  return (
    <Tab.Navigator screenOptions={HEADER_SHOWN_FALSE}>
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
        options={ShoppingCartOptions}
      />
      <Tab.Screen
        name="ItemsReference"
        component={ItemsReferenceStackScreen}
        options={ItemsReferenceOptions}
      />
    </Tab.Navigator>
  );
};

export default memo(TabBarMain);
