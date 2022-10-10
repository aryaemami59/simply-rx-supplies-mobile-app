import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
  Reducer,
} from "@reduxjs/toolkit";
import fetch from "react-native-fetch-polyfill";
import { createSelector } from "reselect";
import {
  // GITHUB_URL_CATEGORIES,
  GITHUB_URL_ITEMS,
} from "./fetchInfo";
import { RootState } from "./store";

import {
  AddedState,
  AddItemsByVendorInterface,
  AddItemsInterface,
  Category,
  FetchItems,
  ItemName,
  ItemNumber,
  ItemObjType,
  Link,
  officialVendorNameType as OfficialVendorNameType,
  Src,
  VendorNameType,
} from "../../CustomTypes/types";
// import QRCode from "react-native-qrcode-svg";
import QRCode from "qrcode";

const intersection = (firstArray: string[], secondArray: string[]): string[] =>
  firstArray.filter(e => !secondArray.includes(e));

const createAsyncThunkFunc = (strVal: string, githubUrl: string) =>
  createAsyncThunk(`${strVal}/fetch${strVal}`, async () => {
    const response: Response = await fetch(githubUrl, { timeout: 1000 });
    if (!response.ok) {
      return Promise.reject(`Unable to fetch, status: ${response.status}`);
    }
    return await response.json();
    // const myItems = await data[strVal];
    // return myItems;
  });

export const fetchItems: FetchItems = createAsyncThunkFunc(
  "items",
  GITHUB_URL_ITEMS
);

const emptyObj = {};
const emptyArr: [] = [];

// export const fetchVendors: FetchVendors = createAsyncThunkFunc(
//   "vendors",
//   GITHUB_URL_VENDORS
// );

// export const fetchCategories: FetchCategories = createAsyncThunkFunc(
//   "categories",
//   GITHUB_URL_CATEGORIES
// );

const initialState = {
  listItems: emptyArr,
  // compact: false,
  // showItemNumber: true,
  // showItemBarcode: true,
  // showItemName: true,
  // vendorsIsLoading: true,
  // categoriesIsLoading: true,
  errMsg: "",
  isLoading: true,
  itemsArr: emptyArr,
  itemsObj: emptyObj,
  vendorsArr: emptyArr,
  vendorsObj: emptyObj,
  categoriesArr: emptyArr,
  categoriesObj: emptyObj,
} as unknown as AddedState;

// const itemInitialState = {
//   itemsArr: empty,
//   isLoading: true,
//   errMsg: "",
//   vendorsChecked: {},
// } as itemState;

