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
export const itemLookup = "ItemLookup" as const;
export const shoppingCartStack = "ShoppingCartStack" as const;
export const shoppingCartScreen = "ShoppingCartScreen" as const;
export const qrImage = "QRImage" as const;
export const barcodeImage = "BarcodeImage" as const;
export const cartColumnListItems = "CartColumnListItems" as const;
export const itemsReference = "ItemsReference" as const;
export const itemsReferenceScreen = "ItemsReferenceScreen" as const;
export const itemsByVendorListItems = "ItemsByVendorListItems" as const;
export const itemsByCategoryListItems = "ItemsByCategoryListItems" as const;
export const itemsByVendor = "ItemsByVendor" as const;
export const itemsByCategory = "ItemsByCategory" as const;
export const itemDetails = "ItemDetails" as const;

export type Home = typeof home;
export type ItemLookup = typeof itemLookup;
export type ShoppingCartStack = typeof shoppingCartStack;
export type ShoppingCartScreen = typeof shoppingCartScreen;
export type QRImage = typeof qrImage;
export type BarcodeImage = typeof barcodeImage;
export type CartColumnListItems = typeof cartColumnListItems;
export type ItemsReference = typeof itemsReference;
export type ItemsReferenceScreen = typeof itemsReferenceScreen;
export type ItemsByVendorListItems = typeof itemsByVendorListItems;
export type ItemsByCategoryListItems = typeof itemsByCategoryListItems;
export type ItemsByVendor = typeof itemsByVendor;
export type ItemsByCategory = typeof itemsByCategory;
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

export type RootTabScreenProps<T extends keyof RootTabParamList> =
  BottomTabScreenProps<RootTabParamList, T>;

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

// export type ShoppingCartStackScreenProps<
//   T extends keyof ShoppingCartStackParamList
// > = BottomTabScreenProps<ShoppingCartStackParamList, T>;

export type ShoppingCartStackScreenProps<
  T extends keyof ShoppingCartStackParamList
> = CompositeScreenProps<
  StackScreenProps<ShoppingCartStackParamList, T>,
  RootTabScreenProps<keyof RootTabParamList>
>;

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

// export type HeaderHomeStackNavigatorProps<
//   T extends BottomTabHeaderProps | StackHeaderProps
// > = Pick<T, "navigation" | "route" | "options">;
export type HeaderHomeStackNavigatorProps =
  | Pick<BottomTabHeaderProps, "navigation" | "route" | "options">
  | Pick<StackHeaderProps, "navigation" | "route" | "options">;

export type ItemsReferenceStackNavigatorProps<
  T extends keyof ItemsReferenceStackParamList
> = CompositeScreenProps<
  StackScreenProps<ItemsReferenceStackParamList, T>,
  RootTabScreenProps<keyof RootTabParamList>
>;
// export type ItemsReferenceStackNavigatorProps = BottomTabScreenProps<
//   RootTabParamList,
//   ItemsReference
// >;

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

// export type ShoppingCartNavigationProps = ShoppingCartScreenProps["navigation"];

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

// export type ItemsByCategoryScreenNavigationProp =
//   ItemsByCategoryScreenProps["navigation"];

// export type ItemsByVendorScreenNavigationProp =
//   ItemsByVendorScreenProps["navigation"];

// export type ItemLookupNavigationProps = ItemLookupScreenProps["navigation"];

// export type ItemLookupRouteProps = ItemLookupScreenProps["route"];

// declare module "@react-navigation/core" {
//   type RootParamList = {} & RootTabParamList;
// }

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
    interface RootParamList extends RootTabParamList {}
  }
}

// declare global {
//   namespace ReactNavigation {
//     type RootParamList = RootTabParamList;
//   }
// }
