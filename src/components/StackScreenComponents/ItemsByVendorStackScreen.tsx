import { FC, memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ItemsByVendorStackParamList,
  ItemsReferenceTopTabParamList,
} from "../../../CustomTypes/types";
import ItemsByVendorScreen from "../Screens/ItemsReference/ItemsByVendor/ItemsByVendorScreen";
import { HEADER_SHOWN_FALSE } from "../../shared/sharedScreenOptions";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

type Props = MaterialTopTabScreenProps<
  ItemsReferenceTopTabParamList,
  "ItemsByVendor"
>;

const Stack = createNativeStackNavigator<ItemsByVendorStackParamList>();
// const Stack = createStackNavigator<ItemsByVendorStackParamList>();

const ItemsByVendorStackScreen: FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={HEADER_SHOWN_FALSE}>
      <Stack.Screen
        name="ItemsByVendorScreen"
        component={ItemsByVendorScreen}
      />
    </Stack.Navigator>
  );
};

export default memo<Props>(ItemsByVendorStackScreen);
