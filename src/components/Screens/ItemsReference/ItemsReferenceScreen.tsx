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
