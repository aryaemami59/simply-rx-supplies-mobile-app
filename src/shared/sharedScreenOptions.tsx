import { MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import { StackNavigationOptions } from "@react-navigation/stack";
import HeaderHomeStackNavigator from "../components/HeaderComponents/HeaderHomeStackNavigator";
import { mainColor } from "./sharedStyles";

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
  headerStyle: { backgroundColor: mainColor },
} as const;

export const itemsByVendorTabOptions: MaterialTopTabNavigationOptions = {
  tabBarLabel: "Items By Vendor",
} as const;

export const itemsByCategoryTabOptions: MaterialTopTabNavigationOptions = {
  tabBarLabel: "Items By Category",
} as const;
