import { ItemNumber, ItemName, Src, VendorNameType, Category } from "./types";

export type RootTabParamList = {
  Home: undefined;
  ItemLookup: undefined;
  ShoppingCart: undefined;
  ItemsReference: {
    screen: "ItemsReferenceScreen";
    params: { screen: "ItemsByVendor" | "ItemsByCategory" } | undefined;
  };
  ItemsByCategory: undefined;
  ItemsByVendor: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  ItemLookup: ItemLookupStackParamList;
  ShoppingCart: undefined;
  ItemsReference: {
    screen: "ItemsReferenceScreen";
    params: {
      screen: "ItemsByVendor" | "ItemsByCategory";
    };
  };
  ItemsByCategory: undefined;
  ItemsByVendor: undefined;
};

export type ItemLookupStackParamList = {
  ItemLookupScreen: { inputFocused: boolean } | undefined;
};

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

export type ItemsByCategoryStackParamList = {
  ItemsByCategoryScreen: { category: Category };
};

export type ItemsByVendorStackParamList = {
  ItemsByVendorScreen: { vendorName: VendorNameType };
};

export type ItemsReferenceStackParamList = {
  ItemsReferenceScreen: undefined;
  ItemsByVendorListItems: { vendorName: VendorNameType };
  ItemsByCategoryListItems: { category: Category };
};

export type ItemsReferenceTopTabParamList = {
  ItemsByVendor: ItemsByVendorStackParamList;
  ItemsByCategory: ItemsByCategoryStackParamList;
};
