import { FC, memo } from "react";
import {
  ItemsByCategoryStackParamList,
  ItemsReferenceTopTabParamList,
} from "../../../CustomTypes/types";
import ItemsByCategoryScreen from "../Screens/ItemsReference/ItemsByCategory/ItemsByCategoryScreen";
import { HEADER_SHOWN_FALSE } from "../../shared/sharedScreenOptions";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type Props = MaterialTopTabScreenProps<
  ItemsReferenceTopTabParamList,
  "ItemsByCategory"
>;

const Stack = createNativeStackNavigator<ItemsByCategoryStackParamList>();

const ItemsByCategoryStackScreen: FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
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
