import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { FC, memo } from "react";
import {
  ItemsReferenceStackParamList,
  ItemsReferenceTopTabParamList,
} from "../../../../CustomTypes/types";
import {
  itemsByCategoryTabOptions,
  itemsByVendorTabOptions,
} from "../../../shared/sharedScreenOptions";
import ItemsByCategoryStackScreen from "../../StackScreenComponents/ItemsByCategoryStackScreen";
import ItemsByVendorStackScreen from "../../StackScreenComponents/ItemsByVendorStackScreen";

type Props = NativeStackScreenProps<
  ItemsReferenceStackParamList,
  "ItemsReferenceScreen"
>;

const Tab = createMaterialTopTabNavigator<ItemsReferenceTopTabParamList>();

const ItemsReferenceScreen: FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.colors.background },
      }}>
      <Tab.Screen
        options={{
          ...itemsByVendorTabOptions,
          tabBarLabelStyle: { color: theme.colors.grey0 },
        }}
        name="ItemsByVendor"
        component={ItemsByVendorStackScreen}
      />
      <Tab.Screen
        options={{
          ...itemsByCategoryTabOptions,
          tabBarLabelStyle: { color: theme.colors.grey0 },
        }}
        name="ItemsByCategory"
        component={ItemsByCategoryStackScreen}
      />
    </Tab.Navigator>
  );
};

export default memo<Props>(ItemsReferenceScreen);
