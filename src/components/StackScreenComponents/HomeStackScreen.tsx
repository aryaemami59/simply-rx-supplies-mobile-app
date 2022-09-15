import { FC, memo } from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import HeaderHomeStackNavigator from "../HeaderComponents/HeaderHomeStackNavigator";
import { HomeStackParamList } from "../../../CustomTypes/types";
import HomeScreen from "../Screens/HomeScreen";
import { screenOptions } from "../../shared/sharedScreenOptions";

const Stack = createStackNavigator<HomeStackParamList>();

// const screenOptions: StackNavigationOptions = {
//   header: props => <HeaderHomeStackNavigator {...props} />,
// } as const;

const HomeStackScreen: FC = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default memo(HomeStackScreen);
