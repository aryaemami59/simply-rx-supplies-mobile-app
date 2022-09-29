import { FC, memo } from "react";
import ItemsReferenceScreen from "../Screens/ItemsReference/ItemsReferenceScreen";
import {
  ItemsReferenceStackParamList,
  RootTabParamList,
} from "../../../CustomTypes/types";
import {
  screenOptions,
  refHeaderOptions,
} from "../../shared/sharedScreenOptions";
import ItemsByVendorListItems from "../Screens/ItemsReference/ItemsByVendor/ItemsByVendorListItems";
import CategoryItems from "../Screens/ItemsReference/ItemsByCategory/CategoryItems";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

type Props = BottomTabScreenProps<RootTabParamList, "ItemsReference">;

const Stack = createNativeStackNavigator<ItemsReferenceStackParamList>();

const ItemsReferenceStackScreen: FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen
          options={screenOptions}
          name="ItemsReferenceScreen"
          component={ItemsReferenceScreen}
        />
        <Stack.Screen
          options={refHeaderOptions}
          name="ItemsByVendorListItems"
          component={ItemsByVendorListItems}
        />
        <Stack.Screen
          options={refHeaderOptions}
          name="ItemsByCategoryListItems"
          component={CategoryItems}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default memo<Props>(ItemsReferenceStackScreen);
