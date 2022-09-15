import { FC, memo, useCallback, useMemo } from "react";
import {
  StackHeaderProps,
  createStackNavigator,
} from "@react-navigation/stack";
import HeaderHomeStackNavigator from "../HeaderComponents/HeaderHomeStackNavigator";
import { HomeStackParamList } from "../../../CustomTypes/types";
import HomeScreen from "../Screens/HomeScreen";

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackScreen: FC = (): JSX.Element => {
  const header = useCallback(
    (props: StackHeaderProps): JSX.Element => (
      <HeaderHomeStackNavigator {...props} />
    ),
    []
  );

  const screenOptions = useMemo(() => {
    return {
      header,
    };
  }, []);

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default memo(HomeStackScreen);
