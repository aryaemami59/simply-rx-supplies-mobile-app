import { Chip, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import categoryIcon from "../../../Icons/categoryIcon";
import searchIcon from "../../../Icons/searchIcon";
import shoppingCartIcon from "../../../Icons/shoppingCartIcon";
import storeSearchIcon from "../../../Icons/storeSearchIcon";
import {
  BACKGROUND_MAIN_COLOR,
  FONT_WEIGHT_700,
  MAIN_COLOR,
} from "../../../shared/styles/sharedStyles";
import type { OnPress } from "../../../types/missingTypes";
import type { RootTabScreenProps } from "../../../types/navigation";
import {
  itemLookup,
  itemsByCategory,
  itemsByVendor,
  itemsReferenceScreen,
  itemsReferenceStackNavigator,
  shoppingCartStackNavigator,
} from "../../../types/navigation";

type Props = RootTabScreenProps<"Home">;

const HomeScreen: FC<Props> = ({ navigation, route }) => {
  const { background } = useTheme().theme.colors;

  const navigateToItemLookup: OnPress = useCallback(() => {
    navigation.navigate(itemLookup, { inputFocused: false });
  }, [navigation]);

  const navigateToItemsByVendor: OnPress = useCallback(() => {
    navigation.navigate(itemsReferenceStackNavigator, {
      screen: itemsReferenceScreen,
      params: {
        screen: itemsByVendor,
      },
    });
  }, [navigation]);

  const navigateToItemsByCategory: OnPress = useCallback(() => {
    navigation.navigate(itemsReferenceStackNavigator, {
      screen: itemsReferenceScreen,
      params: {
        screen: itemsByCategory,
      },
    });
  }, [navigation]);

  const navigateToShoppingCart: OnPress = useCallback(() => {
    navigation.navigate(shoppingCartStackNavigator);
  }, [navigation]);

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
