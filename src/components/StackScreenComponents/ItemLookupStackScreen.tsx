import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { FC, memo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  ItemLookupStackParamList,
  RootTabParamList,
} from "../../../CustomTypes/types";
import { HEADER_SHOWN_FALSE } from "../../shared/sharedScreenOptions";
import ItemLookupScreen from "../Screens/ItemLookUp/ItemLookupScreen";

const Stack = createNativeStackNavigator<ItemLookupStackParamList>();

type Props = BottomTabScreenProps<RootTabParamList, "ItemLookup">;

const ItemLookupStackScreen: FC<Props> = ({ navigation, route }) => {
  const { theme } = useTheme();

  return (
    <SafeAreaProvider style={{ backgroundColor: theme.colors.background }}>
      <Stack.Navigator screenOptions={HEADER_SHOWN_FALSE}>
        <Stack.Screen
          name="ItemLookupScreen"
          component={ItemLookupScreen}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default memo<Props>(ItemLookupStackScreen);
