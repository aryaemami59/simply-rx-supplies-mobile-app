import { FC, memo, useCallback, useEffect } from "react";
import { useAppSelector } from "../../../../redux/store";
import { selectByVendor, addedItemsLength } from "../../../../redux/addedSlice";
import { Card, ListItem } from "@rneui/themed";
import { View, Text, ScrollView, StyleSheet, Linking } from "react-native";
import ItemNameCart from "../../../ShoppingCartComponents/ItemNameCart";
import ItemNumberCart from "../../../ShoppingCartComponents/ItemNumberCart";
import BarcodeImageCart from "../../../ShoppingCartComponents/BarcodeImageCart";
import ExpandCollapseButtonGroup from "../../../ShoppingCartComponents/ExpandCollapseButtonGroup";
import { StackScreenProps } from "@react-navigation/stack";
import CartQRCodeImage from "../../../ShoppingCartComponents/CartQRCodeImage";
import { ShoppingCartStackParamList } from "../../../../../CustomTypes/types";
import { AI_CENTER } from "../../../../shared/sharedStyles";
import { selectVendorsLinks } from "../../../../redux/addedSlice";
import HideItemName from "../../../ShoppingCartComponents/HideItemName";
import HideItemNumber from "../../../ShoppingCartComponents/HideItemNumber";
import HideItemBarcode from "../../../ShoppingCartComponents/HideItemBarcode";
import { selectVendorOfficialName } from "../../../../redux/addedSlice";

type Props = StackScreenProps<ShoppingCartStackParamList, "VendorItems">;

const CartColumnListItemsScreen: FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const { vendorName } = route.params;
  const addedItems = useAppSelector(selectByVendor(vendorName));
  const addedItemsLen = useAppSelector(addedItemsLength(vendorName));
  const vendorLink = useAppSelector(selectVendorsLinks(vendorName));

  const openLink = useCallback(() => {
    Linking.openURL(vendorLink);
  }, []);

  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: officialVendorName,
    });
  }, []);

  return (
    <>
      <ScrollView>
        {addedItemsLen ? (
          <View style={AI_CENTER}>
            <Card>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <CartQRCodeImage vendorName={vendorName} />
                <Text onPress={openLink}>{officialVendorName} Website</Text>
                <HideItemName />
                <HideItemNumber />
                <HideItemBarcode />
              </View>
              {addedItems.map(e => (
                <ListItem bottomDivider key={e.name}>
                  <View style={styles.viewStyle}>
                    {/* <ExpandCollapseButtonGroup /> */}
                    <ItemNameCart itemObj={e} />
                    <ItemNumberCart itemObj={e} />
                    <BarcodeImageCart itemObj={e} />
                  </View>
                </ListItem>
              ))}
            </Card>
          </View>
        ) : (
          <Text style={styles.textStyle}>No Item Has Been Added Yet!</Text>
        )}
      </ScrollView>
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
    width: "100%",
  },
});

export default memo<Props>(CartColumnListItemsScreen);
