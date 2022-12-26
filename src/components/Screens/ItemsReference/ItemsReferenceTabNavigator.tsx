import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useMemo } from "react";
import {
  itemsByCategoryTabOptions,
  itemsByVendorTabOptions,
} from "../../../shared/screen_options/sharedScreenOptions";
import type {
  ItemsReferenceScreen,
  ItemsReferenceStackParamList,
  ItemsReferenceTopTabParamList,
} from "../../../types/navigation";
import { itemsByCategory, itemsByVendor } from "../../../types/navigation";
import ItemsByCategoryScreen from "./ItemsByCategory/ItemsByCategoryScreen";
import ItemsByVendorScreen from "./ItemsByVendor/ItemsByVendorScreen";

type Props = NativeStackScreenProps<
  ItemsReferenceStackParamList,
  ItemsReferenceScreen
>;

const Tab = createMaterialTopTabNavigator<ItemsReferenceTopTabParamList>();

const ItemsReferenceTabNavigator: FC<Props> = ({ navigation, route }) => {
  const { background, grey0 } = useTheme().theme.colors;

  const screenOptions = useMemo(
    () => ({
      tabBarStyle: { backgroundColor: background },
    }),
    [background]
  );

  const itemsByVendorTabScreenOptions = useMemo(
    () => ({
      ...itemsByVendorTabOptions,
      tabBarLabelStyle: { color: grey0 },
    }),
    [grey0]
  );

  const itemsByCategoryTabScreenOptions = useMemo(
    () => ({
      ...itemsByCategoryTabOptions,
      tabBarLabelStyle: { color: grey0 },
    }),
    [grey0]
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

export default memo<Props>(ItemsReferenceTabNavigator);
