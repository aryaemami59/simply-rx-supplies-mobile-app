import { FC, memo } from "react";
import { ItemsByCategoryStackParamList } from "../../../CustomTypes/types";
import { createStackNavigator } from "@react-navigation/stack";
import ItemsByCategoryScreen from "../Screens/ItemsByCategoryScreen";

const hideHeader = {
  headerShown: false,
} as const;

const Stack = createStackNavigator<ItemsByCategoryStackParamList>();

const ItemsByCategoryStackScreen: FC = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={hideHeader}>
      <Stack.Screen
        name="ItemsByCategoryScreen"
        component={ItemsByCategoryScreen}
      />
    </Stack.Navigator>
  );
};

export default memo(ItemsByCategoryStackScreen);
