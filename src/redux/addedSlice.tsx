import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import GITHUB_URL_ITEMS from "../data/fetchInfo";
import type {
  Category,
  ItemName,
  VendorAndItemName,
  VendorNameType,
} from "../types/api";
import type { AddedState, FetchedData } from "../types/redux";
import difference from "../utils/difference";
import emptyArr from "../utils/emptyArr";
import emptyObj from "../utils/emptyObj";

export const fetchItems = createAsyncThunk<FetchedData>(
  `items/fetchitems`,
  async () => {
    try {
      const response = await axios.get<FetchedData>(GITHUB_URL_ITEMS, {
        timeout: 1000,
      });
      return response.data;
    } catch (err) {
      throw axios.isAxiosError(err) ? err.message : "Unable to fetch";
    }
  }
);

const initialState = {
  listItems: emptyArr,
  errMsg: "",
  isLoading: true,
  itemsArr: emptyArr,
  itemsObj: emptyObj,
  vendorsArr: emptyArr,
  vendorsObj: emptyObj,
  categoriesArr: emptyArr,
  categoriesObj: emptyObj,
} as unknown as AddedState;

export const addedSlice = createSlice({
  name: "added",
  initialState,
  reducers: {
    addItems: (state, { payload: itemName }: PayloadAction<ItemName>) => {
      if (
        !state.itemsObj[itemName].vendorsToAdd.length ||
        state.itemsObj[itemName].vendorsAdded.length ===
          state.itemsObj[itemName].vendors.length
      ) {
        return;
      }
      state.itemsObj[itemName].vendorsToAdd.forEach(
        (vendorName: VendorNameType) => {
          if (
            !current(state.vendorsObj[vendorName]).itemsAdded.includes(itemName)
          ) {
            state.vendorsObj[vendorName].itemsAdded.push(itemName);
            const qr = state.vendorsObj[vendorName].itemsAdded
              .map(itemAddedName => state.itemsObj[itemAddedName].itemNumber)
              .join(state.vendorsObj[vendorName].joinChars);
            state.vendorsObj[vendorName].qrContent = qr;
            state.vendorsObj[vendorName].qrText = qr;
            state.listItems = state.listItems.filter(
              listItemName => listItemName !== itemName
            );
            state.itemsObj[itemName].vendorsAdded = [
              ...state.itemsObj[itemName].vendorsAdded,
              ...state.itemsObj[itemName].vendorsToAdd,
            ];
            state.itemsObj[itemName].vendorsToAdd = state.itemsObj[itemName]
              .vendorsToAdd.length
              ? difference(
                  state.itemsObj[itemName].vendors,
                  state.itemsObj[itemName].vendorsAdded
                )
              : emptyArr;
          }
        }
      );
    },
    addItemsByVendor: (state, action: PayloadAction<VendorAndItemName>) => {
      const { itemName, vendorName } = action.payload;
      state.vendorsObj[vendorName].itemsAdded.push(itemName);
      state.itemsObj[itemName].vendorsAdded = [
        ...state.itemsObj[itemName].vendorsAdded,
        vendorName,
      ];
      state.itemsObj[itemName].vendorsToAdd = state.itemsObj[itemName]
        .vendorsToAdd.length
        ? difference(
            state.itemsObj[itemName].vendors,
            state.itemsObj[itemName].vendorsAdded
          )
        : emptyArr;
      const qr = state.vendorsObj[vendorName].itemsAdded
        .map(itemAddedName => state.itemsObj[itemAddedName].itemNumber)
        .join(state.vendorsObj[vendorName].joinChars);
      state.vendorsObj[vendorName].qrContent = qr;
      state.vendorsObj[vendorName].qrText = qr;
    },
    removeItems: (state, action: PayloadAction<VendorAndItemName>) => {
      const { itemName, vendorName } = action.payload;
      state.vendorsObj[vendorName].itemsAdded = state.vendorsObj[
        vendorName
      ].itemsAdded.filter(itemAddedName => itemAddedName !== itemName);
      state.itemsObj[itemName].vendorsAdded = state.itemsObj[
        itemName
      ].vendorsAdded.filter(vendor => vendor !== vendorName);
      const qr = state.vendorsObj[vendorName].itemsAdded
        .map(itemAddedName => state.itemsObj[itemAddedName].itemNumber)
        .join(state.vendorsObj[vendorName].joinChars);
      state.vendorsObj[vendorName].qrContent = qr;
      state.vendorsObj[vendorName].qrText = qr;
    },
    setListItems: (state, action: PayloadAction<ItemName[]>) => {
      state.listItems = action.payload;
    },
    clearListItems: state => {
      state.listItems = emptyArr;
    },
    setVendors: (state, action: PayloadAction<VendorAndItemName>) => {
      const { itemName, vendorName } = action.payload;
      state.itemsObj[itemName].vendorsToAdd = state.itemsObj[
        itemName
      ].vendorsToAdd.includes(action.payload.vendorName)
        ? state.itemsObj[itemName].vendorsToAdd.filter(
            vendorNameParam => vendorNameParam !== vendorName
          )
        : state.itemsObj[itemName].vendorsToAdd.concat(vendorName);
    },
    setVendorsForAllUncheck: (
      state,
      { payload: vendorName }: PayloadAction<VendorNameType>
    ) => {
      state.itemsArr.forEach(itemName => {
        if (
          state.itemsObj[itemName].vendorsToAdd.indexOf(vendorName) ===
          state.itemsObj[itemName].vendorsToAdd.length - 1
        ) {
          state.itemsObj[itemName].vendorsToAdd.pop();
        } else if (
          state.itemsObj[itemName].vendorsToAdd.indexOf(vendorName) === 0
        ) {
          state.itemsObj[itemName].vendorsToAdd.shift();
        } else if (state.itemsObj[itemName].vendorsToAdd.includes(vendorName)) {
          state.itemsObj[itemName].vendorsToAdd = state.itemsObj[
            itemName
          ].vendorsToAdd.filter(vendor => vendor !== vendorName);
        }
      });
      // let itemName: ItemName;
      // for (itemName in state.itemsObj) {
      //   if (
      //     state.itemsObj[itemName].vendorsToAdd.indexOf(vendorName) ===
      //     state.itemsObj[itemName].vendorsToAdd.length - 1
      //   ) {
      //     state.itemsObj[itemName].vendorsToAdd.pop();
      //   } else if (
      //     state.itemsObj[itemName].vendorsToAdd.indexOf(vendorName) === 0
      //   ) {
      //     state.itemsObj[itemName].vendorsToAdd.shift();
      //   } else if (state.itemsObj[itemName].vendorsToAdd.includes(vendorName)) {
      //     state.itemsObj[itemName].vendorsToAdd = state.itemsObj[
      //       itemName
      //     ].vendorsToAdd.filter(vendor => vendor !== vendorName);
      //   }
      // }
    },
    setVendorsForAllCheck: (
      state,
      { payload: vendorName }: PayloadAction<VendorNameType>
    ) => {
      Object.values(state.itemsObj).forEach(({ vendorsToAdd }) => {
        vendorsToAdd.includes(vendorName) || vendorsToAdd.push(vendorName);
      });
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchItems.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.isLoading = false;
      state.errMsg = action.error.message ?? "Fetch failed";
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      const { categories, items, vendors } = action.payload;
      state.itemsArr = items.map(({ name }) => name);
      items.forEach(itemObj => {
        state.itemsObj[itemObj.name] = {
          ...itemObj,
          vendorsAdded: emptyArr,
          vendorsToAdd: itemObj.vendors,
        };
      });
      state.vendorsArr = Object.keys(vendors) as VendorNameType[];
      Object.values(vendors).forEach(vendorObj => {
        state.vendorsObj[vendorObj.abbrName] = {
          ...vendorObj,
          itemsAdded: emptyArr as ItemName[],
          qrContent: "",
          qrText: "",
        };
      });
      state.categoriesArr = Object.keys(categories) as Category[];
      state.categoriesObj = { ...categories };
      state.isLoading = false;
      state.errMsg = "";
    });
  },
});

export const {
  addItems,
  removeItems,
  addItemsByVendor,
  setListItems,
  clearListItems,
  setVendors,
  setVendorsForAllUncheck,
  setVendorsForAllCheck,
} = addedSlice.actions;

export const addedReducer = addedSlice.reducer;
