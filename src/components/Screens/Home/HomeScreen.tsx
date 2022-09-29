import { StackScreenProps } from "@react-navigation/stack";
import { FC, memo, useCallback } from "react";
import { Chip, useTheme } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { HomeStackParamList } from "../../../../CustomTypes/types";
import {
  FONT_WEIGHT_700,
  MAIN_COLOR,
  BACKGROUND_MAIN_COLOR,
} from "../../../shared/sharedStyles";

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
  const { theme } = useTheme();

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
    <SafeAreaView style={[{ backgroundColor: theme.colors.background }]}>
      <View style={[styles.container]}>
        <Chip
          raised
          titleStyle={FONT_WEIGHT_700}
          buttonStyle={BACKGROUND_MAIN_COLOR}
          containerStyle={BACKGROUND_MAIN_COLOR}
          color={MAIN_COLOR}
          title="Item Lookup"
          icon={searchIcon}
          size="lg"
          onPress={navigateToItemLookup}
        />
        <Chip
          raised
          titleStyle={FONT_WEIGHT_700}
          buttonStyle={BACKGROUND_MAIN_COLOR}
          containerStyle={BACKGROUND_MAIN_COLOR}
          color={MAIN_COLOR}
          title="Items By Vendor"
          icon={storeSearchIcon}
          size="lg"
          onPress={navigateToItemsByVendor}
        />
        <Chip
          raised
          icon={categoryIcon}
          titleStyle={FONT_WEIGHT_700}
          buttonStyle={BACKGROUND_MAIN_COLOR}
          containerStyle={BACKGROUND_MAIN_COLOR}
          color={MAIN_COLOR}
          title="Items By Category"
          size="lg"
          onPress={navigateToItemsByCategory}
        />
        <Chip
          raised
          titleStyle={FONT_WEIGHT_700}
          buttonStyle={BACKGROUND_MAIN_COLOR}
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
  container: {
    alignItems: "stretch",
    justifyContent: "space-between",
    height: "100%",
    padding: 30,
  },
});

export default memo<Props>(HomeScreen);
