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
  // Home: undefined;
  HomeScreen: undefined;
};

export type ItemLookupStackParamList = {
  ItemLookupScreen: undefined;
};

export type ShoppingCartStackParamList = {
  // ShoppingCartScreen: string;
  ShoppingCartScreen: undefined;
} & {
  [key: string]: { vendorName: string };
  // ShoppingCartScreen: VendorColumnStackParamList;
  // ShoppingCartScreen: undefined;
};

export type ItemsByCategoryStackParamList = {
  ItemsByCategoryScreen: undefined;
};

export type ItemsByVendorStackParamList = {
  ItemsByVendorScreen: undefined;
} & {
  [key: string]: { vendorName: string };
};

export type ItemsReferenceStackParamList = {
  ItemsReferenceScreen: ItemsReferenceTopTabParamList;
} & {
  [key: string]: { vendorName: string };
} & {
  [key: string]: { category: string };
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
  [key: string]: { vendorName: string };
  // OI: { vendorName: string };
  // GNFR: { vendorName: string };
  // SOC: { vendorName: string };
  // VS: { vendorName: string };
  // MS: { vendorName: string };
  // COV: { vendorName: string };
  // FORS: { vendorName: string };
};
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