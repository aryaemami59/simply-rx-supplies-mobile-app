import { NavigatorScreenParams } from "@react-navigation/native";
import { ItemNumber, ItemName, Src, VendorNameType, Category } from "./types";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

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
  // ItemsByCategory: undefined;
  // ItemsByVendor: undefined;
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
