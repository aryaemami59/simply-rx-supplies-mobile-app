import { createDraftSafeSelectorCreator } from "@reduxjs/toolkit";
import {
  createSelector,
  createSelectorCreator,
  lruMemoize,
  unstable_autotrackMemoize as autotrackMemoize,
  weakMapMemoize,
} from "reselect";

import type { RootState } from "./store";

// TODO: fix types.
/**
 * Fixed version of {@link createDraftSafeSelectorCreator}
 * @param args - Same arguments as {@link createDraftSafeSelectorCreator}.
 * @returns A `createDraftSafeSelector` function.
 */
// export const createDraftSafeSelectorCreatorCorrected: typeof createSelectorCreator =
//   <
//     F extends AnyFunction,
//     MemoizeFunction extends (func: F, ...options: unknown[]) => F,
//     MemoizeOptions extends unknown[] = DropFirst<Parameters<MemoizeFunction>>,
//   >(
//     ...args: Parameters<
//       typeof createSelectorCreator<F, MemoizeFunction, MemoizeOptions>
//     >
//   ) => {
//     const createSelector2 = createSelectorCreator<
//       F,
//       MemoizeFunction,
//       MemoizeOptions
//     >(...args);
//     return ((...params: Parameters<typeof createSelector2>) => {
//       const selector = createSelector2(...params);
//       const wrappedSelector = (state: unknown, ...rest: unknown[]) =>
//         selector(isDraft(state) ? current(state) : state, ...rest);
//       Object.assign(wrappedSelector, selector);
//       return wrappedSelector;
//     }) as ReturnType<
//       typeof createSelectorCreator<F, MemoizeFunction, MemoizeOptions>
//     >;
//   };

/** A {@link createSelector} function that takes {@link RootState} as the first argument in its input selectors. */
export const createAppSelector = createSelectorCreator(lruMemoize);
// export const createAppSelector: TypedCreateSelectorFunction<
//   RootState,
//   lruMemoize
// > = createSelectorCreator(lruMemoize);
/** Used to create selectors that are shared across multiple component instances. */
export const createSelectorWeakMap = createSelector.withTypes<RootState>();
// export const createSelectorWeakMap = createSelectorCreator({
//   memoize: weakMapMemoize,
//   memoizeOptions: {
//     resultEqualityCheck: (a, b) => a === b,
//   },
// });
// export const createSelectorWeakMap: TypedCreateSelectorFunction<
//   RootState,
//   WeakMapMemoize
// > = createSelectorCreator({
//   memoize: weakMapMemoize,
//   memoizeOptions: {
//     resultEqualityCheck: (a, b) => a === b,
//   },
// });
/** Used to create selectors that are used to access nested fields in data. */
export const createSelectorAutotrack = createSelectorCreator(autotrackMemoize);
// export const createSelectorAutotrack: TypedCreateSelectorFunction<
//   RootState,
//   AutotrackMemoize
// > = createSelectorCreator(autotrackMemoize);

export const createDraftSafeAppSelector =
  createDraftSafeSelectorCreator(lruMemoize);
// export const createDraftSafeAppSelector: TypedCreateSelectorFunction<
//   RootState,
//   lruMemoize
// > = createDraftSafeSelectorCreatorCorrected(lruMemoize);
export const createDraftSafSelectorWeakMap =
  createDraftSafeSelectorCreator(weakMapMemoize);
// export const createDraftSafSelectorWeakMap: TypedCreateSelectorFunction<
//   RootState,
//   WeakMapMemoize
// > = createDraftSafeSelectorCreatorCorrected(weakMapMemoize);
export const createDraftSafSelectorAutotrack =
  createDraftSafeSelectorCreator(autotrackMemoize);
export const createDraftSafeAddedSelector =
  createDraftSafeSelectorCreator(weakMapMemoize);
// export const createDraftSafeAddedSelector: TypedCreateSelectorFunction<
//   AddedState,
//   WeakMapMemoize
// > = createDraftSafeSelectorCreatorCorrected(weakMapMemoize);
