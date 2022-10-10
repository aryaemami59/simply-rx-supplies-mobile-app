import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, memo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  HomeStackParamList,
  RootTabParamList,
} from "../../../CustomTypes/types";
import { screenOptions } from "../../shared/sharedScreenOptions";
import HomeScreen from "../Screens/Home/HomeScreen";

const Stack = createNativeStackNavigator<HomeStackParamList>();

type Props = BottomTabScreenProps<RootTabParamList, "Home">;

const HomeStackScreen: FC<Props> = ({ navigation, route }) => (
  <SafeAreaProvider>
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
    </Stack.Navigator>
  </SafeAreaProvider>
);

export default memo<Props>(HomeStackScreen);
