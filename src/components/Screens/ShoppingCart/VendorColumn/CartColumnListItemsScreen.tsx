import { FC, memo, useCallback, useEffect } from "react";
import { useAppSelector } from "../../../../redux/store";
import { selectByVendor } from "../../../../redux/addedSlice";
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
import CartQRCodeImage from "../../../ShoppingCartComponents/CartQRCodeImage";
import {
  ShoppingCartStackParamList,
  ItemObjType,
} from "../../../../../CustomTypes/types";
import { selectVendorsLinks } from "../../../../redux/addedSlice";
import HideItemName from "../../../ShoppingCartComponents/HideItemName";
import HideItemNumber from "../../../ShoppingCartComponents/HideItemNumber";
import HideItemBarcode from "../../../ShoppingCartComponents/HideItemBarcode";
import { selectVendorOfficialName } from "../../../../redux/addedSlice";
import SingleCartListItems from "./SingleCartListItems";
import { officialVendorNameType } from "../../../../../CustomTypes/types";

const renderItems: ListRenderItem<ItemObjType> = ({
  item,
}: ListRenderItemInfo<ItemObjType>): JSX.Element => {
  return <SingleCartListItems item={item} />;
};

const keyExtractor = (item: ItemObjType) => item.id.toString();

type Props = StackScreenProps<ShoppingCartStackParamList, "VendorItems">;

const CartColumnListItemsScreen: FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const { vendorName } = route.params;
  const addedItems = useAppSelector(selectByVendor(vendorName));
  const vendorLink = useAppSelector(selectVendorsLinks(vendorName));

  const openLink = useCallback(() => {
    Linking.openURL(vendorLink);
  }, []);

  const officialVendorName = useAppSelector<officialVendorNameType>(
    selectVendorOfficialName(vendorName)
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: officialVendorName,
    });
  }, []);

  return (
    <>
      <View style={styles.bigContainer}>
        <View style={styles.CartQRCodeImageContainer}>
          <CartQRCodeImage vendorName={vendorName} />
        </View>
        <View style={styles.vendorLinkContainer}>
          <Text onPress={openLink}>{officialVendorName} Website</Text>
        </View>
        <View style={styles.hideButtonsContainer}>
          <HideItemName />
          <HideItemNumber />
          <HideItemBarcode />
        </View>
      </View>
      <FlatList
        ListEmptyComponent={
          <Text style={styles.textStyle}>No Item Has Been Added Yet!</Text>
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
});

export default memo<Props>(CartColumnListItemsScreen);
