// @ts-nocheck
import { Text, View, StyleSheet, Platform } from "react-native";
import React, {
  createContext,
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
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
import { Button, Header, Icon, SearchBar } from "@rneui/themed";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ItemsByCategoryScreen from "./src/components/Screens/ItemsByCategoryScreen";
import HomeScreen from "./src/components/Screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ItemLookupScreen from "./src/components/Screens/ItemLookupScreen";
import ItemsByVendorScreen from "./src/components/Screens/ItemsByVendorScreen";
import ShoppingCartScreen from "./src/components/Screens/ShoppingCartScreen";
import HeaderRight from "./src/components/HeaderComponents/HeaderRight";
import HeaderLeft from "./src/components/HeaderComponents/HeaderLeft";
import IsLoadingComponents from "./IsLoadingComponents";
import ErrMsgComponent from "./ErrMsgComponent";
import InputGroup from "./src/components/InputComponents/InputGroup";
// import { screenOptions } from "./src/components/Screens/HomeScreen";
import { useIsFocused } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  ItemLookup: undefined;
  ItemsByCategory: undefined;
  ItemsByVendor: undefined;
  ShoppingCart: undefined;
  Tabs: undefined;
  Login: undefined;
  Register: undefined;
  HomeNavigator: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

// export function MyTabs() {
//   return (
//     <Tab.Navigator screenOptions={{ headerShown: false }}>
//       <Tab.Screen
//         name="Home"
//         // component={HomeNavigator}
//         component={HomeScreen}
//         options={({ navigation }) => ({
//           tabBarIcon: () => (
//             <Icon
//               name="search"
//               type="font-awesome"
//               onPress={() => navigation.navigate("ItemLookup")}
//             />
//           ),
//         })}
//       />
//     </Tab.Navigator>
//   );
// }

const HomeStack = createStackNavigator();
const ItemLookupStack = createStackNavigator();
const ShoppingCartStack = createStackNavigator();
const ItemsByCategoryStack = createStackNavigator<RootStackParamList>();

const ShoppingCartStackScreen = () => {
  return (
    <ShoppingCartStack.Navigator>
      <ShoppingCartStack.Screen
        name="ShoppingCartScreen"
        component={ShoppingCartScreen}
      />
    </ShoppingCartStack.Navigator>
  );
};

const HomeStackScreen = ({ navigation }) => {
  const inputRef = useRef(null);
  const isFocused = useIsFocused();
  !isFocused && inputRef.current.blur();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      inputRef.current.blur();
    });
    return unsubscribe;
    // inputRef.current.isFocused && inputRef.current?.blur();
  });

  const focusHandler = useCallback(() => {
    // const unsubscribe = navigation.addListener("focus", () => {
    //   inputRef.current.blur();
    // });
    navigation.navigate("ItemLookup");
    // return unsubscribe;
    inputRef.current.blur();
  }, []);

  return (
    <HomeStack.Navigator
      screenOptions={({ navigation }) => ({
        header: () => (
          <Header
            leftContainerStyle={{ display: "none" }}
            rightContainerStyle={{ display: "none" }}
            centerComponent={
              <SearchBar
                ref={inputRef}
                onFocus={focusHandler}
                lightTheme
                containerStyle={{
                  backgroundColor: "transparent",
                  borderBottomWidth: 0,
                  borderTopWidth: 0,
                  width: "100%",
                }}
                placeholder="Search..."
                round
                inputContainerStyle={{
                  borderRadius: 9999,
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                }}
                inputStyle={{
                  color: "white",
                }}
                placeholderTextColor="rgba(255,255,255,.5)"
                searchIcon={
                  <Icon
                    name="search"
                    color="rgba(255,255,255,.5)"
                    type="font-awesome"
                  />
                }
                clearIcon={
                  <Icon
                    name="close"
                    color="rgba(255,255,255,.5)"
                    type="EvilIcons"
                  />
                }
              />
            }
          />
        ),
      })}
      // screenOptions={({ navigation }) => ({
      //   headerTitle: "RX Supplies",
      //   headerTitleAlign: "center",
      //   headerStyle: {
      //     backgroundColor: "#0071dc",
      //   },
      //   headerBackTitleStyle: {
      //     color: "white",
      //   },
      //   headerBackTitleVisible: false,
      //   headerTintColor: "white",
      //   headerTitleStyle: {
      //     color: "white",
      //   },
      //   headerRight: () => <HeaderRight navigation={navigation} />,
      // })}
    >
      <HomeStack.Screen name="HomeNavigator" component={HomeScreen} />
      <HomeStack.Screen
        name="ShoppingCart"
        component={ShoppingCartScreen}
        options={({ navigation }) => ({
          headerTitle: "Shopping Cart",
        })}
      />
    </HomeStack.Navigator>
  );
};

const ItemsByCategoryStackScreen = () => {
  return (
    <ItemsByCategoryStack.Navigator screenOptions={{ headerShown: false }}>
      <ItemsByCategoryStack.Screen
        name="ItemsByCategory"
        component={ItemsByCategoryScreen}
      />
    </ItemsByCategoryStack.Navigator>
  );
};

