import type { ItemNameAndKeywords } from "../types/api";
import type { RootSelectorParamsProvider } from "../types/reduxHelperTypes";
import setSelectorNames from "../utils/setSelectorNames";
import withEmptyArrayFallback from "../utils/withEmptyArrayFallback";
import { ADAPTER_SELECTORS, getAllEntitySelectors } from "./adapterSelectors";
import { apiSelectors } from "./apiSlice";
import { createSelectorWeakmap } from "./createSelectors";
import { DRAFT_SAFE_SELECTORS } from "./draftSafeSelectors";
import { TOP_LEVEL_SELECTORS } from "./topLevelSelectors";

const ROOT_SELECTOR_PARAMS_PROVIDER: RootSelectorParamsProvider = {
  getItemId: (state, itemId) => itemId,
  getCartIdAndItemId: (state, cartId, itemId) => itemId,
  getItemIdAndCartId: (state, itemId, cartId) => cartId,
} as const satisfies RootSelectorParamsProvider;

export const selectVendorsLinks = createSelectorWeakmap(
  [ADAPTER_SELECTORS.GLOBAL.vendors.selectById],
  vendor => vendor?.link ?? ""
);

export const selectItemNumber = createSelectorWeakmap(
  [ADAPTER_SELECTORS.GLOBAL.items.selectById],
  item => item?.itemNumber ?? ""
);

export const selectItemSrc = createSelectorWeakmap(
  [ADAPTER_SELECTORS.GLOBAL.items.selectById],
  item => item?.src ?? ""
);

export const selectItemName = createSelectorWeakmap(
  [ADAPTER_SELECTORS.GLOBAL.items.selectById],
  item => item?.name ?? ""
);

export const selectVendorIdsByItemId = createSelectorWeakmap(
  [ADAPTER_SELECTORS.GLOBAL.items.selectById],
  item => withEmptyArrayFallback(item?.vendorIds)
);

export const selectItemNamesAndKeywords = createSelectorWeakmap(
  [ADAPTER_SELECTORS.GLOBAL.items.selectAll],
  items =>
    items.map<ItemNameAndKeywords>(({ name, keywords, id }) => ({
      name,
      keywords,
      id,
    }))
);

export const selectCartsItemIdsLength = createSelectorWeakmap(
  [ADAPTER_SELECTORS.GLOBAL.cart.selectAll],
  carts => carts.map(({ itemIds }) => itemIds.length)
);

export const checkIfAnyItemsAdded = createSelectorWeakmap(
  [selectCartsItemIdsLength],
  itemIdsLengthArray =>
    itemIdsLengthArray.reduce<boolean>(
      (accumulator, itemIdsLength) => itemIdsLength > 0 || accumulator,
      false
    )
);

export const selectCartItemsIds = createSelectorWeakmap(
  [ADAPTER_SELECTORS.GLOBAL.cart.selectById],
  cart => withEmptyArrayFallback(cart?.itemIds)
);
// TODO: maybe remove?
export const selectCartItemNames = createSelectorWeakmap(
  [selectCartItemsIds, ADAPTER_SELECTORS.GLOBAL.items.selectEntities],
  (cartItemIds, itemsEntities) =>
    cartItemIds.map<string>(cartItemId => itemsEntities[cartItemId]?.name ?? "")
);

export const selectCartItemNamesStringified = createSelectorWeakmap(
  [selectCartItemsIds, ADAPTER_SELECTORS.GLOBAL.items.selectEntities],
  (cartItemIds, itemsEntities) =>
    cartItemIds
      .map<string>(cartItemId => itemsEntities[cartItemId]?.name ?? "")
      .join(", ")
);

export const selectCheckedVendorIds = createSelectorWeakmap(
  [ADAPTER_SELECTORS.GLOBAL.itemVendors.selectById],
  checkedVendorItem =>
    withEmptyArrayFallback(checkedVendorItem?.checkedVendorIds)
);

export const isVendorChecked = createSelectorWeakmap(
  [
    ADAPTER_SELECTORS.GLOBAL.itemVendors.selectById,
    ROOT_SELECTOR_PARAMS_PROVIDER.getItemIdAndCartId,
  ],
  (checkedVendorItem, vendorId) =>
    !!checkedVendorItem?.checkedVendorIds.includes(vendorId)
);

