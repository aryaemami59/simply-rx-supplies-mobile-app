import type { TabBarIcon, tabBarIconProps } from "../../types/missingTypes";
import TabBarIconHome from "./TabBarIconHome";
import TabBarIconItemLookup from "./TabBarIconItemLookup";
import TabBarIconItemsReference from "./TabBarIconItemsReference";
import TabBarIconShoppingCart from "./TabBarIconShoppingCart";

export const homeTabBarIcon: TabBarIcon = (props: tabBarIconProps) => (
  <TabBarIconHome {...props} />
);

export const itemLookupTabBarIcon: TabBarIcon = (props: tabBarIconProps) => (
  <TabBarIconItemLookup {...props} />
);

export const shoppingCartTabBarIcon: TabBarIcon = (props: tabBarIconProps) => (
  <TabBarIconShoppingCart {...props} />
);

export const itemsReferenceTabBarIcon: TabBarIcon = (
  props: tabBarIconProps
) => <TabBarIconItemsReference {...props} />;
