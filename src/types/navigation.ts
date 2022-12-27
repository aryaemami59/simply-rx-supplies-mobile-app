import type {
  BottomTabHeaderProps,
  BottomTabNavigationProp,
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
import type {
  Category,
  ItemName,
  ItemNumber,
  Src,
  VendorNameType,
} from "./api";

export const home = "Home" as const;
export type Home = typeof home;
export const itemLookup = "ItemLookup" as const;
export type ItemLookup = typeof itemLookup;
export const shoppingCartStack = "ShoppingCartStack" as const;
export type ShoppingCartStack = typeof shoppingCartStack;
export const shoppingCartScreen = "ShoppingCartScreen" as const;
export type ShoppingCartScreen = typeof shoppingCartScreen;
export const qrImage = "QRImage" as const;
export type QRImage = typeof qrImage;
export const barcodeImage = "BarcodeImage" as const;
export type BarcodeImage = typeof barcodeImage;
export const cartColumnListItems = "CartColumnListItems" as const;
export type CartColumnListItems = typeof cartColumnListItems;
export const itemsReference = "ItemsReference" as const;
export type ItemsReference = typeof itemsReference;
export const itemsReferenceScreen = "ItemsReferenceScreen" as const;
export type ItemsReferenceScreen = typeof itemsReferenceScreen;
export const itemsByVendorListItems = "ItemsByVendorListItems" as const;
export type ItemsByVendorListItems = typeof itemsByVendorListItems;
export const itemsByCategoryListItems = "ItemsByCategoryListItems" as const;
export type ItemsByCategoryListItems = typeof itemsByCategoryListItems;
export const itemsByVendor = "ItemsByVendor" as const;
export type ItemsByVendor = typeof itemsByVendor;
export const itemsByCategory = "ItemsByCategory" as const;
export type ItemsByCategory = typeof itemsByCategory;
export const itemDetails = "ItemDetails" as const;
export type ItemDetails = typeof itemDetails;

export type RootTabParamList = {
  Home: undefined;
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
  ShoppingCartStack
>;

export type CartColumnListItemsScreenProps = CompositeScreenProps<
  StackScreenProps<ShoppingCartStackParamList, CartColumnListItems>,
  BottomTabScreenProps<RootTabParamList, ShoppingCartStack>
>;

export type HomeScreenProps = BottomTabScreenProps<RootTabParamList, Home>;

export type RootTabNavigationProps = BottomTabNavigationProp<RootTabParamList>;

export type BarcodeImageScreenProps = CompositeScreenProps<
  StackScreenProps<ShoppingCartStackParamList, BarcodeImage>,
  BottomTabScreenProps<RootTabParamList, ShoppingCartStack>
>;

export type HeaderHomeStackNavigatorProps =
  | Pick<BottomTabHeaderProps, "navigation" | "route" | "options">
  | Pick<StackHeaderProps, "navigation" | "route" | "options">;

export type ItemsReferenceStackNavigatorProps = BottomTabScreenProps<
  RootTabParamList,
  ItemsReference
>;

export type ShoppingCartScreenProps = CompositeScreenProps<
  StackScreenProps<ShoppingCartStackParamList, ShoppingCartScreen>,
  BottomTabScreenProps<RootTabParamList, ShoppingCartStack>
>;

export type QRImageScreenProps = CompositeScreenProps<
  StackScreenProps<ShoppingCartStackParamList, QRImage>,
  BottomTabScreenProps<RootTabParamList, ShoppingCartStack>
>;

export type ItemsReferenceScreenProps = CompositeScreenProps<
  StackScreenProps<ItemsReferenceStackParamList, ItemsReferenceScreen>,
  BottomTabScreenProps<RootTabParamList, ItemsReference>
>;

export type ItemsByVendorListItemsProps = CompositeScreenProps<
  StackScreenProps<ItemsReferenceStackParamList, ItemsByVendorListItems>,
  BottomTabScreenProps<RootTabParamList, ItemsReference>
>;

export type CategoryItemsProps = CompositeScreenProps<
  StackScreenProps<ItemsReferenceStackParamList, ItemsByCategoryListItems>,
  BottomTabScreenProps<RootTabParamList, ItemsReference>
>;

export type ItemLookupScreenProps = BottomTabScreenProps<
  RootTabParamList,
  ItemLookup
>;

export type ShoppingCartNavigationProps = ShoppingCartScreenProps["navigation"];

export type ItemDetailsScreenProps = StackScreenProps<
  ShoppingCartStackParamList,
  ItemDetails
>;

export type ItemsByVendorScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<ItemsReferenceTopTabParamList, ItemsByVendor>,
  ItemsReferenceScreenProps
>;

export type ItemsByCategoryScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<ItemsReferenceTopTabParamList, ItemsByCategory>,
  ItemsReferenceScreenProps
>;

export type ItemsByCategoryStackNavigatorNavigationProps =
  ItemsByCategoryScreenProps["navigation"];

export type ItemsByVendorStackNavigatorNavigationProps =
  ItemsByVendorScreenProps["navigation"];

export type ItemLookupNavigationProps = ItemLookupScreenProps["navigation"];

export type ItemLookupRouteProps = ItemLookupScreenProps["route"];