export const addedSlice = createSlice({
  name: "added",
  initialState,
  reducers: {
    addItems: (state, action: PayloadAction<AddItemsInterface>) => {
      const { itemName, vendorsToAddTo } = action.payload;
      vendorsToAddTo.forEach((vendorName: VendorNameType) => {
        if (
          !current(state.vendorsObj[vendorName])!.itemsAdded!.includes(itemName)
        ) {
          state.vendorsObj[vendorName]!.itemsAdded!.push(itemName);
          const qr = state.vendorsObj[vendorName]!.itemsAdded!.map(
            itemAddedName => state.itemsObj[itemAddedName].itemNumber
          ).join(state.vendorsObj![vendorName].joinChars);
          QRCode.toDataURL(qr, (_err, url) => {
            // err && throw err
            // if (err) {
            //   throw err;
            // }
            state.vendorsObj[vendorName]!.qrContent = url;
          });
          state.vendorsObj[vendorName]!.qrText = qr;
          state.listItems = state.listItems.filter(
            listItemName => listItemName !== itemName
          );
          state.itemsObj[itemName]!.vendorsAdded = [
            ...state.itemsObj[itemName]!.vendorsAdded,
            ...state.itemsObj[itemName]!.vendorsToAdd,
          ];
          state.itemsObj[itemName]!.vendorsToAdd = state.itemsObj[itemName]!
            .vendorsToAdd.length
            ? (intersection(
                state.itemsObj[itemName].vendors,
                state.itemsObj[itemName]!.vendorsAdded
              ) as VendorNameType[])
            : emptyArr;
        }
      });
    },
    addItemsByVendor: (
      state,
      action: PayloadAction<AddItemsByVendorInterface>
    ) => {
      const { itemName, vendorName } = action.payload;
      state.vendorsObj[vendorName].itemsAdded.push(itemName);
      state.itemsObj[itemName].vendorsAdded = [
        ...state.itemsObj[itemName].vendorsAdded,
        vendorName,
      ];
      state.itemsObj[itemName].vendorsToAdd = state.itemsObj[itemName]
        .vendorsToAdd.length
        ? (intersection(
            state.itemsObj[itemName].vendors,
            state.itemsObj[itemName].vendorsAdded
          ) as VendorNameType[])
        : emptyArr;
    },
    removeItems: (state, action: PayloadAction<AddItemsByVendorInterface>) => {
      const { itemName, vendorName } = action.payload;
      state.vendorsObj[vendorName].itemsAdded = state.vendorsObj![
        vendorName
      ].itemsAdded.filter(itemAddedName => itemAddedName !== itemName);
      state.itemsObj[itemName]!.vendorsAdded = state.itemsObj[
        itemName
      ].vendorsAdded.filter(vendor => vendor !== vendorName);
    },
    setListItems: (state, action: PayloadAction<ItemName[]>) => {
      state.listItems = action.payload;
    },
    clearListItems: state => {
      state.listItems = emptyArr;
    },
    setVendors: (state, action: PayloadAction<AddItemsByVendorInterface>) => {
      const { itemName, vendorName } = action.payload;
      state.itemsObj[itemName]!.vendorsToAdd = state.itemsObj[
        itemName
      ]!.vendorsToAdd.includes(action.payload.vendorName)
        ? state.itemsObj[itemName]!.vendorsToAdd.filter(
            vendorNameParam => vendorNameParam !== vendorName
          )
        : state.itemsObj[itemName]!.vendorsToAdd.concat(vendorName);
    },
    setVendorsForAllUncheck: (
      state,
      action: PayloadAction<{ vendorName: VendorNameType }>
    ) => {
      const { vendorName } = action.payload;
      Object.values(state.itemsObj).forEach(({ vendorsToAdd }) => {
        vendorsToAdd.includes(vendorName) ||
          vendorsToAdd.filter(vendor => vendor !== vendorName);
      });
    },
    setVendorsForAllCheck: (
      state,
      action: PayloadAction<{ vendorName: VendorNameType }>
    ) => {
      const { vendorName } = action.payload;
      Object.values(state.itemsObj).forEach(({ vendorsToAdd }) => {
        vendorsToAdd.includes(vendorName) && vendorsToAdd.push(vendorName);
      });
    },
    // compactSearchResults: state => {
    //   state.compact = !state.compact;
    // },
    // ToggleItemNumber: state => {
    //   state.showItemNumber = !state.showItemNumber;
    // },
    // ToggleItemBarcode: state => {
    //   state.showItemBarcode = !state.showItemBarcode;
    // },
    // ToggleItemName: state => {
    //   state.showItemName = !state.showItemName;
    // },
    // ToggleMinimize: (state) => {
    //   state.
    // }
  },
  extraReducers: builder => {
    builder.addCase(fetchItems.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.isLoading = false;
      state.errMsg = action.error.message || "Fetch failed";
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      const { categories, items, vendors } = action.payload;
      state.itemsArr = items.map(({ name }) => name);
      for (const itemObj of items) {
        state.itemsObj![itemObj.name] = {
          ...itemObj,
          vendorsAdded: emptyArr,
          vendorsToAdd: itemObj.vendors,
        };
      }
      state.vendorsArr = Object.keys(vendors) as VendorNameType[];
      for (const vendorObj of Object.values(vendors)) {
        state.vendorsObj[vendorObj.abbrName] = {
          ...vendorObj,
          itemsAdded: emptyArr as ItemName[],
          qrContent: "",
          qrText: "",
        };
      }
      state.categoriesArr = Object.keys(categories) as Category[];
      state.categoriesObj = { ...categories };
      state.isLoading = false;
      state.errMsg = "";
    });
    // builder.addCase(fetchVendors.pending, state => {
    //   state.vendorsIsLoading = true;
    // });
    // builder.addCase(fetchCategories.pending, state => {
    //   state.categoriesIsLoading = true;
    // });
    // builder.addCase(
    //   fetchCategories.fulfilled,
    //   (state, action: PayloadAction<CategoriesObjType>) => {
    //     state.categoriesObj = action.payload;
    //     const keys = Object.keys(action.payload) as Category[];
    //     state.categoriesArr = keys;
    //     state.categoriesIsLoading = false;
    //     state.errMsg = "";
    //   }
    // );
    // builder.addCase(
    //   fetchVendors.fulfilled,
    //   (state, action: PayloadAction<VendorsObjType>) => {
    //     const payload: VendorsObjType = action.payload;
    //     const keys = Object.keys(payload) as VendorNameType[];
    //     state.vendorsArr = keys;
    //     state.vendorsObj = payload as VendorsObjType;
    //     let val: VendorNameType;
    //     for (val in payload) {
    //       state[val] = empty;
    //     }
    //     state.vendorsIsLoading = false;
    //     state.errMsg = "";
    //   }
    // );
    // builder.addCase(fetchVendors.rejected, (state, action) => {
    //   state.vendorsIsLoading = false;
    //   state.errMsg = action.error.message || "Fetch failed";
    // });
    // builder.addCase(fetchCategories.rejected, (state, action) => {
    //   state.categoriesIsLoading = false;
    //   state.errMsg = action.error.message || "Fetch failed";
    // });
  },
});

