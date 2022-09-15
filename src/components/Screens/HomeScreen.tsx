import { StackScreenProps } from "@react-navigation/stack";
import { FC, memo } from "react";
import { Chip, Icon } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { RootStackParamList } from "../../../CustomTypes/types";

type Props = StackScreenProps<RootStackParamList, "Home">;

export const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: { backgroundColor: "#0071dc" },
};

const HomeScreen: FC<Props> = ({ navigation }): JSX.Element => {
  return (
    <SafeAreaView>
      <View style={styles.containerStyle}>
        <Chip
          raised
          titleStyle={styles.titleStyle}
          buttonStyle={styles.buttonStyle}
          title="Item Lookup"
          icon={<FontAwesome5 name="search" color="white" size={24} />}
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
          icon={<MaterialIcons name="category" color="white" size={24} />}
          titleStyle={styles.titleStyle}
          buttonStyle={styles.buttonStyle}
          title="Items By Category"
          size="lg"
          onPress={() => navigation.navigate("ItemsByCategory")}
        />
        {/* <Chip
            raised
            titleStyle={styles.titleStyle}
            buttonStyle={styles.buttonStyle}
            title="Shopping Cart"
            size="lg"
            icon={
              <Icon name="shopping-cart" color="white" type="MaterialIcons" />
            }
            onPress={() => navigation.navigate("ShoppingCart")}
          /> */}
      </View>
    </SafeAreaView>
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
