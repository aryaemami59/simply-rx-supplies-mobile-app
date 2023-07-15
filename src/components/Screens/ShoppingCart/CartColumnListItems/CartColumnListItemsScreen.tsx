import type { ListItemSwipeableProps } from "@rneui/themed";
import { Button, Chip, ListItem, useTheme } from "@rneui/themed";
import type { FC, ReactElement, ReactNode } from "react";
import { memo, useCallback, useEffect, useMemo } from "react";
import type {
  FlatListProps,
  StyleProp,
  TextStyle,
  TouchableWithoutFeedbackProps,
  ViewStyle,
} from "react-native";
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { shallowEqual } from "react-redux";
import shoppingCartIcon from "../../../../Icons/shoppingCartIcon";
import useOfficialVendorName from "../../../../hooks/useOfficialVendorName";
import { useAppSelector } from "../../../../redux/hooks";
import {
  checkIfAnyItemsAddedToOneVendor,
  selectAddedItemsByVendor,
  selectVendorsLinks,
} from "../../../../redux/selectors";
import ItemNameProvider from "../../../../shared/contexts/ItemNameProvider";
import VendorNameProvider from "../../../../shared/contexts/VendorNameProvider";
import {
  AI_CENTER,
  BACKGROUND_MAIN_COLOR,
  FONT_WEIGHT_700,
  HEIGHT_100,
  JC_SPACE_BETWEEN,
  TEXT_CENTER,
  TEXT_UNDERLINE,
  WIDTH_100,
} from "../../../../shared/styles/sharedStyles";
import type { ItemName } from "../../../../types/api";
import type { KeyExtractor, RenderItem } from "../../../../types/missingTypes";
import type { ShoppingCartStackScreenProps } from "../../../../types/navigation";
import { itemLookup } from "../../../../types/navigation";
import CartQRCodeImage from "../QRImage/CartQRCodeImage";
import SingleCartListItems from "./SingleCartListItems";

const keyExtractor: KeyExtractor<ItemName> = item => item;

const viewStyle: StyleProp<ViewStyle> = [
  AI_CENTER,
  WIDTH_100,
  JC_SPACE_BETWEEN,
];

type Props = ShoppingCartStackScreenProps<"CartColumnListItems">;

const CartColumnListItemsScreen: FC<Props> = ({ navigation, route }) => {
  const { vendorName } = route.params;
  const renderItems: RenderItem<ItemName> = useCallback(
    ({ item }) => (
      <ItemNameProvider itemName={item}>
        <VendorNameProvider vendorName={vendorName}>
          <SingleCartListItems />
        </VendorNameProvider>
      </ItemNameProvider>
    ),
    [vendorName]
  );
  const addedItems = useAppSelector(
    selectAddedItemsByVendor(vendorName),
    shallowEqual
  );
  const vendorLink = useAppSelector(selectVendorsLinks(vendorName));
  const ifAnyItemsAdded = useAppSelector(
    checkIfAnyItemsAddedToOneVendor(vendorName)
  );

  const openLink: NonNullable<TouchableWithoutFeedbackProps["onPress"]> =
    useCallback(() => {
      Linking.openURL(vendorLink).catch(e => {
        console.log(e);
      });
    }, [vendorLink]);

  const officialVendorName = useOfficialVendorName(vendorName);

  const options: NonNullable<Parameters<typeof navigation.setOptions>[number]> =
    useMemo(
      () => ({
        headerTitle: officialVendorName,
      }),
      [officialVendorName]
    );

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);

  const clickHandler: NonNullable<TouchableWithoutFeedbackProps["onPress"]> =
    useCallback(() => {
      // navigation.navigate("ItemLookup");
      navigation.navigate(itemLookup, { inputFocused: true });
    }, [navigation]);

  const { background: backgroundColor, black } = useTheme().theme.colors;

  const style: StyleProp<ViewStyle> = useMemo(
    () => [HEIGHT_100, { backgroundColor }],
    [backgroundColor]
  );

  const containerStyle: StyleProp<ViewStyle> = useMemo(
    () => ({ backgroundColor }),
    [backgroundColor]
  );

  const textStyle: StyleProp<TextStyle> = useMemo(
    () => [TEXT_UNDERLINE, { color: black }],
    [black]
  );

  const emptyContainerStyle: StyleProp<ViewStyle> = useMemo(
    () => [HEIGHT_100, styles.emptyContainer, { backgroundColor }],
    [backgroundColor]
  );

  const emptyTextStyle: StyleProp<TextStyle> = useMemo(
    () => [TEXT_CENTER, styles.textStyle, { color: black }],
    [black]
  );

  const rightContent: Extract<
    ListItemSwipeableProps["rightContent"],
    ReactNode
  > = useMemo(() => <Button title="Details" />, []);

  const ListHeaderComponent: Extract<
    ReactElement | null,
    FlatListProps<ItemName>["ListHeaderComponent"]
  > = useMemo(
    () =>
      ifAnyItemsAdded ? (
        <ListItem.Swipeable
          containerStyle={containerStyle}
          rightContent={rightContent}>
          <View style={viewStyle}>
            <CartQRCodeImage vendorName={vendorName} />
            <View style={styles.CartQRCodeImageContainer}>
              <TouchableOpacity onPress={openLink}>
                <Text style={textStyle}>{officialVendorName} Website</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ListItem.Swipeable>
      ) : null,
    [
      containerStyle,
      ifAnyItemsAdded,
      officialVendorName,
      openLink,
      rightContent,
      textStyle,
      vendorName,
    ]
  );

  const ListEmptyComponent: Extract<
    ReactElement,
    FlatListProps<ItemName>["ListEmptyComponent"]
  > = useMemo(
    () => (
      <View style={emptyContainerStyle}>
        <Text style={emptyTextStyle}>No Item Has Been Added Yet!</Text>
        <Chip
          raised
          titleStyle={FONT_WEIGHT_700}
          buttonStyle={BACKGROUND_MAIN_COLOR}
          title="Shopping Cart"
          size="lg"
          icon={shoppingCartIcon}
          onPress={clickHandler}
        />
      </View>
    ),
    [clickHandler, emptyContainerStyle, emptyTextStyle]
  );

  return (
    <View style={style}>
      {/* <View style={styles.bigContainer}>
        {ifAnyItemsAdded && (
          <>
            <View style={styles.CartQRCodeImageContainer}>
              <CartQRCodeImage vendorName={vendorName} />
            </View>
            <View style={styles.vendorLinkContainer}>
              <Text onPress={openLink}>{officialVendorName} Website</Text>
            </View>
          </>
        )}
      </View> */}
      {/* <View style={styles.hideButtonsContainer}>
          <HideItemName />
          <HideItemNumber />
          <HideItemBarcode />
        </View> */}
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        removeClippedSubviews
        maxToRenderPerBatch={5}
        data={addedItems}
        renderItem={renderItems}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={7}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  CartQRCodeImageContainer: {
    paddingVertical: 10,
  },
  emptyContainer: {
    alignItems: "stretch",
    justifyContent: "space-between",
    padding: 30,
  },
  textStyle: {
    paddingVertical: 20,
  },
});

export default memo<Props>(CartColumnListItemsScreen);
