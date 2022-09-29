import { FC, memo } from "react";
import {
  ItemsByVendorStackParamList,
  ItemsReferenceTopTabParamList,
} from "../../../CustomTypes/types";
import ItemsByVendorScreen from "../Screens/ItemsReference/ItemsByVendor/ItemsByVendorScreen";
import { HEADER_SHOWN_FALSE } from "../../shared/sharedScreenOptions";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DarkModeIcon from "../HeaderComponents/DarkModeIcon";
import { HeaderRightFC } from "../HeaderComponents/HeaderRightComponent";

type Props = MaterialTopTabScreenProps<
  ItemsReferenceTopTabParamList,
  "ItemsByVendor"
>;

const Stack = createNativeStackNavigator<ItemsByVendorStackParamList>();

const ItemsByVendorStackScreen: FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={HEADER_SHOWN_FALSE}>
      <Stack.Screen
        name="ItemsByVendorScreen"
        component={ItemsByVendorScreen}
        // options={{ headerRight: HeaderRightFC }}
        // options={{ headerRight: props => <DarkModeIcon {...props} /> }}
      />
    </Stack.Navigator>
  );
};

export default memo<Props>(ItemsByVendorStackScreen);
