import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import type { MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import type { StackNavigationOptions } from "@react-navigation/stack";
import { HeaderRightFC } from "../../components/HeaderComponents/HeaderRightComponent";
import {
  stackHeader,
  tabHeader,
} from "../../components/HeaderComponents/Headers";
import {
  homeTabBarIcon,
  itemLookupTabBarIcon,
  itemsReferenceTabBarIcon,
  shoppingCartTabBarIcon,
} from "../../components/TabBarComponents/TabBars";
import type {
  HeaderRight,
  HeaderStyle,
  HeaderTitleStyle,
} from "../../types/missingTypes";
import { MAIN_COLOR } from "../styles/sharedStyles";

const headerShown = false as const;

export const screenTabOptions: BottomTabNavigationOptions = {
  header: tabHeader,
} as const;

export const screenStackOptions: StackNavigationOptions = {
  header: stackHeader,
} as const;

export const HEADER_SHOWN_FALSE: BottomTabNavigationOptions = {
  headerShown,
} as const;
const headerTitleStyle: HeaderTitleStyle = { color: "white" } as const;
const headerBackTitleVisible = false as const;
const headerTintColor = "white" as const;
const headerStyle: HeaderStyle = {
  backgroundColor: MAIN_COLOR,
} as const;
const headerRight: HeaderRight = HeaderRightFC;

export const refHeaderOptions: StackNavigationOptions = {
  headerTitleStyle,
  headerBackTitleVisible,
  headerTintColor,
  headerStyle,
  headerRight,
} as const;

export const itemDetailsOptions = {
  ...refHeaderOptions,
  title: "Item Details",
} as const;

export const itemsByVendorTabOptions: MaterialTopTabNavigationOptions = {
  tabBarLabel: "Items By Vendor",
} as const;

export const itemsByCategoryTabOptions: MaterialTopTabNavigationOptions = {
  tabBarLabel: "Items By Category",
} as const;

export const homeOptions: BottomTabNavigationOptions = {
  ...screenTabOptions,
  header: tabHeader,
  tabBarIcon: homeTabBarIcon,
};

export const itemLookupOptions: BottomTabNavigationOptions = {
  header: tabHeader,
  headerShown,
  // freezeOnBlur: true,
  // lazy: false,
  tabBarIcon: itemLookupTabBarIcon,
} as const;

export const shoppingCartOptions: BottomTabNavigationOptions = {
  tabBarLabel: "Shopping Cart",
  tabBarIcon: shoppingCartTabBarIcon,
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

export const itemsReferenceOptions: BottomTabNavigationOptions = {
  tabBarLabel: "Items Reference",
  tabBarIcon: itemsReferenceTabBarIcon,
  header: tabHeader,
} as const;
