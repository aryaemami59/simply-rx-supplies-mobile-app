import { StackScreenProps } from "@react-navigation/stack";
import { FC, memo } from "react";
import { Chip } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { HomeStackParamList } from "../../../../CustomTypes/types";
import { fontWeight700, mainColor } from "../../../shared/sharedStyles";

type Props = StackScreenProps<HomeStackParamList, "HomeScreen">;

const HomeScreen: FC<Props> = ({ navigation }): JSX.Element => {
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
          onPress={() =>
            navigation.navigate("ItemsReference", {
              screen: "ItemsReferenceScreen",
              params: {
                screen: "ItemsByVendor",
              },
            })
          }
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
          onPress={() =>
            navigation.navigate("ItemsReference", {
              screen: "ItemsReferenceScreen",
              params: {
                screen: "ItemsByCategory",
              },
            })
          }
        />
        <Chip
          raised
          titleStyle={styles.titleStyle}
          buttonStyle={styles.buttonStyle}
          title="Shopping Cart"
          size="lg"
          icon={
            <MaterialIcons
              name="shopping-cart"
              color="white"
              type="MaterialIcons"
              size={24}
            />
          }
          onPress={() => navigation.navigate("ShoppingCart")}
        />
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
    backgroundColor: mainColor,
  },
  titleStyle: {
    fontWeight: fontWeight700,
  },
});

export default memo<Props>(HomeScreen);
