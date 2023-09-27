import type {
  BottomTabHeaderProps,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import type { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type {
  StackHeaderProps,
  StackScreenProps,
} from "@react-navigation/stack";

// Hardcoded screen names
export const home = "Home" as const;
export const itemLookup = "ItemLookup" as const;
export const shoppingCartStackNavigator = "ShoppingCartStackNavigator" as const;
export const shoppingCartScreen = "ShoppingCartScreen" as const;
export const qrImage = "QRImage" as const;
export const barcodeImage = "BarcodeImage" as const;
export const cartColumnListItems = "CartColumnListItems" as const;
export const itemsReferenceStackNavigator =
  "ItemsReferenceStackNavigator" as const;
export const itemsReferenceScreen = "ItemsReferenceScreen" as const;
export const itemsByVendorListItems = "ItemsByVendorListItems" as const;
export const itemsByCategoryListItems = "ItemsByCategoryListItems" as const;
export const itemsByVendor = "ItemsByVendor" as const;
export const itemsByCategory = "ItemsByCategory" as const;
export const itemDetails = "ItemDetails" as const;

// Param lists for all navigators
export type RootTabParamList = {
  Home: undefined;
  ItemLookup: { inputFocused: boolean };
  ShoppingCartStackNavigator:
    | NavigatorScreenParams<ShoppingCartStackParamList>
    | undefined;
  ItemsReferenceStackNavigator: NavigatorScreenParams<ItemsReferenceStackParamList>;
};

export type ShoppingCartStackParamList = {
  ShoppingCartScreen: undefined;
  QRImage: {
    qrCodeText: string;
    cartId: number;
  };
  BarcodeImage: { src: string; itemId: number };
  CartColumnListItems: { vendorId: number };
  ItemLookup: { inputFocused: boolean };
  ItemDetails: { itemId: number; vendorId: number };
};

export type ItemsReferenceStackParamList = {
  ItemsReferenceScreen: NavigatorScreenParams<ItemsReferenceTopTabParamList>;
  ItemsByVendorListItems: { vendorId: number };
  ItemsByCategoryListItems: { categoryId: number };
};

export type ItemsReferenceTopTabParamList = {
  ItemsByVendor: undefined;
  ItemsByCategory: undefined;
};

// Screen props for all screens
export type RootTabScreenProps<T extends keyof RootTabParamList> =
  BottomTabScreenProps<RootTabParamList, T>;

export type ShoppingCartStackScreenProps<
  T extends keyof ShoppingCartStackParamList,
> = CompositeScreenProps<
  StackScreenProps<ShoppingCartStackParamList, T>,
  RootTabScreenProps<keyof RootTabParamList>
>;

export type ItemsReferenceStackScreenProps<
  T extends keyof ItemsReferenceStackParamList,
> = CompositeScreenProps<
  StackScreenProps<ItemsReferenceStackParamList, T>,
  RootTabScreenProps<keyof RootTabParamList>
>;

export type ItemsReferenceTabScreenProps<
  T extends keyof ItemsReferenceTopTabParamList,
> = CompositeScreenProps<
  MaterialTopTabScreenProps<ItemsReferenceTopTabParamList, T>,
  ItemsReferenceStackScreenProps<keyof ItemsReferenceStackParamList>
>;

export type HeaderHomeStackNavigatorProps =
  | Pick<BottomTabHeaderProps, "navigation" | "route" | "options">
  | Pick<StackHeaderProps, "navigation" | "route" | "options">;
