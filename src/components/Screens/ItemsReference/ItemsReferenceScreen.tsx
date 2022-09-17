import { FC, memo } from "react";
import {
  ItemsReferenceTopTabParamList,
  ItemsReferenceStackParamList,
} from "../../../../CustomTypes/types";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ItemsByVendorStackScreen from "../../StackScreenComponents/ItemsByVendorStackScreen";
import ItemsByCategoryStackScreen from "../../StackScreenComponents/ItemsByCategoryStackScreen";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<
  ItemsReferenceStackParamList,
  "ItemsReferenceScreen"
>;

const Tab = createMaterialTopTabNavigator<ItemsReferenceTopTabParamList>();

const ItemsReferenceScreen: FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
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

export default memo<Props>(ItemsReferenceScreen);
