import {
  createSlice,
  current,
  createAsyncThunk,
  Reducer,
  AnyAction,
  PayloadAction,
  ActionReducerMapBuilder,
  AsyncThunk,
  AsyncThunkAction,
} from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { AppDispatch, RootState } from "./store";
import {
  GITHUB_URL_ITEMS,
  GITHUB_URL_VENDORS,
  GITHUB_URL_NAVLIST,
} from "./fetchInfo";
import {
  addedState,
  addItemsByVendorInterface,
  addItemsInterface,
  itemInterface,
  itemState,
  navsObjInterface,
  officialVendorNameType,
  vendorNameType,
  vendorsObjInterface,
} from "../../CustomTypes/types";

const intersection = (firstArray: string[], secondArray: string[]): string[] =>
  firstArray.filter(e => !secondArray.includes(e));

const createAsyncThunkFunc = (strVal: string, githubUrl: string) => {
  return createAsyncThunk(`${strVal}/fetch${strVal}`, async () => {
    const response: Response = await fetch(githubUrl);
    if (!response.ok) {
      return Promise.reject("Unable to fetch, status: " + response.status);
    }
    const data = await response.json();
    const myItems = await data[strVal];
    return myItems;
  });
};

// export const fetchItems: AsyncThunk<
//   itemInterface[],
//   void,
//   { state: itemState }
// > = createAsyncThunk(`${"items"}/fetch${"items"}`, async () => {
//   const response: Response = await fetch(GITHUB_URL_ITEMS);
//   if (!response.ok) {
//     return Promise.reject("Unable to fetch, status: " + response.status);
//   }
//   const data = await response.json();
//   const myItems = await data["items"];
//   return myItems;
// });
// export const fetchVendors = createAsyncThunk(
//   `${"vendors"}/fetch${"vendors"}`,
//   async () => {
//     const response: Response = await fetch(GITHUB_URL_ITEMS);
//     if (!response.ok) {
//       return Promise.reject("Unable to fetch, status: " + response.status);
//     }
//     const data = await response.json();
//     const myItems = await data["vendors"];
//     return myItems;
//   }
// );
// export const fetchNavList = createAsyncThunk(
//   `${"navs"}/fetch${"navs"}`,
//   async () => {
//     const response: Response = await fetch(GITHUB_URL_ITEMS);
//     if (!response.ok) {
//       return Promise.reject("Unable to fetch, status: " + response.status);
//     }
//     const data = await response.json();
//     const myItems = await data["navs"];
//     return myItems;
//   }
// );
// export const fetchItems = createAsyncThunkFunc("items", GITHUB_URL_ITEMS);
export const fetchItems: AsyncThunk<
  itemInterface[],
  void,
  { dispatch: AppDispatch }
> = createAsyncThunkFunc("items", GITHUB_URL_ITEMS);

export const fetchVendors: AsyncThunk<
  vendorsObjInterface,
  void,
  { dispatch: AppDispatch }
> = createAsyncThunkFunc("vendors", GITHUB_URL_VENDORS);

export const fetchNavList: AsyncThunk<
  navsObjInterface,
  void,
  { dispatch: AppDispatch }
