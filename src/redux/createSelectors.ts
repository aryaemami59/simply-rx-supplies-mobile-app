import {
  autotrackMemoize,
  createSelectorCreator,
  current,
  defaultMemoize,
  isDraft,
  weakMapMemoize,
} from "@reduxjs/toolkit";

import type {
  AddedState,
  AutotrackMemoize,
  DefaultMemoize,
  DropFirst,
  TypedCreateSelectorFunction,
  WeakMapMemoize,
} from "../types/reduxHelperTypes";
import type { AnyFunction } from "../types/tsHelpers";
import type { RootState } from "./store";

// TODO: fix types.
/**
 * Fixed version of {@link createDraftSafeSelectorCreator}
 * @param args - Same arguments as {@link createDraftSafeSelectorCreator}.
 * @returns A `createDraftSafeSelector` function.
 */
export const createDraftSafeSelectorCreatorCorrected: typeof createSelectorCreator =
  <
    F extends AnyFunction,
    MemoizeFunction extends (func: F, ...options: unknown[]) => F,
    MemoizeOptions extends unknown[] = DropFirst<Parameters<MemoizeFunction>>,
  >(
    ...args: Parameters<
      typeof createSelectorCreator<F, MemoizeFunction, MemoizeOptions>
    >
  ) => {
    const createSelector2 = createSelectorCreator<
      F,
      MemoizeFunction,
      MemoizeOptions
    >(...args);
    return ((...params: Parameters<typeof createSelector2>) => {
      const selector = createSelector2(...params);
      const wrappedSelector = (state: unknown, ...rest: unknown[]) =>
        selector(isDraft(state) ? current(state) : state, ...rest);
      Object.assign(wrappedSelector, selector);
      return wrappedSelector;
    }) as ReturnType<
      typeof createSelectorCreator<F, MemoizeFunction, MemoizeOptions>
    >;
  };

/** A {@link createSelector} function that takes {@link RootState} as the first argument in its input selectors. */
export const createAppSelector: TypedCreateSelectorFunction<
  RootState,
  DefaultMemoize
> = createSelectorCreator(defaultMemoize);
/** Used to create selectors that are shared across multiple component instances. */
export const createSelectorWeakmap: TypedCreateSelectorFunction<
  RootState,
  WeakMapMemoize
> = createSelectorCreator(weakMapMemoize);
/** Used to create selectors that are used to access nested fields in data. */
export const createSelectorAutotrack: TypedCreateSelectorFunction<
  RootState,
  AutotrackMemoize
> = createSelectorCreator(autotrackMemoize);

export const createDraftSafeAppSelector: TypedCreateSelectorFunction<
  RootState,
  DefaultMemoize
> = createDraftSafeSelectorCreatorCorrected(defaultMemoize);
export const createDraftSafSelectorWeakMap: TypedCreateSelectorFunction<
  RootState,
  WeakMapMemoize
> = createDraftSafeSelectorCreatorCorrected(weakMapMemoize);
export const createDraftSafSelectorAutotrack =
  createDraftSafeSelectorCreatorCorrected(autotrackMemoize);
export const createDraftSafeAddedSelector: TypedCreateSelectorFunction<
  AddedState,
  WeakMapMemoize
> = createDraftSafeSelectorCreatorCorrected(weakMapMemoize);
