import type { MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useMemo } from "react";
import {
  itemsByCategoryTabOptions,
  itemsByVendorTabOptions,
} from "../../../shared/screen_options/sharedScreenOptions";
import type {
  ItemsReferenceStackNavigatorProps,
  ItemsReferenceTopTabParamList,
} from "../../../types/navigation";
import { itemsByCategory, itemsByVendor } from "../../../types/navigation";
import ItemsByCategoryScreen from "./ItemsByCategory/ItemsByCategoryScreen";
import ItemsByVendorScreen from "./ItemsByVendor/ItemsByVendorScreen";

type Props = ItemsReferenceStackNavigatorProps<"ItemsReferenceScreen">;

const Tab = createMaterialTopTabNavigator<ItemsReferenceTopTabParamList>();

const ItemsReferenceScreen: FC<Props> = ({ navigation, route }) => {
  const { background: backgroundColor, grey0: color } = useTheme().theme.colors;

  const screenOptions: NonNullable<MaterialTopTabNavigationOptions> = useMemo(
    () => ({
      tabBarStyle: { backgroundColor },
    }),
    [backgroundColor]
  );

  const itemsByVendorTabScreenOptions: NonNullable<MaterialTopTabNavigationOptions> =
    useMemo(
      () => ({
        ...itemsByVendorTabOptions,
        tabBarLabelStyle: { color },
      }),
      [color]
    );

  const itemsByCategoryTabScreenOptions: NonNullable<MaterialTopTabNavigationOptions> =
    useMemo(
      () => ({
        ...itemsByCategoryTabOptions,
        tabBarLabelStyle: { color },
      }),
      [color]
    );

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        options={itemsByVendorTabScreenOptions}
        name={itemsByVendor}
        component={ItemsByVendorScreen}
      />
      <Tab.Screen
        options={itemsByCategoryTabScreenOptions}
        name={itemsByCategory}
        component={ItemsByCategoryScreen}
      />
    </Tab.Navigator>
  );
};

export default memo<Props>(ItemsReferenceScreen);
