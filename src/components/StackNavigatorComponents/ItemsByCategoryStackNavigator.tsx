import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, memo } from "react";
import {
  ItemsByCategoryStackParamList,
  ItemsReferenceTopTabParamList,
} from "../../../CustomTypes/types";
import { HEADER_SHOWN_FALSE } from "../../shared/sharedScreenOptions";
import ItemsByCategoryScreen from "../Screens/ItemsReference/ItemsByCategory/ItemsByCategoryScreen";

type Props = MaterialTopTabScreenProps<
  ItemsReferenceTopTabParamList,
  "ItemsByCategory"
>;

const Stack = createNativeStackNavigator<ItemsByCategoryStackParamList>();

const ItemsByCategoryStackNavigator: FC<Props> = ({ navigation, route }) => (
  <Stack.Navigator screenOptions={HEADER_SHOWN_FALSE}>
    <Stack.Screen
      name="ItemsByCategoryScreen"
      component={ItemsByCategoryScreen}
    />
  </Stack.Navigator>
);

export default memo<Props>(ItemsByCategoryStackNavigator);
