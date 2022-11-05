import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import {
  ItemsReferenceScreenProps,
  ItemsReferenceTopTabParamList,
} from "../../../../CustomTypes/navigation";
import {
  itemsByCategoryTabOptions,
  itemsByVendorTabOptions,
} from "../../../shared/sharedScreenOptions";
import ItemsByCategoryStackNavigator from "../../StackNavigatorComponents/ItemsByCategoryStackNavigator";
import ItemsByVendorStackNavigator from "../../StackNavigatorComponents/ItemsByVendorStackNavigator";

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
        component={ItemsByVendorStackNavigator}
      />
      <Tab.Screen
        options={itemsByCategoryTabScreenOptions}
        name="ItemsByCategory"
        component={ItemsByCategoryStackNavigator}
      />
    </Tab.Navigator>
  );
};

export default memo<Props>(ItemsReferenceScreen);
