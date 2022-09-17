import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { FC, memo } from "react";
import { Chip } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  RootStackParamList,
  HomeStackParamList,
} from "../../../../CustomTypes/types";
import { useNavigation } from "@react-navigation/native";
import { fontWeightBold, mainColor } from "../../../shared/sharedStyles";

type Props = StackScreenProps<HomeStackParamList, "HomeScreen">;

const HomeScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView>
      <View style={styles.containerStyle}>
        <Chip
          raised
          titleStyle={styles.titleStyle}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonStyle}
          color={mainColor}
          title="Item Lookup"
          icon={<FontAwesome5 name="search" color="white" size={24} />}
          size="lg"
          onPress={() => navigation.navigate("ItemLookup")}
        />
        <Chip
          raised
          titleStyle={styles.titleStyle}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonStyle}
          color={mainColor}
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
          containerStyle={styles.buttonStyle}
          color={mainColor}
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
              <MaterialIcons name="shopping-cart" color="white" type="MaterialIcons" />
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
    // backgroundColor: "white",
  },
  buttonStyle: {
    backgroundColor: mainColor,
  },
  titleStyle: {
    fontWeight: fontWeightBold,
  },
});

export default memo<Props>(HomeScreen);
