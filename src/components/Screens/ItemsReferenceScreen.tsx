import { FC, memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ItemsReferenceStackParamList } from "../../../CustomTypes/types";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ItemsByVendorStackScreen from "../StackScreenComponents/ItemsByVendorStackScreen";
import ItemsByCategoryStackScreen from "../StackScreenComponents/ItemsByCategoryStackScreen";

// const Stack = createStackNavigator<ItemsReferenceStackParamList>();
const Tab = createMaterialTopTabNavigator();

const ItemsReferenceScreen: FC = (): JSX.Element => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarLabel: "Items By Vendor",
        }}
        name="ItemsByVendor"
        component={ItemsByVendorStackScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Items By Category",
        }}
        name="ItemsByCategory"
        component={ItemsByCategoryStackScreen}
      />
    </Tab.Navigator>
  );
};

export default memo(ItemsReferenceScreen);
