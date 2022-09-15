import { View, StyleSheet, Platform } from "react-native";
import React, {
  createContext,
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useAppDispatch, useAppSelector } from "./src/redux/store";
import Constants from "expo-constants";
import {
  fetchItems,
  fetchVendors,
  fetchNavList,
  checkIfLoading,
  selectErrMsg,
} from "./src/redux/addedSlice";
import {
  createStackNavigator,
  StackHeaderProps,
} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ItemsByCategoryScreen from "./src/components/Screens/ItemsByCategoryScreen";
import HomeScreen from "./src/components/Screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ItemLookupScreen from "./src/components/Screens/ItemLookupScreen";
import ItemsByVendorScreen from "./src/components/Screens/ItemsByVendorScreen";
import ShoppingCartScreen from "./src/components/Screens/ShoppingCartScreen";
import IsLoadingComponents from "./IsLoadingComponents";
import ErrMsgComponent from "./ErrMsgComponent";
import HeaderHomeStackNavigator from "./src/components/HeaderComponents/HeaderHomeStackNavigator";
import TabBarIconShoppingCart from "./src/components/TabBarComponents/TabBarIconShoppingCart";
import TabBarIconHome from "./src/components/TabBarComponents/TabBarIconHome";
import TabBarIconItemLookup from "./src/components/TabBarComponents/TabBarIconItemLookup";
import {
  HomeStackParamList,
  ItemLookupStackParamList,
  ItemsByCategoryStackParamList,
  ItemsByVendorStackParamList,
  myContextInterface,
  RootTabParamList,
  ShoppingCartStackParamList,
  tabBarIconProps,
} from "./CustomTypes/types";
import ShoppingCartStackScreen from "./src/components/StackScreenComponents/ShoppingCartStackScreen";
import HomeStackScreen from "./src/components/StackScreenComponents/HomeStackScreen";

const Tab = createBottomTabNavigator<RootTabParamList>();
// const Drawer = createDrawerNavigator<RootStackParamList>();

const ItemLookupStack = createStackNavigator<ItemLookupStackParamList>();
const ItemsByCategoryStack =
  createStackNavigator<ItemsByCategoryStackParamList>();
const ItemsByVendorStack = createStackNavigator<ItemsByVendorStackParamList>();

const ItemsByCategoryStackScreen: FC = (): JSX.Element => {
  return (
    <ItemsByCategoryStack.Navigator screenOptions={hideHeader}>
      <ItemsByCategoryStack.Screen
        name="ItemsByCategory"
        component={ItemsByCategoryScreen}
      />
    </ItemsByCategoryStack.Navigator>
  );
};

const ItemsByVendorStackScreen: FC = (): JSX.Element => {
  return (
    <ItemsByVendorStack.Navigator screenOptions={hideHeader}>
      <ItemsByVendorStack.Screen
        name="ItemsByVendor"
        component={ItemsByVendorScreen}
      />
    </ItemsByVendorStack.Navigator>
  );
};

const hideHeader = {
  headerShown: false,
} as const;

const ItemLookupStackScreen: FC = (): JSX.Element => {
  return (
    <ItemLookupStack.Navigator screenOptions={hideHeader}>
      <ItemLookupStack.Screen name="ItemLookup" component={ItemLookupScreen} />
    </ItemLookupStack.Navigator>
  );
};

export const DarkMode = createContext<myContextInterface>({
  darkTheme: true,
  setDarkTheme: () => {},
});

const TabBarComponent: FC = (): JSX.Element => {
  const TabBarIconShoppingCartRender = useCallback(
    (props: tabBarIconProps): JSX.Element => (
      <TabBarIconShoppingCart {...props} />
    ),
    []
  );

  const TabBarIconHomeRender = useCallback(
    (props: tabBarIconProps): JSX.Element => <TabBarIconHome {...props} />,
    []
  );

  const TabBarIconItemLookupRender = useCallback(
    (props: tabBarIconProps): JSX.Element => (
      <TabBarIconItemLookup {...props} />
    ),
    []
  );

  return (
    <Tab.Navigator screenOptions={hideHeader}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: TabBarIconHomeRender,
        }}
      />
      <Tab.Screen
        name="ItemLookup"
        component={ItemLookupStackScreen}
        options={{
          tabBarLabel: "Item Lookup",
          tabBarIcon: TabBarIconItemLookupRender,
        }}
      />
      <Tab.Screen
        name="ShoppingCart"
        component={ShoppingCartStackScreen}
        options={({ navigation }) => ({
          headerTitle: "Shopping Cart",
          headerTitleAlign: "center",
          tabBarLabel: "Shopping Cart",
          tabBarIcon: TabBarIconShoppingCartRender,
        })}
      />
    </Tab.Navigator>
  );
};

// const MyDrawer: FC = (): JSX.Element => {
//   return (
//     <Drawer.Navigator
//       screenOptions={({ navigation }) => ({
//         headerRight: () => <HeaderRight navigation={navigation} />,
//         headerLeft: () => <HeaderLeft navigation={navigation} />,
//       })}>
//       <Drawer.Screen
//         options={{ headerTitle: "RX Supplies", headerTitleAlign: "center" }}
//         name="Home"
//         component={HomeStackScreen}
//       />
//       <Drawer.Screen
//         options={{ title: "Item Lookup" }}
//         name="ItemLookup"
//         component={ItemLookupScreen}
//       />
//       <Drawer.Screen
//         name="ItemsByCategory"
//         component={ItemsByCategoryStackScreen}
//         options={{ title: "Items By Category" }}
//       />
//       <Drawer.Screen
//         options={{ title: "Items By Vendor" }}
//         name="ItemsByVendor"
//         component={ItemsByVendorScreen}
//       />
//       <Drawer.Screen
//         options={{ title: "Shopping Cart" }}
//         name="ShoppingCart"
//         component={ShoppingCartScreen}
//       />
//     </Drawer.Navigator>
//   );
// };

const Main: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchVendors());
    dispatch(fetchNavList());
  }, [dispatch]);

  const isLoading: boolean = useAppSelector(checkIfLoading);
  const errMsg: string = useAppSelector(selectErrMsg);

  if (isLoading) {
    return <IsLoadingComponents />;
  }

  if (errMsg) {
    return <ErrMsgComponent />;
  }

  return (
    <View style={styles.ContainerStyle}>
      <TabBarComponent />
    </View>
  );
};

export default memo(Main);

const styles = StyleSheet.create({
  ContainerStyle: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
  },
  DarkModeStyle: {
    backgroundColor: "gray",
    color: "white",
    height: "100%",
  },
  LightModeStyle: {
    backgroundColor: "white",
    color: "black",
    height: "100%",
  },
});
