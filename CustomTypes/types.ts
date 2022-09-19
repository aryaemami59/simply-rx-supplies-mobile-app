import { Dispatch, SetStateAction } from "react";
// import { vendorNameType } from "../src/redux/addedSlice";

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
  VendorItems: { vendorName: vendorNameType };
};

export type ItemsByCategoryStackParamList = {
  ItemsByCategoryScreen: { category: string };
};

export type ItemsByVendorStackParamList = {
  ItemsByVendorScreen: { vendorName: vendorNameType };
};

export type ItemsReferenceStackParamList = {
  ItemsReferenceScreen: undefined;
  ItemsByVendorListItems: { vendorName: vendorNameType };
  ItemsByCategoryListItems: { category: string };
};

export type ItemsReferenceTopTabParamList = {
  ItemsByVendor: ItemsByVendorStackParamList;
  ItemsByCategory: ItemsByCategoryStackParamList;
};

export type myContextInterface = {
  darkTheme: boolean;
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
};

export type itemInterface = {
  readonly id: number;
  readonly name: string;
  readonly itemNumber: string;
  readonly keywords: string[];
  readonly nav: string[];
  readonly vendors: vendorNameType[];
  readonly src: string;
  vendorsToAdd?: vendorNameType[];
  vendorsAdded?: vendorNameType[];
};

export type vendorInterface = {
  id: number;
  officialName: officialVendorNameType;
  abbrName: vendorNameType;
  link: string;
  joinChars: string;
  items: itemInterface[];
};

export type vendorsObjInterface = {
  [key in vendorNameType]: vendorInterface;
};

export type navsObjInterface = {
  [key in vendorNameType]: itemInterface[];
};

export type addedState = {
  listItems: itemInterface[];
  compact: boolean;
  showItemNumber: boolean;
  showItemBarcode: boolean;
  showItemName: boolean;
  vendorsIsLoading: boolean;
  navListIsLoading: boolean;
  errMsg: string;
  vendorsArr?: vendorNameType[];
  vendorsObj?: vendorsObjInterface;
  navsArr?: string[];
  navsObj?: navsObjInterface;
};

export type ItemName = string;

export type vendorNameType =
  | "OI"
  | "GNFR"
  | "SOC"
  | "VS"
  | "MS"
  | "COV"
  | "FORS";

export type officialVendorNameType =
  | "McKesson"
  | "OrderInsite"
  | "GNFR"
  | "Sign Order Catalog"
  | "VaxServe"
  | "MCK MedSurge"
  | "Covap"
  | "FORS";

export type itemState = {
  itemsArr: itemInterface[];
  isLoading: boolean;
  errMsg: string;
};

export type addItemsInterface = {
  itemObj: itemInterface;
  vendors: vendorNameType[];
};

export type addItemsByVendorInterface = {
  itemObj: itemInterface;
  vendorName: vendorNameType;
};

export type OnChangeText = (text: string) => void;
