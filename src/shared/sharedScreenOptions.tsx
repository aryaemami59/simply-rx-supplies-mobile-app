import { StackNavigationOptions } from "@react-navigation/stack";
import HeaderHomeStackNavigator from "../components/HeaderComponents/HeaderHomeStackNavigator";
import { mainColor } from "./sharedStyles";

export const screenOptions: StackNavigationOptions = {
  header: props => <HeaderHomeStackNavigator {...props} />,
  // headerBackgroundContainerStyle: { backgroundColor: "white" },
  // header
} as const;

export const HEADER_SHOWN_FALSE = {
  headerShown: false,
  // headerStyle: { backgroundColor: mainColor },
} as const;
