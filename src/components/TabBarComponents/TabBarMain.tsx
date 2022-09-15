import { FC, memo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabParamList, tabBarIconProps } from "../../../CustomTypes/types";
import TabBarIconShoppingCart from "./TabBarIconShoppingCart";
import TabBarIconItemLookup from "./TabBarIconItemLookup";
import TabBarIconHome from "./TabBarIconHome";
import HomeStackScreen from "../StackScreenComponents/HomeStackScreen";
import ItemLookupStackScreen from "../StackScreenComponents/ItemLookupStackScreen";
import ShoppingCartStackScreen from "../StackScreenComponents/ShoppingCartStackScreen";

const TabBarIconHomeRender = (props: tabBarIconProps): JSX.Element => (
  <TabBarIconHome {...props} />
);

const TabBarIconShoppingCartRender = (props: tabBarIconProps): JSX.Element => (
  <TabBarIconShoppingCart {...props} />
);

const TabBarIconItemLookupRender = (props: tabBarIconProps): JSX.Element => (
  <TabBarIconItemLookup {...props} />
);

const HomeOptions = {
  tabBarIcon: TabBarIconHomeRender,
} as const;

const ItemLookupOptions = {
  tabBarLabel: "Item Lookup",
  tabBarIcon: TabBarIconItemLookupRender,
} as const;

const Tab = createBottomTabNavigator<RootTabParamList>();

const hideHeader = {
  headerShown: false,
} as const;

const ShoppingCartOptions = {
  tabBarLabel: "Shopping Cart",
  tabBarIcon: TabBarIconShoppingCartRender,
  headerTitle: "Shopping Cart",
  headerTitleAlign: "center",
} as const;

const TabBarMain: FC = (): JSX.Element => {
  return (
    <Tab.Navigator screenOptions={hideHeader}>
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
    </Tab.Navigator>
  );
};

export default memo(TabBarMain);
