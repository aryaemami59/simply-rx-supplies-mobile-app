import { StackScreenProps } from "@react-navigation/stack";
import { FC, memo, useCallback } from "react";
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

const searchIcon = <FontAwesome5 name="search" color="white" size={24} />;

const storeSearchIcon = (
  <MaterialCommunityIcons name="store-search-outline" color="white" size={24} />
);

const categoryIcon = <MaterialIcons name="category" color="white" size={24} />;

const shoppingCartIcon = (
  <MaterialIcons
    name="shopping-cart"
    color="white"
    type="MaterialIcons"
    size={24}
  />
);
type Props = StackScreenProps<HomeStackParamList, "HomeScreen">;

const HomeScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  const navigateToItemLookup = useCallback(
    () => navigation.navigate("ItemLookup"),
    [navigation]
  );

  const navigateToItemsByVendor = useCallback(
    () =>
      navigation.navigate("ItemsReference", {
        screen: "ItemsReferenceScreen",
        params: {
          screen: "ItemsByVendor",
        },
      }),
    [navigation]
  );

  const navigateToItemsByCategory = useCallback(
    () =>
      navigation.navigate("ItemsReference", {
        screen: "ItemsReferenceScreen",
        params: {
          screen: "ItemsByCategory",
        },
      }),
    [navigation]
  );

  const navigateToShoppingCart = useCallback(
    () => navigation.navigate("ShoppingCart"),
    [navigation]
  );

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
          icon={searchIcon}
          size="lg"
          onPress={navigateToItemLookup}
        />
        <Chip
          raised
          titleStyle={styles.titleStyle}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonStyle}
          color={mainColor}
          title="Items By Vendor"
          icon={storeSearchIcon}
          size="lg"
          onPress={navigateToItemsByVendor}
        />
        <Chip
          raised
          icon={categoryIcon}
          titleStyle={styles.titleStyle}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonStyle}
          color={mainColor}
          title="Items By Category"
          size="lg"
          onPress={navigateToItemsByCategory}
        />
        <Chip
          raised
          titleStyle={styles.titleStyle}
          buttonStyle={styles.buttonStyle}
          title="Shopping Cart"
          size="lg"
          icon={shoppingCartIcon}
          onPress={navigateToShoppingCart}
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
