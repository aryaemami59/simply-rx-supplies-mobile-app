import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import { StackNavigationOptions } from "@react-navigation/stack";
import HeaderHomeStackNavigator from "../components/HeaderComponents/HeaderHomeStackNavigator";
import { MAIN_COLOR } from "./sharedStyles";
import { tabBarIconProps } from "../../CustomTypes/types";
import TabBarIconHome from "../components/TabBarComponents/TabBarIconHome";
import TabBarIconItemLookup from "../components/TabBarComponents/TabBarIconItemLookup";
import TabBarIconShoppingCart from "../components/TabBarComponents/TabBarIconShoppingCart";
import TabBarIconItemsReference from "../components/TabBarComponents/TabBarIconItemsReference";

export const screenOptions: StackNavigationOptions = {
  header: props => <HeaderHomeStackNavigator {...props} />,
} as const;

export const HEADER_SHOWN_FALSE = {
  headerShown: false,
} as const;

export const refHeaderOptions: StackNavigationOptions = {
  headerTitleStyle: { color: "white" },
  headerBackTitleStyle: { color: "white" },
  headerBackTitleVisible: false,
  headerTintColor: "white",
  headerStyle: { backgroundColor: MAIN_COLOR },
} as const;

export const itemsByVendorTabOptions: MaterialTopTabNavigationOptions = {
  tabBarLabel: "Items By Vendor",
} as const;

export const itemsByCategoryTabOptions: MaterialTopTabNavigationOptions = {
  tabBarLabel: "Items By Category",
} as const;

export const HomeOptions: BottomTabNavigationOptions = {
  tabBarIcon: (props: tabBarIconProps) => <TabBarIconHome {...props} />,
};

export const ItemLookupOptions: BottomTabNavigationOptions = {
  tabBarLabel: "Item Lookup",
  tabBarIcon: (props: tabBarIconProps) => <TabBarIconItemLookup {...props} />,
} as const;

export const ShoppingCartOptions: BottomTabNavigationOptions = {
  tabBarLabel: "Shopping Cart",
  tabBarIcon: (props: tabBarIconProps) => <TabBarIconShoppingCart {...props} />,
  headerTitle: "Shopping Cart",
  headerTitleAlign: "center",
  tabBarBadgeStyle: {
    paddingHorizontal: 0,
    maxWidth: 10,
    minWidth: 10,
    minHeight: 10,
    maxHeight: 10,
    borderRadius: 5,
  },
} as const;

export const ItemsReferenceOptions: BottomTabNavigationOptions = {
  tabBarLabel: "Items Reference",
  tabBarIcon: (props: tabBarIconProps) => (
    <TabBarIconItemsReference {...props} />
  ),
  headerTitle: "Items Reference",
  headerTitleAlign: "center",
} as const;
