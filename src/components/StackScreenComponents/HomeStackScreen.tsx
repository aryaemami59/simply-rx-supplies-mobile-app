import { FC, memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  HomeStackParamList,
  RootTabParamList,
} from "../../../CustomTypes/types";
import HomeScreen from "../Screens/Home/HomeScreen";
import {
  screenOptions,
  HEADER_SHOWN_FALSE,
} from "../../shared/sharedScreenOptions";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import ItemsByVendorScreen from "../Screens/ItemsReference/ItemsByVendor/ItemsByVendorScreen";
import ItemsByCategoryStackScreen from "./ItemsByCategoryStackScreen";
import ItemsByVendorStackScreen from "./ItemsByVendorStackScreen";
import ItemsReferenceScreen from "../Screens/ItemsReference/ItemsReferenceScreen";
import ItemsReferenceStackScreen from "./ItemsReferenceStackScreen";

const Stack = createStackNavigator<HomeStackParamList>();

type Props = BottomTabScreenProps<RootTabParamList, "Home">;

const HomeStackScreen: FC<Props> = (): JSX.Element => {
  return (
    // <HomeScreen />
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      {/* <Stack.Screen
        name="ItemsReferenceStackScreen"
        component={ItemsReferenceStackScreen}
      /> */}
    </Stack.Navigator>
  );
};

export default memo<Props>(HomeStackScreen);
