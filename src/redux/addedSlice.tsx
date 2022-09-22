import {
  createSlice,
  current,
  createAsyncThunk,
  Reducer,
  AnyAction,
  PayloadAction,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { RootState } from "./store";
import {
  GITHUB_URL_ITEMS,
  GITHUB_URL_VENDORS,
  GITHUB_URL_NAVLIST,
} from "./fetchInfo";
import fetch from "react-native-fetch-polyfill";

import {
  addedState,
  addItemsByVendorInterface,
  addItemsInterface,
  FetchItems,
  FetchNavList,
  FetchVendors,
  ItemObjType,
  itemState,
  navsObjInterface,
  officialVendorNameType,
  vendorNameType,
  vendorsObjInterface,
  Category,
  Link,
} from "../../CustomTypes/types";

const intersection = (firstArray: string[], secondArray: string[]): string[] =>
  firstArray.filter(e => !secondArray.includes(e));

const createAsyncThunkFunc = (strVal: string, githubUrl: string) => {
  return createAsyncThunk(`${strVal}/fetch${strVal}`, async () => {
    const response: Response = await fetch(githubUrl, { timeout: 1000 });
    if (!response.ok) {
      return Promise.reject("Unable to fetch, status: " + response.status);
    }
    const data = await response.json();
    const myItems = await data[strVal];
    return myItems;
  });
};

export const fetchItems: FetchItems = createAsyncThunkFunc(
  "items",
  GITHUB_URL_ITEMS
);

export const fetchVendors: FetchVendors = createAsyncThunkFunc(
  "vendors",
  GITHUB_URL_VENDORS
);

export const fetchNavList: FetchNavList = createAsyncThunkFunc(
  "navs",
  GITHUB_URL_NAVLIST
);

const empty: [] = [];

const initialState: addedState = {
  listItems: empty,
  compact: false,
  showItemNumber: true,
  showItemBarcode: true,
  showItemName: true,
  vendorsIsLoading: true,
  navListIsLoading: true,
  errMsg: "",
};

const itemInitialState = {
  itemsArr: empty,
  isLoading: true,
  errMsg: "",
  vendorsChecked: {},
} as itemState;

export const addedSlice = createSlice({
  name: "added",
  initialState,
  reducers: {
    addItems: (
      state: addedState,
      action: PayloadAction<addItemsInterface>
    ): void => {
      action.payload.vendors.forEach((e: vendorNameType): void => {
        if (!current(state[e])!.includes(action.payload.itemObj)) {
          state[e]!.push(action.payload.itemObj);
          state.listItems = state.listItems.filter(
            ({ name }) => name !== action.payload.itemObj.name
          );
        }
      });
    },
    addItemsByVendor: (
      state: addedState,
      action: PayloadAction<addItemsByVendorInterface>
    ): void => {
      state[action.payload.vendorName]!.push(action.payload.itemObj);
    },
    removeItems: (
      state: addedState,
      action: PayloadAction<addItemsByVendorInterface>
    ) => {
      state[action.payload.vendorName] = state[
        action.payload.vendorName
      ]!.filter(
        ({ name }: ItemObjType) => name !== action.payload.itemObj.name
      );
    },
    setListItems: (
      state: addedState,
      action: PayloadAction<ItemObjType[]>
    ): void => {
      state.listItems = action.payload;
    },
    clearListItems: (state: addedState): void => {
      state.listItems = empty;
    },
    compactSearchResults: (state: addedState): void => {
      state.compact = !state.compact;
    },
    ToggleItemNumber: (state: addedState): void => {
      state.showItemNumber = !state.showItemNumber;
    },
    ToggleItemBarcode: (state: addedState): void => {
      state.showItemBarcode = !state.showItemBarcode;
    },
    ToggleItemName: (state: addedState): void => {
      state.showItemName = !state.showItemName;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchVendors.pending, (state: addedState): void => {
      state.vendorsIsLoading = true;
    });
    builder.addCase(fetchNavList.pending, (state: addedState): void => {
      state.navListIsLoading = true;
    });
    builder.addCase(
      fetchNavList.fulfilled,
      (state: addedState, action: PayloadAction<navsObjInterface>): void => {
        state.navsObj = action.payload;
        const keys = Object.keys(action.payload) as Category[];
        state.navsArr = keys;
        state.navListIsLoading = false;
        state.errMsg = "";
      }
    );
    builder.addCase(
      fetchVendors.fulfilled,
      (state: addedState, action: PayloadAction<vendorsObjInterface>): void => {
        const payload: vendorsObjInterface = action.payload;
        const keys = Object.keys(payload) as vendorNameType[];
        state.vendorsArr = keys;
        state.vendorsObj = payload as vendorsObjInterface;
        let val: vendorNameType;
        for (val in payload) {
          state[val] = empty;
        }
        state.vendorsIsLoading = false;
        state.errMsg = "";
      }
    );
    builder.addCase(fetchVendors.rejected, (state: addedState, action) => {
      state.vendorsIsLoading = false;
      state.errMsg = action.error.message || "Fetch failed";
    });
    builder.addCase(fetchNavList.rejected, (state: addedState, action) => {
      state.navListIsLoading = false;
      state.errMsg = action.error.message || "Fetch failed";
    });
  },
});

export const itemSlice = createSlice({
  name: "item",
  initialState: itemInitialState,
  reducers: {
    setVendors: (
      state: itemState,
      action: PayloadAction<addItemsByVendorInterface>
    ): void => {
      state[action.payload.itemObj.name]!.vendorsToAdd = state[
        action.payload.itemObj.name
      ]!.vendorsToAdd!.includes(action.payload.vendorName)
        ? state[action.payload.itemObj.name]!.vendorsToAdd!.filter(
            (e: vendorNameType) => e !== action.payload.vendorName
          )
        : state[action.payload.itemObj.name]!.vendorsToAdd!.concat(
            action.payload.vendorName
          );
    },
    setVendorsForAllUncheck: (
      state: itemState,
      action: PayloadAction<vendorNameType>
    ) => {
      state.vendorsChecked[action.payload] = false;
      const affectedItems = state.itemsArr
        .filter((e: ItemObjType) => e.vendors!.includes(action.payload))
        .map(({ name }: ItemObjType) => name);
      affectedItems.forEach(e => {
        state[e]!.vendorsToAdd = state[e]!.vendorsToAdd!.filter(
          (e: vendorNameType) => e !== action.payload
        );
      });
    },
    setVendorsForAllCheck: (
      state: itemState,
      action: PayloadAction<vendorNameType>
    ) => {
      state.vendorsChecked[action.payload] = true;
      const affectedItems = state.itemsArr
        .filter((e: ItemObjType) => e.vendors!.includes(action.payload))
        .map(({ name }: ItemObjType) => name);
      affectedItems.forEach(e => {
        !state[e]!.vendorsToAdd.includes(action.payload) &&
          state[e]!.vendorsToAdd.push(action.payload);
      });
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<itemState>) => {
    builder.addCase(fetchItems.pending, (state: itemState) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchItems.fulfilled,
      (state: itemState, action: PayloadAction<ItemObjType[]>): void => {
        for (const itemObj of action.payload) {
          state[itemObj.name] = {
            ...itemObj,
            vendorsToAdd: itemObj.vendors,
            vendorsAdded: empty,
          };
        }
        state.isLoading = false;
        state.errMsg = "";
        state.itemsArr = action.payload;
      }
    );
    builder.addCase(
      fetchVendors.fulfilled,
      (state: itemState, action: PayloadAction<vendorsObjInterface>) => {
        const payload: vendorsObjInterface = action.payload;
        const keys: vendorNameType[] = Object.keys(payload) as vendorNameType[];
        for (const vendorObj of keys) {
          state.vendorsChecked[vendorObj] = true;
        }
      }
    );
    builder.addCase(fetchItems.rejected, (state: itemState, action): void => {
      state.isLoading = false;
      state.errMsg = action.error.message || "Fetch failed";
    });
    builder.addCase(addItems, (state: itemState, action): void => {
      state[action.payload.itemObj.name]!.vendorsAdded = [
        ...state[action.payload.itemObj.name]!.vendorsAdded,
        ...state[action.payload.itemObj.name]!.vendorsToAdd,
      ];
      state[action.payload.itemObj.name]!.vendorsToAdd = state[
        action.payload.itemObj.name
      ]!.vendorsToAdd.length
        ? (intersection(
            action.payload.itemObj.vendors,
            state[action.payload.itemObj.name]!.vendorsAdded
          ) as vendorNameType[])
        : empty;
    });
    builder.addCase(
      addItemsByVendor,
      (state: itemState, action: PayloadAction<addItemsByVendorInterface>) => {
        state[action.payload.itemObj.name]!.vendorsAdded = [
          ...state[action.payload.itemObj.name]!.vendorsAdded,
          action.payload.vendorName,
        ];
        state[action.payload.itemObj.name]!.vendorsToAdd = state[
          action.payload.itemObj.name
        ]!.vendorsToAdd.length
          ? (intersection(
              action.payload.itemObj.vendors,
              state[action.payload.itemObj.name]!.vendorsAdded
            ) as vendorNameType[])
          : empty;
      }
    );
    builder.addCase(
      removeItems,
      (state: itemState, action: PayloadAction<addItemsByVendorInterface>) => {
        state[action.payload.itemObj.name]!.vendorsAdded = state[
          action.payload.itemObj.name
        ]!.vendorsAdded.filter(
          (e: vendorNameType) => e !== action.payload.vendorName
        );
      }
    );
  },
});

export const selectByVendor =
  (vendorName: vendorNameType) =>
  (state: RootState): ItemObjType[] =>
    state.added[vendorName]!;

export const selectVendorsArr = (state: RootState): vendorNameType[] =>
  state.added.vendorsArr ? state.added.vendorsArr : empty;

export const selectVendorsLinks =
  (vendorName: vendorNameType) =>
  (state: RootState): Link =>
    state.added.vendorsObj ? state.added.vendorsObj[vendorName].link : "";

export const selectNavsArr = (state: RootState): Category[] =>
  state.added.navsArr ? state.added.navsArr : empty;

export const addedItemsLength =
  (vendorName: vendorNameType) =>
  (state: RootState): number =>
    state.added[vendorName]!.length;

export const checkIfAddedToOneVendor =
  (itemObj: ItemObjType, vendorName: vendorNameType) =>
  (state: RootState): boolean =>
    state.item[itemObj.name]!.vendorsAdded.includes(vendorName);

export const selectItemsByVendor =
  (vendorName: vendorNameType) =>
  (state: RootState): ItemObjType[] =>
    state.added.vendorsObj ? state.added.vendorsObj[vendorName].items : empty;

export const selectVendorsToAddTo =
  (itemObj: ItemObjType) =>
  (state: RootState): vendorNameType[] =>
    state.item[itemObj.name]!.vendorsToAdd;

export const selectSidebarNavs =
  (category: Category) =>
  (state: RootState): ItemObjType[] =>
    state.added.navsObj ? state.added.navsObj[category] : empty;

export const selectQRCodeContent =
  (vendorName: vendorNameType) =>
  (state: RootState): string =>
    state.added[vendorName]!.map(({ itemNumber }) => itemNumber).join(
      state.added.vendorsObj![vendorName].joinChars
    );

export const checkIfAddedToAllVendors =
  (itemObj: ItemObjType) =>
  (state: RootState): boolean =>
    state.item[itemObj.name]!.vendorsAdded.length === itemObj.vendors.length;

export const checkIfItemAddedToOneVendor =
  (vendorName: vendorNameType, itemObj: ItemObjType) =>
  (state: RootState): boolean =>
    state.item[itemObj.name]!.vendorsAdded.includes(vendorName);

export const selectItemsArr = (state: RootState): ItemObjType[] =>
  state.item.itemsArr;

export const selectVendorOfficialName =
  (vendorName: vendorNameType) =>
  (state: RootState): officialVendorNameType =>
    state.added.vendorsObj![vendorName].officialName;

export const selectAllVendorOfficialNames = (
  state: RootState
): officialVendorNameType[] =>
  state.added.vendorsArr!.map(
    (e: vendorNameType): officialVendorNameType =>
      state.added.vendorsObj![e].officialName
  );

export const checkIfAnyItemsAdded = (state: RootState): boolean =>
  state.added.vendorsArr!.reduce(
    (acc: boolean, curr: vendorNameType): boolean =>
      !!state.added[curr]!.length || acc,
    false
  );

export const checkIfAnyItemsAddedToOneVendor =
  (vendorName: vendorNameType) =>
  (state: RootState): boolean =>
    !!state.added[vendorName]!.length;

export const selectVendorsChecked =
  (vendorName: vendorNameType) =>
  (state: RootState): boolean =>
    state.item!.vendorsChecked[vendorName]!;

export const selectAllListItems = createSelector(
  (state: RootState): ItemObjType[] => state.added.listItems,
  (listItems: ItemObjType[]): ItemObjType[] => listItems
);

export const checkIfLoading = (state: RootState): boolean =>
  state.item.isLoading ||
  state.added.vendorsIsLoading ||
  state.added.navListIsLoading;

export const selectErrMsg = (state: RootState): string =>
  state.item.errMsg || state.added.errMsg;

export const {
  addItems,
  removeItems,
  addItemsByVendor,
  setListItems,
  clearListItems,
  compactSearchResults,
  ToggleItemNumber,
  ToggleItemBarcode,
  ToggleItemName,
} = addedSlice.actions;

export const { setVendors, setVendorsForAllUncheck, setVendorsForAllCheck } =
  itemSlice.actions;

export const itemReducer: Reducer<itemState, AnyAction> = itemSlice.reducer;

export const addedReducer: Reducer<addedState, AnyAction> = addedSlice.reducer;
