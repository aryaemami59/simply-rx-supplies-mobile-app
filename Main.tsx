import {
  Text,
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
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
import { Icon } from "@rneui/themed";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useCallback } from "react";
import SideBarAccordionList from "./src/components/SideBarComponents/SideBarAccordionList";
import CartColumnList from "./src/components/InputComponents/CartColumnList";
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { checkIfAnyItemsAdded } from "./src/redux/addedSlice";

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

  const ifItemsAdded: boolean = useAppSelector(checkIfAnyItemsAdded);

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
              <Ionicons
                // type="font-awesome"
                name={ifItemsAdded ? "cart" : "cart-outline"}
                color="white"
                size={40}
                style={{ marginEnd: 20 }}
                // iconStyle={{ marginRight: 30, fontSize: 24, color: "#fff" }}
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
              <SimpleLineIcons
                name="menu"
                color="white"
                size={30}
                style={{ marginStart: 20 }}
                // type="font-awesome"
                // iconStyle={{ marginLeft: 30, fontSize: 24, color: "#fff" }}
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
  headerStyle: { backgroundColor: "#0071dc" },
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
