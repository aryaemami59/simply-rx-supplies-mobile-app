import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { tabBarIconProps } from "../../CustomTypes/types";
import HeaderHomeStackNavigator from "../components/HeaderComponents/HeaderHomeStackNavigator";
import { HeaderRightFC } from "../components/HeaderComponents/HeaderRightComponent";
import TabBarIconHome from "../components/TabBarComponents/TabBarIconHome";
import TabBarIconItemLookup from "../components/TabBarComponents/TabBarIconItemLookup";
import TabBarIconItemsReference from "../components/TabBarComponents/TabBarIconItemsReference";
import TabBarIconShoppingCart from "../components/TabBarComponents/TabBarIconShoppingCart";
import { MAIN_COLOR } from "./sharedStyles";

export const screenOptions: NativeStackNavigationOptions = {
  header: props => <HeaderHomeStackNavigator {...props} />,
} as const;

export const HEADER_SHOWN_FALSE = {
  headerShown: false,
} as const;

export const refHeaderOptions: NativeStackNavigationOptions = {
  headerTitleStyle: { color: "white" },
  headerBackTitleVisible: false,
  headerTintColor: "white",
  headerStyle: { backgroundColor: MAIN_COLOR },
  headerRight: HeaderRightFC,
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
