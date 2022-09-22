import { FC, memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ItemLookupStackParamList,
  RootTabParamList,
} from "../../../CustomTypes/types";
import ItemLookupScreen from "../Screens/ItemLookUp/ItemLookupScreen";
import { HEADER_SHOWN_FALSE } from "../../shared/sharedScreenOptions";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator<ItemLookupStackParamList>();

type Props = BottomTabScreenProps<RootTabParamList, "ItemLookup">;

const ItemLookupStackScreen: FC<Props> = (): JSX.Element => {
  return (
    <>
      <Stack.Navigator screenOptions={HEADER_SHOWN_FALSE}>
        <Stack.Screen name="ItemLookupScreen" component={ItemLookupScreen} />
      </Stack.Navigator>
    </>
  );
};

export default memo<Props>(ItemLookupStackScreen);
