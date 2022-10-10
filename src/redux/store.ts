import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { addedReducer } from "./addedSlice";
// import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    added: addedReducer,
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
