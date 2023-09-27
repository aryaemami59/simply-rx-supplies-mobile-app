import { Button, Chip, ListItem, useTheme } from "@rneui/themed";
import type { FC, ReactNode } from "react";
import { memo, useCallback, useEffect, useMemo } from "react";
import type {
  FlatListProps,
  ListRenderItem,
  StyleProp,
  TextStyle,
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

import useOfficialVendorName from "../../../../hooks/useOfficialVendorName";
import shoppingCartIcon from "../../../../Icons/shoppingCartIcon";
import { useAppSelector } from "../../../../redux/hooks";
import {
  checkIfAnyAddedToOneVendor,
  selectCartItemsIds,
  selectVendorsLinks,
} from "../../../../redux/selectors";
import ItemIdProvider from "../../../../shared/contexts/ItemIdProvider";
import VendorIdProvider from "../../../../shared/contexts/VendorIdProvider";
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
import type { ShoppingCartStackScreenProps } from "../../../../types/navigation";
import { itemLookup } from "../../../../types/navigation";
import type { KeyExtractor, OnPress } from "../../../../types/tsHelpers";
import CartQRCodeImage from "../QRImage/CartQRCodeImage";
import SingleCartListItems from "./SingleCartListItems";

const keyExtractor: KeyExtractor<number> = item => `${item}`;

const viewStyle: StyleProp<ViewStyle> = [
  AI_CENTER,
  WIDTH_100,
  JC_SPACE_BETWEEN,
];

type Props = ShoppingCartStackScreenProps<"CartColumnListItems">;

const CartColumnListItemsScreen: FC<Props> = ({ navigation, route }) => {
  const { vendorId } = route.params;
  const renderItems = useCallback<ListRenderItem<number>>(
    ({ item }) => (
      <ItemIdProvider itemId={item}>
        <VendorIdProvider vendorId={vendorId}>
          <SingleCartListItems />
        </VendorIdProvider>
      </ItemIdProvider>
    ),
    [vendorId]
  );
  const cartItemsIds = useAppSelector(state =>
    selectCartItemsIds(state, vendorId)
  );
  const vendorLink = useAppSelector(state =>
    selectVendorsLinks(state, vendorId)
  );
  const ifAnyItemsAdded = useAppSelector(state =>
    checkIfAnyAddedToOneVendor(state, vendorId)
  );

  const openLink = useCallback<OnPress>(() => {
    Linking.openURL(vendorLink).catch(e => {
      console.log(e);
    });
  }, [vendorLink]);

  const officialVendorName = useOfficialVendorName(vendorId);

  const options = useMemo<
    NonNullable<Parameters<typeof navigation.setOptions>[0]>
  >(
    () => ({
      headerTitle: officialVendorName,
    }),
    [officialVendorName]
  );

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);

  const clickHandler = useCallback<OnPress>(() => {
    navigation.navigate(itemLookup, { inputFocused: true });
  }, [navigation]);

  const { background: backgroundColor, black } = useTheme().theme.colors;

  const style = useMemo<StyleProp<ViewStyle>>(
    () => [HEIGHT_100, { backgroundColor }],
    [backgroundColor]
  );

  const containerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({ backgroundColor }),
    [backgroundColor]
  );

  const textStyle = useMemo<StyleProp<TextStyle>>(
    () => [TEXT_UNDERLINE, { color: black }],
    [black]
  );

  const emptyContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [HEIGHT_100, styles.emptyContainer, { backgroundColor }],
    [backgroundColor]
  );

  const emptyTextStyle = useMemo<StyleProp<TextStyle>>(
    () => [TEXT_CENTER, styles.textStyle, { color: black }],
    [black]
  );

  const rightContent = useMemo<ReactNode>(() => <Button title="Details" />, []);

  const ListHeaderComponent = useMemo<
    FlatListProps<number>["ListHeaderComponent"]
  >(
    () =>
      ifAnyItemsAdded ? (
        <ListItem.Swipeable
          containerStyle={containerStyle}
          rightContent={rightContent}>
          <View style={viewStyle}>
            <CartQRCodeImage cartId={vendorId} />
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
      vendorId,
    ]
  );

  const ListEmptyComponent = useMemo(
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
        data={cartItemsIds}
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