// export const itemSlice = createSlice({
//   name: "item",
//   initialState: itemInitialState,
//   reducers: {
//     setVendors: (state, action: PayloadAction<AddItemsByVendorInterface>) => {
//       state[action.payload.itemObj.name]!.vendorsToAdd = state[
//         action.payload.itemObj.name
//       ]!.vendorsToAdd!.includes(action.payload.vendorName)
//         ? state[action.payload.itemObj.name]!.vendorsToAdd!.filter(
//             vendorName => vendorName !== action.payload.vendorName
//           )
//         : state[action.payload.itemObj.name]!.vendorsToAdd!.concat(
//             action.payload.vendorName
//           );
//     },
//     setVendorsForAllUncheck: (state, action: PayloadAction<VendorNameType>) => {
//       state.vendorsChecked[action.payload] = false;
//       const affectedItems = state.itemsArr
//         .filter(itemObj => itemObj.vendors!.includes(action.payload))
//         .map(({ name }) => name);
//       affectedItems.forEach(itemName => {
//         state[itemName]!.vendorsToAdd = state[itemName]!.vendorsToAdd!.filter(
//           (vendorName: VendorNameType) => vendorName !== action.payload
//         );
//       });
//     },
//     setVendorsForAllCheck: (state, action: PayloadAction<VendorNameType>) => {
//       state.vendorsChecked[action.payload] = true;
//       const affectedItems = state.itemsArr
//         .filter((itemObj: ItemObjType) =>
//           itemObj.vendors!.includes(action.payload)
//         )
//         .map(({ name }) => name);
//       affectedItems.forEach(itemName => {
//         !state[itemName]!.vendorsToAdd.includes(action.payload) &&
//           state[itemName]!.vendorsToAdd.push(action.payload);
//       });
//     },
//   },
//   extraReducers: builder => {
//     builder.addCase(fetchItems.pending, state => {
//       state.isLoading = true;
//     });
//     builder.addCase(
//       fetchItems.fulfilled,
//       (state, action: PayloadAction<ItemObjType[]>) => {
//         for (const itemObj of action.payload) {
//           state[itemObj.name] = {
//             ...itemObj,
//             vendorsToAdd: itemObj.vendors,
//             vendorsAdded: empty,
//           };
//         }
//         state.isLoading = false;
//         state.errMsg = "";
//         state.itemsArr = action.payload;
//       }
//     );
//     builder.addCase(
//       fetchVendors.fulfilled,
//       (state, action: PayloadAction<VendorsObjType>) => {
//         const payload: VendorsObjType = action.payload;
//         const keys: VendorNameType[] = Object.keys(payload) as VendorNameType[];
//         for (const vendorObj of keys) {
//           state.vendorsChecked[vendorObj] = true;
//         }
//       }
//     );
//     builder.addCase(fetchItems.rejected, (state, action) => {
//       state.isLoading = false;
//       state.errMsg = action.error.message || "Fetch failed";
//     });
//     builder.addCase(addItems, (state, action) => {
//       state[action.payload.itemObj.name]!.vendorsAdded = [
//         ...state[action.payload.itemObj.name]!.vendorsAdded,
//         ...state[action.payload.itemObj.name]!.vendorsToAdd,
//       ];
//       state[action.payload.itemObj.name]!.vendorsToAdd = state[
//         action.payload.itemObj.name
//       ]!.vendorsToAdd.length
//         ? (intersection(
//             action.payload.itemObj.vendors,
//             state[action.payload.itemObj.name]!.vendorsAdded
//           ) as VendorNameType[])
//         : empty;
//     });
//     builder.addCase(
//       addItemsByVendor,
//       (state, action: PayloadAction<AddItemsByVendorInterface>) => {
//         state[action.payload.itemObj.name]!.vendorsAdded = [
//           ...state[action.payload.itemObj.name]!.vendorsAdded,
//           action.payload.vendorName,
//         ];
//         state[action.payload.itemObj.name]!.vendorsToAdd = state[
//           action.payload.itemObj.name
//         ]!.vendorsToAdd.length
//           ? (intersection(
//               action.payload.itemObj.vendors,
//               state[action.payload.itemObj.name]!.vendorsAdded
//             ) as VendorNameType[])
//           : empty;
//       }
//     );
//     builder.addCase(
//       removeItems,
//       (state, action: PayloadAction<AddItemsByVendorInterface>) => {
//         state[action.payload.itemObj.name]!.vendorsAdded = state[
//           action.payload.itemObj.name
//         ]!.vendorsAdded.filter(
//           vendorName => vendorName !== action.payload.vendorName
//         );
//       }
//     );
//   },
// });

