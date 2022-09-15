import { FC, memo } from "react";
import { ItemsByCategoryStackParamList } from "../../../CustomTypes/types";
import { createStackNavigator } from "@react-navigation/stack";
import ItemsByCategoryScreen from "../Screens/ItemsByCategoryScreen";
import { HEADER_SHOWN_FALSE } from "../../shared/sharedScreenOptions";

const Stack = createStackNavigator<ItemsByCategoryStackParamList>();

const ItemsByCategoryStackScreen: FC = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={HEADER_SHOWN_FALSE}>
      <Stack.Screen
        name="ItemsByCategoryScreen"
        component={ItemsByCategoryScreen}
      />
    </Stack.Navigator>
  );
};

export default memo(ItemsByCategoryStackScreen);
