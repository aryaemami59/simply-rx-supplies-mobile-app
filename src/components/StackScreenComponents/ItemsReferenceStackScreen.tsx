import { FC, memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ItemsReferenceScreen from "../Screens/ItemsReferenceScreen";
import { ItemsReferenceStackParamList } from "../../../CustomTypes/types";
import { screenOptions } from "../../shared/sharedScreenOptions";

const Stack = createStackNavigator<ItemsReferenceStackParamList>();

const ItemsReferenceStackScreen: FC = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="ItemsReferenceScreen"
        component={ItemsReferenceScreen}
      />
    </Stack.Navigator>
  );
};

export default memo(ItemsReferenceStackScreen);
