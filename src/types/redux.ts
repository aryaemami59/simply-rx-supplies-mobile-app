import type {
  CategoriesObjType,
  Category,
  ItemName,
  ItemObjType,
  ItemsObj,
  VendorNameType,
  VendorsObjType,
} from "./api";

export type AddedState = {
  listItems: ItemName[];
  errMsg: string;
  isLoading: boolean;
  itemsArr: ItemName[];
  itemsObj: ItemsObj;
  vendorsArr: VendorNameType[];
  vendorsObj: VendorsObjType;
  categoriesArr: Category[];
  categoriesObj: CategoriesObjType;
};

export type FetchedData = {
  items: ItemObjType[];
  vendors: VendorsObjType;
  categories: CategoriesObjType;
};