const ItemLookupStackScreen = () => {
  return (
    <ItemLookupStack.Navigator
      screenOptions={{ headerShown: false }}
      // screenOptions={({ navigation }) => ({
      //   headerTitle: "Item Lookup",
      //   headerTitleAlign: "center",
      //   headerStyle: {
      //     backgroundColor: "#0071dc",
      //   },
      //   headerBackTitleStyle: {
      //     color: "white",
      //   },
      //   headerBackTitleVisible: false,
      //   headerTintColor: "white",
      //   headerTitleStyle: {
      //     color: "white",
      //   },
      //   headerRight: () => <HeaderRight navigation={navigation} />,
      // })}
    >
      <ItemLookupStack.Screen
        name="ItemLookupScreen"
        component={ItemLookupScreen}
      />
      <ItemLookupStack.Screen
        name="ShoppingCart"
        component={ShoppingCartScreen}
        options={({ navigation }) => ({
          headerTitle: "Shopping Cart",
        })}
      />
    </ItemLookupStack.Navigator>
  );
};

// const screenOptions = {
//   headerTintColor: "#fff",
//   headerStyle: { backgroundColor: "#0071dc" },
// };

export interface myContextInterface {
  darkTheme: boolean;
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
}

export const DarkMode = createContext<myContextInterface>({
  darkTheme: true,
  setDarkTheme: () => {},
});

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

  const MyTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: false,
          // tabbar
          // ...screenOptions,
          // headerRight: () => <HeaderRight navigation={navigation} />,
          // headerLeft: () => <HeaderLeft navigation={navigation} />,
        })}>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            headerTitle: "RX Supplies",
            headerTitleAlign: "center",
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name={focused ? "home" : "home-outline"}
                type="ionicon"
                focused={focused}
                color={color}
                size={size}
              />
            ),
            // tabBarActiveTintColor: "red",
          }}
        />
        <Tab.Screen
          name="ItemLookup"
          component={ItemLookupStackScreen}
          options={{
            headerTitle: "Item Lookup",
            headerTitleAlign: "center",
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name="search"
                type="font-awesome"
                focused={focused}
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  const MyDrawer = () => {
    return (
      <Drawer.Navigator
        screenOptions={({ navigation }) => ({
          ...screenOptions,
          headerRight: () => <HeaderRight navigation={navigation} />,
          headerLeft: () => <HeaderLeft navigation={navigation} />,
        })}>
        <Drawer.Screen
          options={{ headerTitle: "RX Supplies", headerTitleAlign: "center" }}
          name="Home"
          // component={HomeScreen}
          component={HomeStackScreen}
        />
        <Drawer.Screen
          options={{ title: "Item Lookup" }}
          name="ItemLookup"
          component={ItemLookupScreen}
        />
        <Drawer.Screen
          name="ItemsByCategory"
          component={ItemsByCategoryStackScreen}
          // component={ItemsByCategoryScreen}
          options={{ title: "Items By Category" }}
        />
        <Drawer.Screen
          options={{ title: "Items By Vendor" }}
          name="ItemsByVendor"
          component={ItemsByVendorScreen}
        />
        <Drawer.Screen
          options={{ title: "Shopping Cart" }}
          name="ShoppingCart"
          component={ShoppingCartScreen}
        />
      </Drawer.Navigator>
    );
  };

  return (
    <View style={styles.ContainerStyle}>
      <MyTabs />
      {/* <MyDrawer /> */}
      {/* <Drawer.Navigator
        screenOptions={({ navigation }) => ({
          ...screenOptions,
          headerRight: () => <HeaderRight navigation={navigation} />,
          headerLeft: () => <HeaderLeft navigation={navigation} />,
        })}>
        <Drawer.Screen
          options={{ headerTitle: "RX Supplies", headerTitleAlign: "center" }}
          name="Home"
          component={HomeScreen}
        />
        <Drawer.Screen
          options={{ title: "Item Lookup" }}
          name="ItemLookup"
          component={ItemLookupScreen}
        />
        <Drawer.Screen
          name="ItemsByCategory"
          component={ItemsByCategoryScreen}
          options={{ title: "Items By Category" }}
        />
        <Drawer.Screen
          options={{ title: "Items By Vendor" }}
          name="ItemsByVendor"
          component={ItemsByVendorScreen}
        />
        <Drawer.Screen
          options={{ title: "Shopping Cart" }}
          name="ShoppingCart"
          component={ShoppingCartScreen}
        />
      </Drawer.Navigator> */}
      {/* <Tab.Navigator
        screenOptions={({ navigation }) => ({
          ...screenOptions,
          headerRight: () => <HeaderRight navigation={navigation} />,
          headerLeft: () => <HeaderLeft navigation={navigation} />,
        })}>
        <Tab.Screen
          options={{ headerTitle: "RX Supplies", headerTitleAlign: "center" }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{ title: "Item Lookup" }}
          name="ItemLookup"
          component={ItemLookupScreen}
        />
        <Tab.Screen name="Tabs" component={MyDrawer} /> */}
      {/* <Tab.Screen
          name="ItemsByCategory"
          component={ItemsByCategoryScreen}
          options={{ title: "Items By Category" }}
        />
        <Tab.Screen
          options={{ title: "Items By Vendor" }}
          name="ItemsByVendor"
          component={ItemsByVendorScreen}
        /> */}
      {/* <Tab.Screen
          options={{ title: "Shopping Cart" }}
          name="ShoppingCart"
          component={ShoppingCartScreen}
        />
      </Tab.Navigator> */}
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
