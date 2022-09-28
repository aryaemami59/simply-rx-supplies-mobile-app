import { FC, memo, useCallback, useEffect } from "react";
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
import { StackScreenProps } from "@react-navigation/stack";
import {
  ShoppingCartStackParamList,
  ItemObjType,
} from "../../../../../CustomTypes/types";
import { selectVendorsLinks } from "../../../../redux/addedSlice";
import { selectVendorOfficialName } from "../../../../redux/addedSlice";
import SingleCartListItems from "./SingleCartListItems";
import { officialVendorNameType } from "../../../../../CustomTypes/types";
import { Chip } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { mainColor, fontWeight700 } from "../../../../shared/sharedStyles";
import { TouchableOpacity } from "react-native";
import CartQRCodeImage from "../QRImage/CartQRCodeImage";

const renderItems: ListRenderItem<ItemObjType> = ({
  item,
}: ListRenderItemInfo<ItemObjType>): JSX.Element => {
  return <SingleCartListItems item={item} />;
};

const keyExtractor = (item: ItemObjType) => item.id.toString();

type Props = StackScreenProps<
  ShoppingCartStackParamList,
  "CartColumnListItems"
>;

const CartColumnListItemsScreen: FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const { vendorName } = route.params;
  const addedItems = useAppSelector(selectByVendor(vendorName));
  const vendorLink = useAppSelector(selectVendorsLinks(vendorName));
  const ifAnyItemsAdded = useAppSelector<boolean>(
    checkIfAnyItemsAddedToOneVendor(vendorName)
  );

  const openLink = useCallback(() => {
    Linking.openURL(vendorLink);
  }, [vendorLink]);

  const officialVendorName = useAppSelector<officialVendorNameType>(
    selectVendorOfficialName(vendorName)
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: officialVendorName,
    });
  }, [navigation, officialVendorName]);

  const clickHandler = useCallback(() => {
    navigation.navigate("ItemLookup");
  }, [navigation]);

  return (
    <>
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
          <View style={styles.bigContainer}>
            {ifAnyItemsAdded && (
              <>
                <View style={styles.CartQRCodeImageContainer}>
                  <CartQRCodeImage vendorName={vendorName} />
                </View>
                <View style={styles.vendorLinkContainer}>
                  <TouchableOpacity onPress={openLink}>
                    <Text>{officialVendorName} Website</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.textStyle}>No Item Has Been Added Yet!</Text>
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
    </>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    textAlign: "center",
    paddingVertical: 20,
  },
  viewStyle: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  bigContainer: {
    paddingVertical: 10,
  },
  CartQRCodeImageContainer: {
    paddingVertical: 10,
    alignItems: "center",
  },
  vendorLinkContainer: {
    paddingVertical: 10,
    alignItems: "center",
  },
  hideButtonsContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
  },
  buttonStyle: {
    backgroundColor: mainColor,
  },
  titleStyle: {
    fontWeight: fontWeight700,
  },
  emptyContainer: {
    alignItems: "stretch",
    justifyContent: "space-between",
    height: "100%",
    padding: 30,
  },
});

export default memo<Props>(CartColumnListItemsScreen);
