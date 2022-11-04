import { NavigatorScreenParams } from "@react-navigation/native";
import { ItemNumber, ItemName, Src, VendorNameType, Category } from "./types";

const Home = "Home" as const;
const ItemLookup = "ItemLookup" as const;
const ShoppingCartStack = "ShoppingCartStack" as const;
const ShoppingCartScreen = "ShoppingCartScreen" as const;
const QRImage = "QRImage" as const;
const BarcodeImage = "BarcodeImage" as const;
const CartColumnListItems = "CartColumnListItems" as const;

export type RootTabParamList = {
  [Home]: undefined;
  // Home: undefined;
  ItemLookup: undefined;
  ShoppingCartStack:
    | NavigatorScreenParams<ShoppingCartStackParamList>
    | undefined;
  ItemsReference:
    | NavigatorScreenParams<ItemsReferenceStackParamList>
    | undefined;
  // ItemsReference: {
  //   screen: "ItemsReferenceScreen";
  //   params: { screen: "ItemsByVendor" | "ItemsByCategory" } | undefined;
  // };
  ItemsByCategory: undefined;
  ItemsByVendor: undefined;
};

// export type HomeStackParamList = {
//   HomeScreen: undefined;
//   ItemLookup: ItemLookupStackParamList;
//   ShoppingCart: undefined;
//   ItemsReference: {
//     screen: "ItemsReferenceScreen";
//     params: {
//       screen: "ItemsByVendor" | "ItemsByCategory";
//     };
//   };
//   ItemsByCategory: undefined;
//   ItemsByVendor: undefined;
// };

// export type ItemLookupStackParamList = {
//   ItemLookupScreen: { inputFocused: boolean } | undefined;
// };

export type ShoppingCartStackParamList = {
  ShoppingCartScreen: undefined;
  QRImage: {
    itemNumbers: ItemNumber;
    itemsAdded: ItemName[];
  };
  BarcodeImage: { src: Src; itemName: ItemName };
  CartColumnListItems: { vendorName: VendorNameType };
  ItemLookup: undefined;
  ItemDetails: { itemName: ItemName; vendorName: VendorNameType };
};

// export type ItemsByCategoryStackParamList = {
//   ItemsByCategoryScreen: { category: Category };
// };

// export type ItemsByVendorStackParamList = {
//   ItemsByVendorScreen: { vendorName: VendorNameType };
// };

export type ItemsReferenceStackParamList = {
  ItemsReferenceScreen:
    | NavigatorScreenParams<ItemsReferenceTopTabParamList>
    | undefined;
  ItemsByVendorListItems: { vendorName: VendorNameType };
  ItemsByCategoryListItems: { category: Category };
};

// export type ItemsReferenceTabParamList = {

// }

export type ItemsReferenceTopTabParamList = {
  ItemsByVendor: undefined;
  ItemsByCategory: undefined;
  // ItemsByVendor: ItemsByVendorStackParamList;
  // ItemsByCategory: ItemsByCategoryStackParamList;
};
