import { FC, memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ItemsByVendorStackParamList } from "../../../CustomTypes/types";
import ItemsByVendorScreen from "../Screens/ItemsByVendorScreen";

const hideHeader = {
  headerShown: false,
} as const;

const Stack = createStackNavigator<ItemsByVendorStackParamList>();

const ItemsByVendorScreenRender = props => <ItemsByVendorScreen {...props} />;

const ItemsByVendorStackScreen: FC = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={hideHeader}>
      <Stack.Screen
        name="ItemsByVendorScreen"
        component={ItemsByVendorScreenRender}
      />
    </Stack.Navigator>
  );
};

export default memo(ItemsByVendorStackScreen);
