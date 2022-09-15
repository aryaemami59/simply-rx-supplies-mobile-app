import { FC, memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ItemLookupStackParamList } from "../../../CustomTypes/types";
import ItemLookupScreen from "../Screens/ItemLookupScreen";
import { HEADER_SHOWN_FALSE } from "../../shared/sharedScreenOptions";

const Stack = createStackNavigator<ItemLookupStackParamList>();

const ItemLookupStackScreen: FC = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={HEADER_SHOWN_FALSE}>
      <Stack.Screen name="ItemLookupScreen" component={ItemLookupScreen} />
    </Stack.Navigator>
  );
};

export default memo(ItemLookupStackScreen);
