import { FC, memo, useCallback, useEffect } from "react";
import { useAppSelector } from "../../../../redux/store";
import { selectByVendor, addedItemsLength } from "../../../../redux/addedSlice";
import { ButtonGroup, Card, ListItem } from "@rneui/themed";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Linking,
  ListRenderItem,
  ListRenderItemInfo,
  FlatList,
} from "react-native";
import ItemNameCart from "../../../ShoppingCartComponents/ItemNameCart";
import ItemNumberCart from "../../../ShoppingCartComponents/ItemNumberCart";
import BarcodeImageCart from "../../../ShoppingCartComponents/BarcodeImageCart";
import ExpandCollapseButtonGroup from "../../../ShoppingCartComponents/ExpandCollapseButtonGroup";
import { StackScreenProps } from "@react-navigation/stack";
import CartQRCodeImage from "../../../ShoppingCartComponents/CartQRCodeImage";
import {
  ShoppingCartStackParamList,
  ItemObjType,
} from "../../../../../CustomTypes/types";
import { AI_CENTER, width100 } from "../../../../shared/sharedStyles";
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
  // const addedItemsLen = useAppSelector(addedItemsLength(vendorName));
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
      <View style={{ paddingVertical: 10 }}>
        <View style={{ paddingVertical: 10, alignItems: "center" }}>
          <CartQRCodeImage vendorName={vendorName} />
        </View>
        <View style={{ paddingVertical: 10, alignItems: "center" }}>
          <Text onPress={openLink}>{officialVendorName} Website</Text>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            height: 100,
          }}>
          {/* <ButtonGroup
            vertical
            buttons={[
              <HideItemName />,
              <HideItemNumber />,
              <HideItemBarcode />,
            ]}
          /> */}
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
      {/* <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        {addedItemsLen ? (
          <View
            style={{
              ...AI_CENTER,
              justifyContent: "space-between",
              flex: 1,
            }}>
            <Card>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <View
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <View style={{ paddingVertical: 10 }}>
                    <CartQRCodeImage vendorName={vendorName} />
                  </View>
                  <View style={{ paddingVertical: 10 }}>
                    <Text onPress={openLink}>{officialVendorName} Website</Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "space-between",
                    height: 100,
                  }}>
                  <HideItemName />
                  <HideItemNumber />
                  <HideItemBarcode />
                </View>
              </View> */}
      {/* {addedItems.map(e => (
                <ListItem bottomDivider topDivider key={e.name}>
                  <View style={styles.viewStyle}>
                    <ItemNameCart itemObj={e} />
                    <ItemNumberCart itemObj={e} />
                    <BarcodeImageCart itemObj={e} />
                  </View>
                </ListItem>
              ))} */}
      {/* </Card>
          </View>
        ) : (
          <Text style={styles.textStyle}>No Item Has Been Added Yet!</Text>
        )}
      </ScrollView> */}
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
});

export default memo<Props>(CartColumnListItemsScreen);
