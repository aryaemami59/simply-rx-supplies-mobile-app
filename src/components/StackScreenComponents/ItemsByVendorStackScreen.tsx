import { FC, memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ItemsByVendorStackParamList } from "../../../CustomTypes/types";
import ItemsByVendorScreen from "../Screens/ItemsByVendorScreen";
import { HEADER_SHOWN_FALSE } from "../../shared/sharedScreenOptions";

const Stack = createStackNavigator<ItemsByVendorStackParamList>();

const ItemsByVendorStackScreen: FC = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={HEADER_SHOWN_FALSE}>
      <Stack.Screen
        name="ItemsByVendorScreen"
        component={ItemsByVendorScreen}
      />
    </Stack.Navigator>
  );
};

export default memo(ItemsByVendorStackScreen);
