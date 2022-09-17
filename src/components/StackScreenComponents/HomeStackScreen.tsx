import { FC, memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  HomeStackParamList,
  RootTabParamList,
} from "../../../CustomTypes/types";
import HomeScreen from "../Screens/Home/HomeScreen";
import { screenOptions } from "../../shared/sharedScreenOptions";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator<HomeStackParamList>();

type Props = BottomTabScreenProps<RootTabParamList, "Home">;

const HomeStackScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default memo<Props>(HomeStackScreen);