export const isMinimized = createSelectorWeakmap(
  [
    ADAPTER_SELECTORS.GLOBAL.cartItems.selectById,
    ROOT_SELECTOR_PARAMS_PROVIDER.getCartIdAndItemId,
  ],
  (cartItems, itemId) => !!cartItems?.minimizedItemIds.includes(itemId)
);

export const selectCategoryName = createSelectorWeakmap(
  [ADAPTER_SELECTORS.GLOBAL.categories.selectById],
  category => category?.name ?? "Vials"
);

export const selectCategoryItemIds = createSelectorWeakmap(
  [ADAPTER_SELECTORS.GLOBAL.categories.selectById],
  category => withEmptyArrayFallback(category?.itemIds)
);

export const checkIfAddedToVendor = createSelectorWeakmap(
  [selectCartItemsIds, ROOT_SELECTOR_PARAMS_PROVIDER.getCartIdAndItemId],
  (cartItemsIds, itemId) => cartItemsIds.includes(itemId)
);

export const selectCartItemsLength = createSelectorWeakmap(
  [selectCartItemsIds],
  cartItemIds => cartItemIds.length
);

export const checkIfAnyAddedToOneVendor = createSelectorWeakmap(
  [selectCartItemsLength],
  cartItemIdsLength => cartItemIdsLength > 0
);

export const selectQRCodeText = createSelectorWeakmap(
  [
    selectCartItemsIds,
    ADAPTER_SELECTORS.GLOBAL.items.selectEntities,
    ADAPTER_SELECTORS.GLOBAL.vendors.selectById,
  ],
  (cartItemIds, itemEntities, vendor) =>
    cartItemIds
      .map(cartItemId => itemEntities[cartItemId]?.itemNumber)
      .join(vendor?.joinChars)
);

export const selectOfficialName = createSelectorWeakmap(
  [ADAPTER_SELECTORS.GLOBAL.vendors.selectById],
  vendor => vendor?.officialName ?? "GNFR"
);

export const selectVendorItemIds = createSelectorWeakmap(
  [ADAPTER_SELECTORS.GLOBAL.vendors.selectById],
  vendor => withEmptyArrayFallback(vendor?.itemIds)
);

const selectCartsByItemId = createSelectorWeakmap(
  [
    ADAPTER_SELECTORS.GLOBAL.items.selectById,
    ADAPTER_SELECTORS.GLOBAL.cart.selectAll,
  ],
  (item, carts) =>
    withEmptyArrayFallback(
      carts.filter(cart => item?.vendorIds.includes(cart.id))
    )
);

export const checkIfAddedToAllVendors = createSelectorWeakmap(
  [selectCartsByItemId, ROOT_SELECTOR_PARAMS_PROVIDER.getItemId],
  (carts, itemId) =>
    carts.reduce<boolean>(
      (accumulator, cart) => cart.itemIds.includes(itemId) && accumulator,
      true
    )
);
// TODO: maybe remove?
export const selectVendorsOfficialNames = createSelectorWeakmap(
  [ADAPTER_SELECTORS.GLOBAL.vendors.selectEntities, selectVendorIdsByItemId],
  (entities, vendorIds) =>
    vendorIds.map(e => entities[e]?.officialName ?? "GNFR")
);

const mainSelectors = {
  selectItemNumber,
  selectItemSrc,
  selectItemName,
  selectVendorIdsByItemId,
  selectItemNamesAndKeywords,
  checkIfAnyItemsAdded,
  selectCartItemsIds,
  selectCartItemNamesStringified,
  selectCheckedVendorIds,
  isVendorChecked,
  isMinimized,
  selectCategoryName,
  selectCategoryItemIds,
  checkIfAddedToVendor,
  selectCartItemsLength,
  checkIfAnyAddedToOneVendor,
  selectQRCodeText,
  selectOfficialName,
  selectVendorItemIds,
  selectCartsByItemId,
  checkIfAddedToAllVendors,
  selectCartsItemIdsLength,
} as const;

const allSelectors = setSelectorNames({
  ...mainSelectors,
  ...apiSelectors,
  ...DRAFT_SAFE_SELECTORS,
  ...getAllEntitySelectors(),
  ...TOP_LEVEL_SELECTORS,
} as const);

export const resetAllSelectors = () => {
  Object.values(allSelectors).forEach(e => {
    e.clearCache();
    e.resetRecomputations();
  });
};

export default allSelectors;
