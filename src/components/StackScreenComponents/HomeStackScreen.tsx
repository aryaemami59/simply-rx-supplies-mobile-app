import { FC, memo } from "react";
import {
  StackHeaderProps,
  createStackNavigator,
} from "@react-navigation/stack";
import HeaderHomeStackNavigator from "../HeaderComponents/HeaderHomeStackNavigator";
import { HomeStackParamList } from "../../../CustomTypes/types";
import HomeScreen from "../Screens/HomeScreen";

const Stack = createStackNavigator<HomeStackParamList>();

const header = (props: StackHeaderProps): JSX.Element => (
  <HeaderHomeStackNavigator {...props} />
);

const screenOptions = {
  header,
} as const;

const HomeStackScreen: FC = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default memo(HomeStackScreen);
