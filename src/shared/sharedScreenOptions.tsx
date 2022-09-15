import { StackNavigationOptions } from "@react-navigation/stack";
import HeaderHomeStackNavigator from "../components/HeaderComponents/HeaderHomeStackNavigator";

export const screenOptions: StackNavigationOptions = {
  header: props => <HeaderHomeStackNavigator {...props} />,
} as const;

export const HEADER_SHOWN_FALSE = {
  headerShown: false,
} as const;
