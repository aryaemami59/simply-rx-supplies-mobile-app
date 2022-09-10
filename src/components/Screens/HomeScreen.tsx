import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { FC, memo } from "react";
import { RootStackParamList } from "../../../Main";
import { Chip, Icon } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = DrawerScreenProps<RootStackParamList, "Home">;

export const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: { backgroundColor: "#0071dc" },
};

const HomeScreen: FC<Props> = ({ navigation }): JSX.Element => {
  return (
    <>
      <SafeAreaView>
        <View style={styles.containerStyle}>
          <Chip
            raised
            titleStyle={styles.titleStyle}
            buttonStyle={styles.buttonStyle}
            title="Item Lookup"
            icon={
              <Icon name="search" color="white" type="font-awesome" size={20} />
            }
            size="lg"
            onPress={() => navigation.navigate("ItemLookup")}
          />
          <Chip
            raised
            titleStyle={styles.titleStyle}
            buttonStyle={styles.buttonStyle}
            title="Items By Vendor"
            icon={
              <MaterialCommunityIcons
                name="store-search-outline"
                color="white"
                size={24}
              />
            }
            size="lg"
            onPress={() => navigation.navigate("ItemsByVendor")}
          />
          <Chip
            raised
            icon={<Icon name="category" type="MaterialIcons" color="white" />}
            titleStyle={styles.titleStyle}
            buttonStyle={styles.buttonStyle}
            title="Items By Category"
            size="lg"
            onPress={() => navigation.navigate("ItemsByCategory")}
          />
          <Chip
            raised
            titleStyle={styles.titleStyle}
            buttonStyle={styles.buttonStyle}
            title="Shopping Cart"
            size="lg"
            icon={
              <Icon name="shopping-cart" color="white" type="MaterialIcons" />
            }
            onPress={() => navigation.navigate("ShoppingCart")}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: "stretch",
    justifyContent: "space-between",
    height: "100%",
    padding: 30,
  },
  buttonStyle: {
    backgroundColor: "#0071dc",
  },
  titleStyle: {
    fontWeight: "700",
  },
});

export default memo(HomeScreen);
