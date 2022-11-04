import {
  BottomTabNavigationOptions,
  BottomTabHeaderProps,
} from "@react-navigation/bottom-tabs";
import { MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import {
  NativeStackHeaderProps,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { tabBarIconProps } from "../../CustomTypes/types";
import HeaderHomeStackNavigator from "../components/HeaderComponents/HeaderHomeStackNavigator";
import { HeaderRightFC } from "../components/HeaderComponents/HeaderRightComponent";
import TabBarIconHome from "../components/TabBarComponents/TabBarIconHome";
import TabBarIconItemLookup from "../components/TabBarComponents/TabBarIconItemLookup";
import TabBarIconItemsReference from "../components/TabBarComponents/TabBarIconItemsReference";
import TabBarIconShoppingCart from "../components/TabBarComponents/TabBarIconShoppingCart";
import { MAIN_COLOR } from "./sharedStyles";

const headerShown = false as const;

// const header = (props: NativeStackHeaderProps | BottomTabHeaderProps) => (
//   <HeaderHomeStackNavigator {...props} />
// );

const stackHeader = (
  props: Pick<NativeStackHeaderProps, "navigation" | "route" | "options">
) => <HeaderHomeStackNavigator {...props} />;
const tabHeader = (
  props: Pick<BottomTabHeaderProps, "navigation" | "route" | "options">
) => <HeaderHomeStackNavigator {...props} />;

// export const screenOptions: NativeStackNavigationOptions = {
//   header: stackHeader,
// } as const;
export const screenTabOptions = {
  header: tabHeader,
} as const;
export const screenStackOptions = {
  header: stackHeader,
} as const;

export const HEADER_SHOWN_FALSE = { headerShown } as const;
const headerTitleStyle = { color: "white" } as const;
const headerBackTitleVisible = false as const;
const headerTintColor = "white" as const;
const headerStyle = { backgroundColor: MAIN_COLOR } as const;
const headerRight = HeaderRightFC;

export const refHeaderOptions: NativeStackNavigationOptions = {
  headerTitleStyle,
  headerBackTitleVisible,
  headerTintColor,
  headerStyle,
  headerRight,
} as const;

const title = "Item Details" as const;

export const itemDetailsOptions = {
  ...refHeaderOptions,
  title,
} as const;

export const itemsByVendorTabOptions: MaterialTopTabNavigationOptions = {
  tabBarLabel: "Items By Vendor",
} as const;

export const itemsByCategoryTabOptions: MaterialTopTabNavigationOptions = {
  tabBarLabel: "Items By Category",
} as const;

export const homeOptions: BottomTabNavigationOptions = {
  tabBarIcon: (props: tabBarIconProps) => <TabBarIconHome {...props} />,
};

export const itemLookupOptions: BottomTabNavigationOptions = {
  headerShown,
  tabBarLabel: "Item Lookup",
  tabBarIcon: (props: tabBarIconProps) => <TabBarIconItemLookup {...props} />,
} as const;

export const shoppingCartOptions: BottomTabNavigationOptions = {
  // headerShown,
  tabBarLabel: "Shopping Cart",
  tabBarIcon: (props: tabBarIconProps) => <TabBarIconShoppingCart {...props} />,
  headerTitle: "Shopping Cart",
  headerTitleAlign: "center",
  // lazy: false,
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
  // lazy: false,
  tabBarIcon: (props: tabBarIconProps) => (
    <TabBarIconItemsReference {...props} />
  ),
  headerTitle: "Items Reference",
  headerTitleAlign: "center",
} as const;
