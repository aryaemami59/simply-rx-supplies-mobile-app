import { FC, memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ItemLookupStackParamList } from "../../../CustomTypes/types";
import ItemLookupScreen from "../Screens/ItemLookupScreen";

const hideHeader = {
  headerShown: false,
} as const;

const Stack = createStackNavigator<ItemLookupStackParamList>();

const ItemLookupStackScreen: FC = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={hideHeader}>
      <Stack.Screen name="ItemLookup" component={ItemLookupScreen} />
    </Stack.Navigator>
  );
};

export default memo(ItemLookupStackScreen);
