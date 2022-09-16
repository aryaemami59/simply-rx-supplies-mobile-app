import { FC, memo } from "react";
import {
  createStackNavigator,
} from "@react-navigation/stack";
import { HomeStackParamList } from "../../../CustomTypes/types";
import HomeScreen from "../Screens/HomeScreen";
import { screenOptions } from "../../shared/sharedScreenOptions";

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackScreen: FC = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default memo(HomeStackScreen);
