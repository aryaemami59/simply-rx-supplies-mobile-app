import { FC, memo } from "react";
import {
  ItemsByVendorStackParamList,
  ItemsReferenceTopTabParamList,
} from "../../../CustomTypes/types";
import ItemsByVendorScreen from "../Screens/ItemsReference/ItemsByVendor/ItemsByVendorScreen";
import { HEADER_SHOWN_FALSE } from "../../shared/sharedScreenOptions";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { HEIGHT_100 } from "../../shared/sharedStyles";
import { useTheme } from "@rneui/themed";

type Props = MaterialTopTabScreenProps<
  ItemsReferenceTopTabParamList,
  "ItemsByVendor"
>;

const Stack = createNativeStackNavigator<ItemsByVendorStackParamList>();

const ItemsByVendorStackScreen: FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[HEIGHT_100, { backgroundColor: theme.colors.background }]}>
      <Stack.Navigator screenOptions={HEADER_SHOWN_FALSE}>
        <Stack.Screen
          name="ItemsByVendorScreen"
          component={ItemsByVendorScreen}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default memo<Props>(ItemsByVendorStackScreen);
