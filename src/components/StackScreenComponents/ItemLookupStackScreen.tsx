import { FC, memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ItemLookupStackParamList,
  RootTabParamList,
} from "../../../CustomTypes/types";
import ItemLookupScreen from "../Screens/ItemLookUp/ItemLookupScreen";
import { HEADER_SHOWN_FALSE } from "../../shared/sharedScreenOptions";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator<ItemLookupStackParamList>();
// const Stack = createStackNavigator<ItemLookupStackParamList>();

type Props = BottomTabScreenProps<RootTabParamList, "ItemLookup">;

const ItemLookupStackScreen: FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  return (
    <>
      <SafeAreaProvider>
        <Stack.Navigator
          screenOptions={{
            ...HEADER_SHOWN_FALSE,
          }}>
          <Stack.Screen name="ItemLookupScreen" component={ItemLookupScreen} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </>
  );
};

export default memo<Props>(ItemLookupStackScreen);
