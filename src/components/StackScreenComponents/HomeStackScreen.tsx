import { FC, memo } from "react";
import {
  StackHeaderProps,
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import HeaderHomeStackNavigator from "../HeaderComponents/HeaderHomeStackNavigator";
import {
  HomeStackParamList,
  RootStackParamList,
} from "../../../CustomTypes/types";
import HomeScreen from "../Screens/HomeScreen";
import { StackScreenProps } from "@react-navigation/stack";

const Stack = createStackNavigator<HomeStackParamList>();
type Props = StackScreenProps<RootStackParamList, "Home">;
// type navigationType = StackNavigationProp<
//   RootStackParamList,
//   "Home",
//   undefined
// >;
const header = (props: StackHeaderProps): JSX.Element => (
  <HeaderHomeStackNavigator {...props} />
);

const HomeScreenRender = props => <HomeScreen {...props} />;

const screenOptions = {
  header,
} as const;

const HomeStackScreen: FC = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreenRender} />
    </Stack.Navigator>
  );
};

export default memo(HomeStackScreen);