// export const selectByVendor =
//   (vendorName: VendorNameType) =>
//   (state: RootState): ItemObjType[] =>
//     state.added[vendorName]!;
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

// export const checkIfAddedToOneVendor =
//   (itemObj: ItemObjType, vendorName: VendorNameType) =>
//   (state: RootState): boolean =>
//     state.added[itemObj.name]!.vendorsAdded.includes(vendorName);

// export const selectItemsByVendor =
//   (vendorName: VendorNameType) =>
//   (state: RootState): ItemObjType[] =>
//     state.added.vendorsObj![vendorName].items.map(
//       (e: number) => state.item.itemsArr.find((f: ItemObjType) => f.id === e)!
// );

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

// export const selectCategories =
//   (category: Category) =>
//   (state: RootState): ItemObjType[] =>
//     state.added.categoriesObj![category].items.map(
//       itemId => state.item.itemsArr.find(({ id }) => id === itemId)!
//     );

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
    state.added.itemsObj[itemName]!.vendorsAdded.includes(vendorName);

export const selectVendorsByItemName =
  (itemName: ItemName) =>
  (state: RootState): VendorNameType[] =>
    state.added.itemsObj[itemName].vendors;

export const checkVendorsToAdd =
  (vendorName: VendorNameType, itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemName]!.vendorsToAdd.includes(vendorName);

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

export const selectItemsArr = (state: RootState): ItemName[] =>
  state.added.itemsArr;

export const selectVendorOfficialName =
  (vendorName: VendorNameType) =>
  (state: RootState): OfficialVendorNameType =>
    state.added.vendorsObj[vendorName].officialName;

export const selectAllVendorOfficialNames = (
  state: RootState
): OfficialVendorNameType[] =>
  state.added.vendorsArr!.map(
    (vendorName: VendorNameType): OfficialVendorNameType =>
      state.added.vendorsObj![vendorName].officialName
  );

export const selectVendorsOfficialNames =
  (vendors: VendorNameType[]) =>
  (state: RootState): OfficialVendorNameType[] =>
    vendors.map(vendorName => state.added.vendorsObj![vendorName].officialName);

export const selectItemsAddedByVendor =
  (vendorName: VendorNameType) => (state: RootState) =>
    state.added.vendorsObj[vendorName].itemsAdded;

export const checkIfAnyItemsAdded = (state: RootState): boolean =>
  Object.values(state.added.vendorsObj)
    .map(({ itemsAdded }) => !!itemsAdded.length)
    .reduce((acc, curr) => curr || acc, false);
// export const checkIfAnyItemsAdded = (state: RootState): boolean =>
//   state.added.vendorsArr!.reduce(
//     (acc: boolean, curr: VendorNameType): boolean =>
//       !!state.added[curr]!.length || acc,
//     false
//   );

export const checkIfAnyItemsAddedToOneVendor =
  (vendorName: VendorNameType) =>
  (state: RootState): boolean =>
    !!state.added.vendorsObj[vendorName].itemsAdded.length;

// export const selectVendorsChecked =
//   (vendorName: VendorNameType) =>
//   (state: RootState): boolean =>
//     state.added.vendorsChecked[vendorName]!;

export const selectAllListItems = createSelector(
  (state: RootState): ItemName[] => state.added.listItems,
  (listItems: ItemName[]): ItemName[] => listItems
);

export const checkIfLoading = (state: RootState): boolean =>
  state.added.isLoading;
// state.added.vendorsIsLoading ||
// state.added.categoriesIsLoading;

export const selectErrMsg = (state: RootState): string => state.added.errMsg;

export const {
  addItems,
  removeItems,
  addItemsByVendor,
  setListItems,
  clearListItems,
  setVendors,
  setVendorsForAllUncheck,
  setVendorsForAllCheck,
  // compactSearchResults,
  // ToggleItemNumber,
  // ToggleItemBarcode,
  // ToggleItemName,
} = addedSlice.actions;

// export const { setVendors, setVendorsForAllUncheck, setVendorsForAllCheck } =
//   itemSlice.actions;

// export const itemReducer: Reducer<itemState, AnyAction> = itemSlice.reducer;

export const addedReducer: Reducer<AddedState, AnyAction> = addedSlice.reducer;
