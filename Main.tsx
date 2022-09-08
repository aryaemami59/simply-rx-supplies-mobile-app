import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  NativeSyntheticEvent,
  GestureResponderEvent,
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
import InputGroup from "./src/components/InputGroup";
import { useAppDispatch, useAppSelector } from "./src/redux/store";
import Constants from "expo-constants";
import {
  fetchItems,
  fetchVendors,
  fetchNavList,
  checkIfLoading,
  selectErrMsg,
} from "./src/redux/addedSlice";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { Badge, Button, Header } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "@rneui/themed";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { selectItemsArr } from "./src/redux/addedSlice";
import SideBarAccordionVendor from "./src/components/SideBarAccordionVendor";
import { useCallback } from "react";
import SideBarAccordionList from "./src/components/SideBarAccordionList";
import { Drawer as PaperDrawer } from "react-native-paper";
import CartColumnList from "./src/components/CartColumnList";

export const Drawer = createDrawerNavigator();

function HomeScreen() {
  // const Stack = createStackNavigator();

  return (
    <View style={{ padding: 10 }}>
      <InputGroup />
    </View>
  );
}

// function DrawerContent() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Drawer content</Text>
//     </View>
//   );
// }

const HomeNavigator = () => {
  const Stack = createStackNavigator();
  const [showModal, setShowModal] = useState(false);

  const clickHandler = useCallback((e: GestureResponderEvent) => {
    setShowModal(prev => !prev);
  }, []);

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity onPress={clickHandler}>
              <Icon
                name="shopping-cart"
                type="font-awesome"
                iconStyle={{ marginRight: 30, fontSize: 24, color: "#fff" }}
              />
              {/* <Badge status="success" /> */}
              <CartColumnList
                clickHandler={clickHandler}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={navigation.toggleDrawer}>
              <Icon
                name="bars"
                type="font-awesome"
                iconStyle={{ marginLeft: 30, fontSize: 24, color: "#fff" }}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

// const CartNavigator = () => {
//   const Stack = createStackNavigator();

//   return (

//   )
// };

const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: { backgroundColor: "#5637DD" },
};

// const CustomDrawerContent = props => {
//   return (
//     <DrawerContentScrollView {...props}>
//       <View>
//         <View style={{ flex: 2 }}>
//           <Text style={{ margin: 10 }}>Choose Items By Vendor</Text>
//         </View>
//       </View>
//       <DrawerItemList {...props} labelStyle={{ fontWeight: "bold" }} />
//     </DrawerContentScrollView>
//   );
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
  const [darkTheme, setDarkTheme] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const clickHandler = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchVendors());
    dispatch(fetchNavList());
  }, [dispatch]);

  const isLoading: boolean = useAppSelector(checkIfLoading);
  const errMsg: string = useAppSelector(selectErrMsg);

  if (isLoading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}>
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

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
      }}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={() => <SideBarAccordionList />}>
        <Drawer.Screen name="Home" component={HomeNavigator} />
        {/* <Drawer.Screen name="Cart" component={HomeNavigator} /> */}
      </Drawer.Navigator>
    </View>
  );
};

export default memo(Main);

const styles = StyleSheet.create({
  ContainerStyle: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  DarkModeStyle: {
    backgroundColor: "gray",
    color: "white",
    height: "100%",
    // flex: 1,
  },
  LightModeStyle: {
    backgroundColor: "white",
    color: "black",
    height: "100%",
    // flex: 1,
  },
});
