import { FC, memo, useCallback, useEffect, useMemo } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import {
  selectByVendor,
  checkIfAnyItemsAddedToOneVendor,
} from "../../../../redux/addedSlice";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  ListRenderItem,
  ListRenderItemInfo,
  FlatList,
} from "react-native";
import {
  ShoppingCartStackParamList,
  ItemObjType,
} from "../../../../../CustomTypes/types";
import { selectVendorsLinks } from "../../../../redux/addedSlice";
import { selectVendorOfficialName } from "../../../../redux/addedSlice";
import SingleCartListItems from "./SingleCartListItems";
import { Chip, ListItem, useTheme } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import {
  FONT_WEIGHT_700,
  BACKGROUND_MAIN_COLOR,
  HEIGHT_100,
  TEXT_UNDERLINE,
} from "../../../../shared/sharedStyles";
import { TouchableOpacity } from "react-native";
import CartQRCodeImage from "../QRImage/CartQRCodeImage";
import {
  TEXT_CENTER,
  AI_CENTER,
  JC_AI_CENTER,
} from "../../../../shared/sharedStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "@rneui/themed";
import { WIDTH_100, JC_SPACE_BETWEEN } from "../../../../shared/sharedStyles";

const shoppingCartIcon = (
  <MaterialIcons name="shopping-cart" color="white" size={24} />
);

const keyExtractor = (item: ItemObjType) => item.id.toString();

type Props = NativeStackScreenProps<
  ShoppingCartStackParamList,
  "CartColumnListItems"
>;

const CartColumnListItemsScreen: FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const { vendorName } = route.params;
  const renderItems: ListRenderItem<ItemObjType> = ({
    item,
  }: ListRenderItemInfo<ItemObjType>): JSX.Element => {
    return <SingleCartListItems itemObj={item} vendorName={vendorName} />;
  };
  const addedItems = useAppSelector(selectByVendor(vendorName));
  const vendorLink = useAppSelector(selectVendorsLinks(vendorName));
  const ifAnyItemsAdded = useAppSelector(
    checkIfAnyItemsAddedToOneVendor(vendorName)
  );

  const openLink = useCallback(() => {
    Linking.openURL(vendorLink);
  }, [vendorLink]);

  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  const options = useMemo(() => {
    return {
      headerTitle: officialVendorName,
    };
  }, [officialVendorName]);

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);

  const clickHandler = useCallback(() => {
    navigation.navigate("ItemLookup");
  }, [navigation]);

  const { theme } = useTheme();

  return (
    <View style={[HEIGHT_100, { backgroundColor: theme.colors.background }]}>
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
              <>
                <ListItem.Swipeable
                  containerStyle={[
                    { backgroundColor: theme.colors.background },
                  ]}
                  rightContent={<Button title="Details" />}>
                  <View style={[AI_CENTER, WIDTH_100, JC_SPACE_BETWEEN]}>
                    <CartQRCodeImage vendorName={vendorName} />
                    <View style={[styles.CartQRCodeImageContainer]}>
                      <TouchableOpacity onPress={openLink}>
                        <Text
                          style={[
                            TEXT_UNDERLINE,
                            { color: theme.colors.black },
                          ]}>
                          {officialVendorName} Website
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ListItem.Swipeable>
              </>
            )}
          </>
        }
        ListEmptyComponent={
          <View
            style={[
              HEIGHT_100,
              styles.emptyContainer,
              { backgroundColor: theme.colors.background },
            ]}>
            <Text
              style={[
                TEXT_CENTER,
                styles.textStyle,
                { color: theme.colors.black },
              ]}>
              No Item Has Been Added Yet!
            </Text>
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
  textStyle: {
    paddingVertical: 20,
  },
  bigContainer: {
    paddingVertical: 10,
  },
  CartQRCodeImageContainer: {
    paddingVertical: 10,
  },
  vendorLinkContainer: {
    paddingVertical: 10,
  },
  hideButtonsContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
  },
  emptyContainer: {
    alignItems: "stretch",
    justifyContent: "space-between",
    padding: 30,
  },
});

export default memo<Props>(CartColumnListItemsScreen);