> = createAsyncThunkFunc("navs", GITHUB_URL_NAVLIST);

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
        if (!current(state[e]).includes(action.payload.itemObj)) {
          state[e].push(action.payload.itemObj);
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
      state[action.payload.vendorName].push(action.payload.itemObj);
    },
    removeItems: (
      state: addedState,
      action: PayloadAction<addItemsByVendorInterface>
    ) => {
      state[action.payload.vendorName] = state[
        action.payload.vendorName
      ].filter(
        ({ name }: itemInterface) => name !== action.payload.itemObj.name
      );
    },
    setListItems: (
      state: addedState,
      action: PayloadAction<itemInterface[]>
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
        state.navsArr = Object.keys(action.payload);
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
      state[action.payload.itemObj.name].vendorsToAdd = state[
        action.payload.itemObj.name
      ].vendorsToAdd.includes(action.payload.vendorName)
        ? state[action.payload.itemObj.name].vendorsToAdd.filter(
            (e: vendorNameType) => e !== action.payload.vendorName
          )
        : state[action.payload.itemObj.name].vendorsToAdd.concat(
            action.payload.vendorName
          );
    },
    setVendorsForAll: (
      state: itemState,
      action: PayloadAction<vendorNameType>
    ) => {
      const affectedItems = state.itemsArr
        .filter((e: itemInterface) => e.vendors!.includes(action.payload))
        .map(({ name }: itemInterface) => name);
      affectedItems.forEach(e => {
        state[e].vendorsToAdd = state[e].vendorsToAdd.filter(
          (e: vendorNameType) => e !== action.payload
        );
      });
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<itemState>) => {
    builder.addCase(fetchItems.pending, (state: itemState) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchItems.fulfilled,
      (state: itemState, action: PayloadAction<itemInterface[]>): void => {
        for (const itemObj of action.payload) {
          state[itemObj.name] = {
            vendorsToAdd: itemObj.vendors,
            vendorsAdded: empty,
          };
        }
        state.isLoading = false;
        state.errMsg = "";
        state.itemsArr = action.payload;
      }
    );
    builder.addCase(fetchItems.rejected, (state: itemState, action): void => {
      state.isLoading = false;
      state.errMsg = action.error.message || "Fetch failed";
    });
    builder.addCase(addItems, (state: itemState, action): void => {
      state[action.payload.itemObj.name].vendorsAdded = [
        ...state[action.payload.itemObj.name].vendorsAdded,
        ...state[action.payload.itemObj.name].vendorsToAdd,
      ];
      state[action.payload.itemObj.name].vendorsToAdd = state[
        action.payload.itemObj.name
      ].vendorsToAdd.length
        ? intersection(
            action.payload.itemObj.vendors,
            state[action.payload.itemObj.name].vendorsAdded
          )
        : empty;
    });
    builder.addCase(
      addItemsByVendor,
      (state: itemState, action: PayloadAction<addItemsByVendorInterface>) => {
        state[action.payload.itemObj.name].vendorsAdded = [
          ...state[action.payload.itemObj.name].vendorsAdded,
          action.payload.vendorName,
        ];
        state[action.payload.itemObj.name].vendorsToAdd = state[
          action.payload.itemObj.name
        ].vendorsToAdd.length
          ? intersection(
              action.payload.itemObj.vendors,
              state[action.payload.itemObj.name].vendorsAdded
            )
          : empty;
      }
    );
    builder.addCase(
      removeItems,
      (state: itemState, action: PayloadAction<addItemsByVendorInterface>) => {
        state[action.payload.itemObj.name].vendorsAdded = state[
          action.payload.itemObj.name
        ].vendorsAdded.filter((e: string) => e !== action.payload.vendorName);
      }
    );
  },
});

export const selectByVendor =
  (vendorName: vendorNameType) =>
  (state: RootState): itemInterface[] =>
    state.added[vendorName];

export const selectVendorsArr = (state: RootState): vendorNameType[] =>
  state.added.vendorsArr ? state.added.vendorsArr : empty;

export const selectVendorsLinks =
  (vendorName: vendorNameType) =>
  (state: RootState): string =>
    state.added.vendorsObj ? state.added.vendorsObj[vendorName].link : "";

export const selectNavsArr = (state: RootState): string[] =>
  state.added.navsArr ? state.added.navsArr : empty;

export const addedItemsLength =
  (vendorName: vendorNameType) =>
  (state: RootState): number =>
    state.added[vendorName].length;

export const checkIfAddedToOneVendor =
  (itemObj: itemInterface, vendorName: vendorNameType) =>
  (state: RootState): boolean =>
    state.item[itemObj.name].vendorsAdded.includes(vendorName);

export const selectItemsByVendor =
  (vendorName: vendorNameType) =>
  (state: RootState): itemInterface[] =>
    state.added.vendorsObj ? state.added.vendorsObj[vendorName].items : empty;

export const selectVendorsToAddTo =
  (itemObj: itemInterface) =>
  (state: RootState): vendorNameType[] =>
    state.item[itemObj.name].vendorsToAdd;

export const selectSidebarNavs =
  (category: string) =>
  (state: RootState): itemInterface[] =>
    state.added.navsObj ? state.added.navsObj[category] : empty;

export const selectQRCodeContent =
  (vendorName: vendorNameType) =>
  (state: RootState): string =>
    state.added[vendorName]
      .map(({ itemNumber }) => itemNumber)
      .join(state.added.vendorsObj![vendorName].joinChars);

export const checkIfAddedToAllVendors =
  (itemObj: itemInterface) =>
  (state: RootState): boolean =>
    state.item[itemObj.name].vendorsAdded.length === itemObj.vendors.length;

export const checkIfItemAddedToOneVendor =
  (vendorName: vendorNameType, itemObj: itemInterface) =>
  (state: RootState): boolean =>
    state.item[itemObj.name].vendorsAdded.includes(vendorName);

export const selectItemsArr = (state: RootState): itemInterface[] =>
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
      !!state.added[curr].length || acc,
    false
  );

export const selectAllListItems = createSelector(
  (state: RootState): itemInterface[] => state.added.listItems,
  (listItems: itemInterface[]): itemInterface[] => listItems
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

export const { setVendors, setVendorsForAll } = itemSlice.actions;

export const itemReducer: Reducer<itemState, AnyAction> = itemSlice.reducer;

export const addedReducer: Reducer<addedState, AnyAction> = addedSlice.reducer;
