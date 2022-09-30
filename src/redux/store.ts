import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { addedReducer, itemReducer } from "./addedSlice";
// import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    added: addedReducer,
    item: itemReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat([logger]),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
