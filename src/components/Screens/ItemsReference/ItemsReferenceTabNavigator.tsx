import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import { ItemsReferenceStackParamList, ItemsReferenceTopTabParamList } from "../../../../CustomTypes/navigation";
import {
  itemsByCategoryTabOptions,
  itemsByVendorTabOptions,
} from "../../../shared/sharedScreenOptions";
import ItemsByCategoryStackNavigator from "../../StackNavigatorComponents/ItemsByCategoryStackNavigator";
import ItemsByVendorStackNavigator from "../../StackNavigatorComponents/ItemsByVendorStackNavigator";

type Props = NativeStackScreenProps<
  ItemsReferenceStackParamList,
  "ItemsReferenceScreen"
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

export default memo<Props>(ItemsReferenceTabNavigator);
