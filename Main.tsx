import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  ActivityIndicator,
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
import { Button, Header } from "@rneui/themed";
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
import SideBarAccordion from "./src/components/SideBarAccordion";

const Drawer = createDrawerNavigator();

// const HamburgerMenuIcon = ({ navigation }): JSX.Element => {
//   return (
//     <Icon
//       name="bars"
//       size={40}
//       type="font-awesome"
//       onPress={() => navigation.toggleDrawer()}
//     />
//     // <TouchableHighlight onPress={() => navigation.toggleDrawer()}>
//     //   <FontAwesomeIcon icon={faBars} size={50} />
//     // </TouchableHighlight>
//   );
// };

const HomeNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="home"
        component={Button}
        options={({ navigation }) => ({
          title: "Home",
          headerLeft: () => (
            <Icon
              name="bars"
              type="font-awesome"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: { backgroundColor: "#5637DD" },
};

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <View style={{ flex: 2 }}>
          <Text style={{ margin: 10 }}>Choose Items By Vendor</Text>
        </View>
      </View>
      <DrawerItemList {...props} labelStyle={{ fontWeight: "bold" }} />
    </DrawerContentScrollView>
  );
};

export interface myContextInterface {
  darkTheme: boolean;
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
}

export const DarkMode = createContext<myContextInterface>({
  darkTheme: true,
  setDarkTheme: () => {},
});

// const getLocalStorageTheme = (): boolean =>
//   localStorage.getItem("theme") ? !!localStorage.getItem("theme") : true;

const Main: FC = (): JSX.Element => {
  const [darkTheme, setDarkTheme] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  // const allItems = useAppSelector(selectItemsArr);

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
        initialRouteName="bars"
        // drawerContent={CustomDrawerContent}
        drawerContent={() => <SideBarAccordion />}>
        <Drawer.Screen
          name="bars"
          component={HomeNavigator}
          options={{
            title: "Home",
            drawerIcon: ({ color }) => (
              <Icon
                name="bars"
                reverseColor="red"
                type="font-awesome"
                size={40}
                color={color}
              />
            ),
          }}
        />
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
