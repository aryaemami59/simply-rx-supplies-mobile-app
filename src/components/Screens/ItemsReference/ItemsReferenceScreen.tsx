import { FC, memo } from "react";
import {
  ItemsReferenceTopTabParamList,
  ItemsReferenceStackParamList,
} from "../../../../CustomTypes/types";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ItemsByVendorStackScreen from "../../StackScreenComponents/ItemsByVendorStackScreen";
import ItemsByCategoryStackScreen from "../../StackScreenComponents/ItemsByCategoryStackScreen";
import { StackScreenProps } from "@react-navigation/stack";
import { useTheme } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  itemsByCategoryTabOptions,
  itemsByVendorTabOptions,
} from "../../../shared/sharedScreenOptions";

type Props = StackScreenProps<
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
    // <SafeAreaView
    //   style={{ backgroundColor: theme.colors.background, height: "100%" }}>
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
    // </SafeAreaView>
  );
};

export default memo<Props>(ItemsReferenceScreen);
