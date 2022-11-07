import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import {
  ItemsReferenceScreenProps,
  ItemsReferenceTopTabParamList,
} from "../../../../custom_types/navigation";
import {
  itemsByCategoryTabOptions,
  itemsByVendorTabOptions,
} from "../../../shared/screen_options/sharedScreenOptions";
import ItemsByCategoryScreen from "./ItemsByCategory/ItemsByCategoryScreen";
import ItemsByVendorScreen from "./ItemsByVendor/ItemsByVendorScreen";

type Props = ItemsReferenceScreenProps;

const Tab = createMaterialTopTabNavigator<ItemsReferenceTopTabParamList>();

const ItemsReferenceScreen: FC<Props> = ({ navigation, route }) => {
  const { background: backgroundColor, grey0: color } = useTheme().theme.colors;

  const screenOptions = useMemo(
    () => ({
      tabBarStyle: { backgroundColor },
    }),
    [backgroundColor]
  );

  const itemsByVendorTabScreenOptions = useMemo(
    () => ({
      ...itemsByVendorTabOptions,
      tabBarLabelStyle: { color },
    }),
    [color]
  );

  const itemsByCategoryTabScreenOptions = useMemo(
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
        name="ItemsByVendor"
        component={ItemsByVendorScreen}
      />
      <Tab.Screen
        options={itemsByCategoryTabScreenOptions}
        name="ItemsByCategory"
        component={ItemsByCategoryScreen}
      />
    </Tab.Navigator>
  );
};

export default memo<Props>(ItemsReferenceScreen);
