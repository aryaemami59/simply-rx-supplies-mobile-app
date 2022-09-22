import { FC, memo } from "react";
import {
  ItemsByCategoryStackParamList,
  ItemsReferenceTopTabParamList,
} from "../../../CustomTypes/types";
import { createStackNavigator } from "@react-navigation/stack";
import ItemsByCategoryScreen from "../Screens/ItemsReference/ItemsByCategory/ItemsByCategoryScreen";
import { HEADER_SHOWN_FALSE } from "../../shared/sharedScreenOptions";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";

type Props = MaterialTopTabScreenProps<
  ItemsReferenceTopTabParamList,
  "ItemsByCategory"
>;

const Stack = createStackNavigator<ItemsByCategoryStackParamList>();

const ItemsByCategoryStackScreen: FC<Props> = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={HEADER_SHOWN_FALSE}>
      <Stack.Screen
        name="ItemsByCategoryScreen"
        component={ItemsByCategoryScreen}
      />
    </Stack.Navigator>
  );
};

export default memo<Props>(ItemsByCategoryStackScreen);
