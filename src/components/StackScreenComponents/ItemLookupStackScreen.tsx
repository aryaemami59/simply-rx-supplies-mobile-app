import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, memo, useContext, useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { backgroundContext } from "../../../App";
import {
  ItemLookupStackParamList,
  RootTabParamList,
} from "../../../CustomTypes/types";
import useStatus from "../../shared/customHooks/useStatus";
import { HEADER_SHOWN_FALSE } from "../../shared/sharedScreenOptions";
import ItemLookupScreen from "../Screens/ItemLookUp/ItemLookupScreen";

const Stack = createNativeStackNavigator<ItemLookupStackParamList>();

type Props = BottomTabScreenProps<RootTabParamList, "ItemLookup">;

const ItemLookupStackScreen: FC<Props> = ({ navigation, route }) => {
  // const { background } = useTheme().theme.colors;
  const background = useContext(backgroundContext);

  useStatus("ItemLookupStackScreen");

  const style = useMemo(() => ({ backgroundColor: background }), [background]);

  return (
    <SafeAreaProvider style={style}>
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
