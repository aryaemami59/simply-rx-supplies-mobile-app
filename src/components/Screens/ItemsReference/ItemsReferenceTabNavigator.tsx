import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import {
  ItemsReferenceStackParamList,
  ItemsReferenceTopTabParamList,
} from "../../../../custom_types/navigation";
import {
  itemsByCategoryTabOptions,
  itemsByVendorTabOptions,
} from "../../../shared/screen_options/sharedScreenOptions";
import ItemsByCategoryScreen from "./ItemsByCategory/ItemsByCategoryScreen";
import ItemsByVendorScreen from "./ItemsByVendor/ItemsByVendorScreen";

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

export default memo<Props>(ItemsReferenceTabNavigator);
