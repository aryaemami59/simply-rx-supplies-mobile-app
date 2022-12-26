import { MaterialIcons } from "@expo/vector-icons";
import { Button, Chip, ListItem, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useEffect, useMemo } from "react";
import type { ListRenderItem } from "react-native";
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../../../redux/hooks";
import {
  checkIfAnyItemsAddedToOneVendor,
  selectAddedItemsByVendor,
  selectVendorsLinks,
} from "../../../../redux/selectors";
import ItemNameProvider from "../../../../shared/contexts/ItemNameProvider";
import VendorNameProvider from "../../../../shared/contexts/VendorNameProvider";
import useOfficialVendorName from "../../../../shared/hooks/useOfficialVendorName";
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
import type { CartColumnListItemsScreenProps } from "../../../../types/navigation";
import { itemLookup } from "../../../../types/navigation";
import CartQRCodeImage from "../QRImage/CartQRCodeImage";
import SingleCartListItems from "./SingleCartListItems";

const shoppingCartIcon = (
  <MaterialIcons
    name="shopping-cart"
    color="white"
    size={24}
  />
);

const keyExtractor = (item: ItemName) => item;

type Props = CartColumnListItemsScreenProps;

const viewStyle = [AI_CENTER, WIDTH_100, JC_SPACE_BETWEEN];

const CartColumnListItemsScreen: FC<Props> = ({ navigation, route }) => {
  const { vendorName } = route.params;
  const renderItems: ListRenderItem<ItemName> = useCallback(
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

  const openLink = useCallback(() => {
    Linking.openURL(vendorLink).catch(e => console.log(e));
  }, [vendorLink]);

  const officialVendorName = useOfficialVendorName(vendorName);

  const options = useMemo(
    () => ({
      headerTitle: officialVendorName,
    }),
    [officialVendorName]
  );

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);

  const clickHandler = useCallback(() => {
    navigation.navigate(itemLookup);
  }, [navigation]);

  const { background: backgroundColor, black } = useTheme().theme.colors;

  const style = useMemo(
    () => [HEIGHT_100, { backgroundColor }],
    [backgroundColor]
  );

  const containerStyle = useMemo(
    () => ({ backgroundColor }),
    [backgroundColor]
  );

  const textStyle = useMemo(() => [TEXT_UNDERLINE, { color: black }], [black]);

  const emptyContainerStyle = useMemo(
    () => [HEIGHT_100, styles.emptyContainer, { backgroundColor }],
    [backgroundColor]
  );

  const emptyTextStyle = useMemo(
    () => [TEXT_CENTER, styles.textStyle, { color: black }],
    [black]
  );

  const rightContent = useMemo(() => <Button title="Details" />, []);

  const ListHeaderComponent = useMemo(
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
