import type {
  BottomTabHeaderProps,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import {
  NativeStackHeaderProps,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Category, ItemName, ItemNumber, Src, VendorNameType } from "./types";

export const Home = "Home" as const;
export const ItemLookup = "ItemLookup" as const;
export const ShoppingCartStack = "ShoppingCartStack" as const;
export const ShoppingCartScreen = "ShoppingCartScreen" as const;
export const QRImage = "QRImage" as const;
export const BarcodeImage = "BarcodeImage" as const;
export const CartColumnListItems = "CartColumnListItems" as const;

export type RootTabParamList = {
  [Home]: undefined;
  // Home: undefined;
  ItemLookup: { inputFocused: boolean } | undefined;
  ShoppingCartStack:
    | NavigatorScreenParams<ShoppingCartStackParamList>
    | undefined;
  ItemsReference:
    | NavigatorScreenParams<ItemsReferenceStackParamList>
    | undefined;
};

export type ShoppingCartStackParamList = {
  ShoppingCartScreen: undefined;
  QRImage: {
    itemNumbers: ItemNumber;
    itemsAdded: ItemName[];
  };
  BarcodeImage: { src: Src; itemName: ItemName };
  CartColumnListItems: { vendorName: VendorNameType };
  ItemLookup: { inputFocused: boolean } | undefined;
  ItemDetails: { itemName: ItemName; vendorName: VendorNameType };
};

export type ItemsReferenceStackParamList = {
  ItemsReferenceScreen:
    | NavigatorScreenParams<ItemsReferenceTopTabParamList>
    | undefined;
  ItemsByVendorListItems: { vendorName: VendorNameType };
  ItemsByCategoryListItems: { category: Category };
};

export type ItemsReferenceTopTabParamList = {
  ItemsByVendor: undefined;
  ItemsByCategory: undefined;
};

export type ShoppingCartStackNavigatorProps = BottomTabScreenProps<
  RootTabParamList,
  "ShoppingCartStack"
>;

export type CartColumnListItemsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ShoppingCartStackParamList, "CartColumnListItems">,
  BottomTabScreenProps<RootTabParamList, "ShoppingCartStack">
>;

export type HomeStackNavigatorProps = BottomTabScreenProps<
  RootTabParamList,
  "Home"
>;

export type BarcodeImageScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ShoppingCartStackParamList, "BarcodeImage">,
  BottomTabScreenProps<RootTabParamList, "ShoppingCartStack">
>;

export type HeaderHomeStackNavigatorProps =
  | Pick<BottomTabHeaderProps, "navigation" | "route" | "options">
  | Pick<NativeStackHeaderProps, "navigation" | "route" | "options">;

export type ItemsReferenceStackNavigatorProps = BottomTabScreenProps<
  RootTabParamList,
  "ItemsReference"
>;

export type ShoppingCartScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ShoppingCartStackParamList, "ShoppingCartScreen">,
  BottomTabScreenProps<RootTabParamList, "ShoppingCartStack">
>;

export type QRImageScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ShoppingCartStackParamList, "QRImage">,
  BottomTabScreenProps<RootTabParamList, "ShoppingCartStack">
>;

export type ItemsReferenceScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ItemsReferenceStackParamList, "ItemsReferenceScreen">,
  BottomTabScreenProps<RootTabParamList, "ItemsReference">
>;

export type ItemsByVendorListItemsProps = CompositeScreenProps<
  NativeStackScreenProps<
    ItemsReferenceStackParamList,
    "ItemsByVendorListItems"
  >,
  BottomTabScreenProps<RootTabParamList, "ItemsReference">
>;

export type CategoryItemsProps = CompositeScreenProps<
  NativeStackScreenProps<
    ItemsReferenceStackParamList,
    "ItemsByCategoryListItems"
  >,
  BottomTabScreenProps<RootTabParamList, "ItemsReference">
>;

export type ItemLookupProps = BottomTabScreenProps<
  RootTabParamList,
  "ItemLookup"
>;

export type ShoppingCartNavigationProps = ShoppingCartScreenProps["navigation"];

export type ItemDetailsScreenProps = NativeStackScreenProps<
  ShoppingCartStackParamList,
  "ItemDetails"
>;

export type ItemsByVendorStackNavigatorProps = CompositeScreenProps<
  MaterialTopTabScreenProps<ItemsReferenceTopTabParamList, "ItemsByVendor">,
  ItemsReferenceScreenProps
>;

export type ItemsByCategoryStackNavigatorProps = CompositeScreenProps<
  MaterialTopTabScreenProps<ItemsReferenceTopTabParamList, "ItemsByCategory">,
  ItemsReferenceScreenProps
>;

export type ItemsByCategoryStackNavigatorNavigationProps =
  ItemsByCategoryStackNavigatorProps["navigation"];

export type ItemsByVendorStackNavigatorNavigationProps =
  ItemsByVendorStackNavigatorProps["navigation"];

// export type RootStackParamList = {
//   Home: NavigatorScreenParams<HomeTabParamList>;
//   PostDetails: { id: string };
//   NotFound: undefined;
// };

// export type RootStackScreenProps<T extends keyof RootStackParamList> =
//   StackScreenProps<RootStackParamList, T>;

// export type HomeTabParamList = {
//   Popular: undefined;
//   Latest: undefined;
// };

// export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
//   CompositeScreenProps<
//     BottomTabScreenProps<HomeTabParamList, T>,
//     RootStackScreenProps<keyof RootStackParamList>
//   >;

// declare global {
//   namespace ReactNavigation {
//     type RootParamList = RootTabParamList;
//   }
// }
