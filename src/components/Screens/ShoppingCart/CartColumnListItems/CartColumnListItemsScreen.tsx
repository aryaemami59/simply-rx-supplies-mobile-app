import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Chip, ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useCallback, useEffect, useMemo } from "react";
import {
  FlatList,
  Linking,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { shallowEqual } from "react-redux";
import { ShoppingCartStackParamList } from "../../../../../CustomTypes/navigation";
import {
  ItemName,
} from "../../../../../CustomTypes/types";
import { useAppSelector } from "../../../../redux/hooks";
import {
  checkIfAnyItemsAddedToOneVendor,
  selectAddedItemsByVendor,
  selectVendorsLinks,
} from "../../../../redux/selectors";
import ItemNameProvider from "../../../../shared/contexts/ItemNameProvider";
import VendorNameProvider from "../../../../shared/contexts/VendorNameProvider";
import useOfficialVendorName from "../../../../shared/customHooks/useOfficialVendorName";
import {
  AI_CENTER,
  BACKGROUND_MAIN_COLOR,
  FONT_WEIGHT_700,
  HEIGHT_100,
  JC_SPACE_BETWEEN,
  TEXT_CENTER,
  TEXT_UNDERLINE,
  WIDTH_100,
} from "../../../../shared/sharedStyles";
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

type Props = NativeStackScreenProps<
  ShoppingCartStackParamList,
  "CartColumnListItems"
>;

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
    Linking.openURL(vendorLink);
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
    navigation.navigate("ItemLookup");
  }, [navigation]);

  const { background, black } = useTheme().theme.colors;

  const style = useMemo(
    () => [HEIGHT_100, { backgroundColor: background }],
    [background]
  );

  const containerStyle = useMemo(
    () => ({ backgroundColor: background }),
    [background]
  );

  const textStyle = useMemo(() => [TEXT_UNDERLINE, { color: black }], [black]);

  const emptyContainerStyle = useMemo(
    () => [HEIGHT_100, styles.emptyContainer, { backgroundColor: background }],
    [background]
  );

  const emptyTextStyle = useMemo(
    () => [TEXT_CENTER, styles.textStyle, { color: black }],
    [black]
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
        ListHeaderComponent={
          <>
            {ifAnyItemsAdded && (
              <ListItem.Swipeable
                containerStyle={containerStyle}
                rightContent={<Button title="Details" />}>
                <View style={viewStyle}>
                  <CartQRCodeImage vendorName={vendorName} />
                  <View style={styles.CartQRCodeImageContainer}>
                    <TouchableOpacity onPress={openLink}>
                      <Text style={textStyle}>
                        {officialVendorName} Website
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ListItem.Swipeable>
            )}
          </>
        }
        ListEmptyComponent={
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
        }
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
