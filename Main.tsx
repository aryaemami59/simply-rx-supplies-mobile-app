import {
  Text,
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  GestureResponderEvent,
  TouchableOpacity,
} from "react-native";
import React, {
  createContext,
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import InputGroup from "./src/components/InputComponents/InputGroup";
import { useAppDispatch, useAppSelector } from "./src/redux/store";
import Constants from "expo-constants";
import {
  fetchItems,
  fetchVendors,
  fetchNavList,
  checkIfLoading,
  selectErrMsg,
} from "./src/redux/addedSlice";
import { Button } from "@rneui/themed";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useCallback } from "react";
import SideBarAccordionList from "./src/components/SideBarComponents/SideBarAccordionList";
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { checkIfAnyItemsAdded } from "./src/redux/addedSlice";
import ItemsByCategoryScreen from "./src/components/Screens/ItemsByCategoryScreen";
import CartColumnList from "./src/components/ShoppingCartComponents/CartColumnList";
import HomeScreen from "./src/components/Screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ItemLookupScreen from "./src/components/Screens/ItemLookupScreen";
import ItemsByVendorScreen from "./src/components/Screens/ItemsByVendorScreen";
import ShoppingCartScreen from "./src/components/Screens/ShoppingCartScreen";
import HeaderRight from "./src/components/HeaderComponents/HeaderRight";
import HeaderLeft from "./src/components/HeaderComponents/HeaderLeft";

const Tab = createBottomTabNavigator<RootStackParamList>();

export function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{ headerTitle: "RX Supplies", headerTitleAlign: "center" }}
      />
      <Tab.Screen name="ItemsByCategory" component={ItemsByCategoryNavigator} />
      <Drawer.Screen
        options={{ title: "Item Lookup" }}
        name="ItemLookup"
        component={ItemLookupScreen}
      />
      {/* <Drawer.Screen
        name="ItemsByCategory"
        component={ItemsByCategoryScreen}
        options={{ title: "Items By Category" }}
      /> */}
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
    </Tab.Navigator>
  );
}
// const Home = ({ navigation }) => {
//   return (
//     <View>
//       <Text>Home</Text>
//       <Button title="Home" onPress={() => navigation.navigate("Nav")} />
//     </View>
//   );
// };

export type RootStackParamList = {
  Home: undefined;
  ItemLookup: undefined;
  ItemsByCategory: undefined;
  ItemsByVendor: undefined;
  ShoppingCart: undefined;
  Tabs: undefined;
};

// const Stack = createStackNavigator<RootStackParamList>();

// const HomeStack = createStackNavigator(screens);

// export const MYAPP = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="Nav" component={NavScreen} />
//     </Stack.Navigator>
//   );
// };

// export const MYAPP = createAppContainer(HomeStack);

export const Drawer = createDrawerNavigator<RootStackParamList>();

// function HomeScreen({ navigation }) {

//   return (
//     <View style={{ padding: 10 }}>
//       <Button title="go to nav" onPress={() => navigation.navigate("Nav")} />
//       <InputGroup />
//     </View>
//   );
// }

const HomeNavigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const [showModal, setShowModal] = useState<boolean>(false);

  // const ifItemsAdded: boolean = useAppSelector(checkIfAnyItemsAdded);

  const clickHandler = useCallback((e: GestureResponderEvent) => {
    setShowModal(prev => !prev);
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name="ItemsByCategory" component={ItemsByCategoryScreen} /> */}
    </Stack.Navigator>
    // <View>
    //   <Text>Home</Text>
    //   <Button title="go home" />
    // </View>
    // <Stack.Navigator screenOptions={screenOptions}>
    //   <Stack.Screen
    //     name="home"
    //     component={HomeScreen}
    //     options={({ navigation }) => ({
    //       headerTitle: "RX Supplies",
    //       headerTitleAlign: "center",
    //       headerRight: () => (
    //         <View
    //           style={{
    //             flexDirection: "row",
    //             alignItems: "center",
    //             justifyContent: "space-evenly",
    //           }}>
    //           <>
    //             <Ionicons name="contrast" size={30} color="white" />
    //             <TouchableOpacity onPress={clickHandler}>
    //               <Ionicons
    //                 name={ifItemsAdded ? "cart" : "cart-outline"}
    //                 color="white"
    //                 size={40}
    //                 style={{ marginEnd: 20 }}
    //               />
    //               <CartColumnList
    //                 clickHandler={clickHandler}
    //                 showModal={showModal}
    //                 setShowModal={setShowModal}
    //               />
    //             </TouchableOpacity>
    //           </>
    //         </View>
    //       ),
    //       headerLeft: () => (
    //         <TouchableOpacity onPress={navigation.toggleDrawer}>
    //           <SimpleLineIcons
    //             name="menu"
    //             color="white"
    //             size={30}
    //             style={{ marginStart: 20 }}
    //           />
    //         </TouchableOpacity>
    //       ),
    //     })}
    //   />
    // </Stack.Navigator>
  );
};

const ItemsByCategoryNavigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ItemsByCategory" component={ItemsByCategoryScreen} />
    </Stack.Navigator>
  );
};

const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: { backgroundColor: "#0071dc" },
};

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
    return (
      <View style={styles.isLoadingStyle}>
        <ActivityIndicator size="large" color="aqua" />
      </View>
    );
  }

  if (errMsg) {
    return (
      <View>
        <Text style={{ color: "red", fontSize: 40 }}>
          Oh snap! You got an error!
        </Text>
        <Text style={{ color: "red", fontSize: 28 }}>
          Looks like there was a problem loading the page. Either refresh the
          page or try again later.
        </Text>
      </View>
    );
  }

  const MyDrawer = () => {
    return (
      <Drawer.Navigator
        screenOptions={({ navigation }) => ({
          ...screenOptions,
          headerRight: () => <HeaderRight navigation={navigation} />,
          headerLeft: () => <HeaderLeft navigation={navigation} />,
        })}>
        {/* <Drawer.Screen
          options={{ headerTitle: "RX Supplies", headerTitleAlign: "center" }}
          name="Tabs"
          component={MyTabs}
        /> */}
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
      </Drawer.Navigator>
    );
  };

  return (
    <View style={styles.ContainerStyle}>
      <MyDrawer />
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
  isLoadingStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
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
