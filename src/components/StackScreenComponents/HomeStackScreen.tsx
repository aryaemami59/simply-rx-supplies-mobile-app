import { FC, memo } from "react";
import {
  HomeStackParamList,
  RootTabParamList,
} from "../../../CustomTypes/types";
import HomeScreen from "../Screens/Home/HomeScreen";
import { screenOptions } from "../../shared/sharedScreenOptions";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator<HomeStackParamList>();

type Props = BottomTabScreenProps<RootTabParamList, "Home">;

const HomeStackScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  return (
    <SafeAreaProvider>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default memo<Props>(HomeStackScreen);
