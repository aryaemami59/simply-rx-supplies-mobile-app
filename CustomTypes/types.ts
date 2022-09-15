import { Dispatch, SetStateAction } from "react";

export type RootStackParamList = {
  Home: undefined;
  ItemLookup: undefined;
  ItemsByCategory: undefined;
  ItemsByVendor: undefined;
  ShoppingCart: undefined;
  // Tabs: undefined;
  // Login: undefined;
  // Register: undefined;
  // HomeNavigator: undefined;
  // ShoppingCartScreen: undefined;
};

export type tabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

export type RootTabParamList = {
  Home: undefined;
  ItemLookup: undefined;
  ShoppingCart: undefined;
  ItemsReference: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
};

export type ItemLookupStackParamList = {
  ItemLookup: undefined;
};

export type ShoppingCartStackParamList = {
  ShoppingCart: undefined;
};

export type ItemsByCategoryStackParamList = {
  ItemsByCategory: undefined;
};

export type ItemsByVendorStackParamList = {
  ItemsByVendor: undefined;
};

export type ItemsReferenceStackParamList = {
  ItemsReference: undefined;
};

export interface myContextInterface {
  darkTheme: boolean;
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
}
