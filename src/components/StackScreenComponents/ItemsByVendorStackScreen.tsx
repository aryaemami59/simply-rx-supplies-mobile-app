import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, memo } from "react";
import {
  ItemsByVendorStackParamList,
  ItemsReferenceTopTabParamList,
} from "../../../CustomTypes/types";
import { HEADER_SHOWN_FALSE } from "../../shared/sharedScreenOptions";
import ItemsByVendorScreen from "../Screens/ItemsReference/ItemsByVendor/ItemsByVendorScreen";

type Props = MaterialTopTabScreenProps<
  ItemsReferenceTopTabParamList,
  "ItemsByVendor"
>;

const Stack = createNativeStackNavigator<ItemsByVendorStackParamList>();

const ItemsByVendorStackScreen: FC<Props> = ({ navigation, route }) => (
  <Stack.Navigator screenOptions={HEADER_SHOWN_FALSE}>
    <Stack.Screen
      name="ItemsByVendorScreen"
      component={ItemsByVendorScreen}
    />
  </Stack.Navigator>
);

export default memo<Props>(ItemsByVendorStackScreen);
