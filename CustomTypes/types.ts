import { Dispatch, SetStateAction } from "react";
import { screenOptions } from "../src/shared/sharedScreenOptions";

export type RootStackParamList = {
  Home: HomeStackParamList;
  ItemLookup: undefined;
  ItemsByCategory: undefined;
  ItemsByVendor: undefined;
  ShoppingCart: undefined;
  ItemsReference: ItemsReferenceTopTabParamList;
};

export type tabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

export type RootTabParamList = {
  Home: HomeStackParamList;
  ItemLookup: ItemLookupStackParamList;
  ShoppingCart: ShoppingCartStackParamList;
  ItemsReference: ItemsReferenceStackParamList;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  ItemLookup: undefined;
  ItemsByVendor: undefined;
  ItemsByCategory: undefined;
};

export type ItemLookupStackParamList = {
  ItemLookupScreen: undefined;
};

export type ShoppingCartStackParamList = {
  ShoppingCartScreen: undefined;
  QRImage: { itemNumbers: string };
  BarcodeImage: { src: string };
  // VendorItems: VendorItemsStackParamList;
  VendorItems: { vendorName: string };
};

// export type VendorItemsStackParamList = {
//   VendorItemsScreen: { vendorName: string };
//   QRImage: { itemNumbers: string };
// };

export type ItemsByCategoryStackParamList = {
  ItemsByCategoryScreen: { category: string };
  // [key: string]: { category: string };
  // CategoryItems: { category: string };
};

export type ItemsByVendorStackParamList = {
  ItemsByVendorScreen: { vendorName: string };
  // } & {
  //   [key: string]: { vendorName: string };
};

export type ItemsReferenceStackParamList = {
  ItemsReferenceScreen: undefined;
  ItemsByVendorListItems: { vendorName: string };
  ItemsByCategoryListItems: { category: string };
};

export type ItemsReferenceTopTabParamList = {
  ItemsByVendor: ItemsByVendorStackParamList;
  ItemsByCategory: ItemsByCategoryStackParamList;
};

export type vendorNameType =
  | "OI"
  | "GNFR"
  | "SOC"
  | "VS"
  | "MS"
  | "COV"
  | "FORS";

export type VendorColumnStackParamList = {
  // VendorItems: { vendorName: string };
};

// export type VendorColumnStackParamList = {
//   VendorItems: { itemNumbers: string };
// };
// export type VendorColumnStackParamList = {
//   MCK: undefined;
//   OI: undefined;
//   GNFR: undefined;
//   SOC: undefined;
//   VS: undefined;
//   MS: undefined;
//   COV: undefined;
//   FORS: undefined;
// };

export interface myContextInterface {
  darkTheme: boolean;
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
}
