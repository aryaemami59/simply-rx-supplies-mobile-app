import { Dispatch, SetStateAction } from "react";

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
  Home: undefined;
  ItemLookup: undefined;
  ShoppingCart: undefined;
  ItemsReference: undefined;
};

export type HomeStackParamList = {
  // Home: undefined;
  HomeScreen: undefined;
};

export type ItemLookupStackParamList = {
  ItemLookupScreen: undefined;
};

export type ShoppingCartStackParamList = {
  ShoppingCartScreen: undefined;
};

export type ItemsByCategoryStackParamList = {
  ItemsByCategoryScreen: undefined;
};

export type ItemsByVendorStackParamList = {
  ItemsByVendorScreen: undefined;
};

export type ItemsReferenceStackParamList = {
  ItemsReferenceScreen: undefined;
};

export type ItemsReferenceTopTabParamList = {
  ItemsByVendor: ItemsByVendorStackParamList;
  ItemsByCategory: ItemsByCategoryStackParamList;
};

export interface myContextInterface {
  darkTheme: boolean;
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
}
