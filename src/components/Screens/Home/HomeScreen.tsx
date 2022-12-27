import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Chip, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  BACKGROUND_MAIN_COLOR,
  FONT_WEIGHT_700,
  MAIN_COLOR,
} from "../../../shared/styles/sharedStyles";
import type { Icon, OnPress } from "../../../types/missingTypes";
import type { HomeScreenProps } from "../../../types/navigation";
import {
  itemLookup,
  itemsByCategory,
  itemsByVendor,
  itemsReference,
  itemsReferenceScreen,
  shoppingCartStack,
} from "../../../types/navigation";

const searchIcon: Icon = (
  <FontAwesome5
    name="search"
    color="white"
    size={24}
  />
);

const storeSearchIcon: Icon = (
  <MaterialCommunityIcons
    name="store-search-outline"
    color="white"
    size={24}
  />
);

const categoryIcon: Icon = (
  <MaterialIcons
    name="category"
    color="white"
    size={24}
  />
);

const shoppingCartIcon: Icon = (
  <MaterialIcons
    name="shopping-cart"
    color="white"
    type="MaterialIcons"
    size={24}
  />
);

type Props = HomeScreenProps;

const HomeScreen: FC<Props> = ({ navigation, route }) => {
  const { background } = useTheme().theme.colors;

  const navigateToItemLookup: OnPress = useCallback(
    () => navigation.navigate(itemLookup, { inputFocused: false }),
    [navigation]
  );

  const navigateToItemsByVendor: OnPress = useCallback(
    () =>
      navigation.navigate(itemsReference, {
        screen: itemsReferenceScreen,
        params: {
          screen: itemsByVendor,
        },
      }),
    [navigation]
  );

  const navigateToItemsByCategory: OnPress = useCallback(
    () =>
      navigation.navigate(itemsReference, {
        screen: itemsReferenceScreen,
        params: {
          screen: itemsByCategory,
        },
      }),
    [navigation]
  );

  const navigateToShoppingCart: OnPress = useCallback(
    () => navigation.navigate(shoppingCartStack),
    [navigation]
  );

  const viewStyle: StyleProp<ViewStyle> = useMemo(
    () => ({ backgroundColor: background }),
    [background]
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={viewStyle}>
        <View style={styles.container}>
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
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    height: "100%",
    justifyContent: "space-between",
    padding: 30,
  },
});

export default memo<Props>(HomeScreen);
