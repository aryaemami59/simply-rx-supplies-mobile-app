import { createSelector } from "reselect";
import {
  VendorNameType,
  ItemName,
  Category,
  ItemObjType,
  ItemNumber,
  Src,
  OfficialVendorNameType,
  Link,
} from "../../CustomTypes/types";
import { RootState } from "./store";

export const selectAddedItemsByVendor =
  (vendorName: VendorNameType) =>
  (state: RootState): ItemName[] =>
    state.added.vendorsObj[vendorName].itemsAdded;

export const selectVendorsArr = (state: RootState): VendorNameType[] =>
  state.added.vendorsArr;

export const selectVendorsLinks =
  (vendorName: VendorNameType) =>
  (state: RootState): Link =>
    state.added.vendorsObj[vendorName].link;

export const selectCategoriesArr = (state: RootState): Category[] =>
  state.added.categoriesArr;

export const addedItemsLength =
  (vendorName: VendorNameType) =>
  (state: RootState): number =>
    state.added.vendorsObj[vendorName].itemsAdded.length;

export const selectItemNamesByVendor =
  (vendorName: VendorNameType) => (state: RootState) =>
    Object.values(state.added.itemsObj)
      .filter(({ vendors }) => vendors.includes(vendorName))
      .map(({ name }) => name);

export const selectVendorsToAddTo =
  (itemName: ItemName) =>
  (state: RootState): VendorNameType[] =>
    state.added.itemsObj[itemName].vendorsToAdd;

export const selectItemObjByName =
  (itemName: ItemName) =>
  (state: RootState): ItemObjType =>
    state.added.itemsObj[itemName];

export const selectCategoriesItemNames =
  (categoryParam: Category) =>
  (state: RootState): ItemName[] =>
    Object.values(state.added.itemsObj)
      .filter(({ category }) => category.includes(categoryParam))
      .map(({ name }) => name);

export const selectQRCodeContent =
  (vendorName: VendorNameType) =>
  (state: RootState): string =>
    state.added.vendorsObj[vendorName].qrContent;

export const selectQRText =
  (vendorName: VendorNameType) => (state: RootState) =>
    state.added.vendorsObj[vendorName].qrText;

export const checkIfAddedToAllVendors =
  (itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemName].vendorsAdded.length ===
    state.added.itemsObj[itemName].vendors.length;

export const checkIfItemAddedToOneVendor =
  (vendorName: VendorNameType, itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemName].vendorsAdded.includes(vendorName);

export const selectVendorsByItemName =
  (itemName: ItemName) =>
  (state: RootState): VendorNameType[] =>
    state.added.itemsObj[itemName].vendors;

export const checkVendorsToAdd =
  (vendorName: VendorNameType, itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemName].vendorsToAdd.includes(vendorName);

export const selectItemNumber =
  (itemName: ItemName) =>
  (state: RootState): ItemNumber =>
    state.added.itemsObj[itemName].itemNumber;

export const selectItemSrc =
  (itemName: ItemName) =>
  (state: RootState): Src =>
    state.added.itemsObj[itemName].src;

export const checkVendorsAdded =
  (vendorName: VendorNameType, itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemName].vendorsAdded.includes(vendorName);

export const selectItemNamesArr = (state: RootState): ItemName[] =>
  state.added.itemsArr;

export const selectVendorOfficialName =
  (vendorName: VendorNameType) =>
  (state: RootState): OfficialVendorNameType =>
    state.added.vendorsObj[vendorName].officialName;

export const selectAllVendorOfficialNames = (
  state: RootState
): OfficialVendorNameType[] =>
  state.added.vendorsArr.map(
    (vendorName: VendorNameType): OfficialVendorNameType =>
      state.added.vendorsObj[vendorName].officialName
  );

export const selectVendorsOfficialNames =
  (vendors: VendorNameType[]) =>
  (state: RootState): OfficialVendorNameType[] =>
    vendors.map(vendorName => state.added.vendorsObj[vendorName].officialName);

export const selectItemsAddedByVendor =
  (vendorName: VendorNameType) => (state: RootState) =>
    state.added.vendorsObj[vendorName].itemsAdded;

export const checkIfAnyItemsAdded = (state: RootState): boolean =>
  Object.values(state.added.vendorsObj)
    .map(({ itemsAdded }) => !!itemsAdded.length)
    .reduce((acc, curr) => curr || acc, false);

export const checkIfAnyItemsAddedToOneVendor =
  (vendorName: VendorNameType) =>
  (state: RootState): boolean =>
    !!state.added.vendorsObj[vendorName].itemsAdded.length;

export const selectAllListItems = createSelector(
  (state: RootState): ItemName[] => state.added.listItems,
  (listItems: ItemName[]): ItemName[] => listItems
);

export const checkIfLoading = (state: RootState): boolean =>
  state.added.isLoading;

export const selectErrMsg = (state: RootState): string => state.added.errMsg;
