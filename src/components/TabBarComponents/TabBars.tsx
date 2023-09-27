import type { TabBarIcon } from "../../types/tsHelpers";
import TabBarIconHome from "./TabBarIconHome";
import TabBarIconItemLookup from "./TabBarIconItemLookup";
import TabBarIconItemsReference from "./TabBarIconItemsReference";
import TabBarIconShoppingCart from "./TabBarIconShoppingCart";

export const homeTabBarIcon: TabBarIcon = props => (
  <TabBarIconHome {...props} />
);

export const itemLookupTabBarIcon: TabBarIcon = props => (
  <TabBarIconItemLookup {...props} />
);

export const shoppingCartTabBarIcon: TabBarIcon = props => (
  <TabBarIconShoppingCart {...props} />
);

export const itemsReferenceTabBarIcon: TabBarIcon = props => (
  <TabBarIconItemsReference {...props} />
);
