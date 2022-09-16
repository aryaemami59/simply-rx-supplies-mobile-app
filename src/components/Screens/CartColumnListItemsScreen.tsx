import { FC, memo } from "react";
import { useAppSelector } from "../../redux/store";
import { selectByVendor, addedItemsLength } from "../../redux/addedSlice";
import { Card, ListItem } from "@rneui/themed";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ItemNameCart from "../ShoppingCartComponents/ItemNameCart";
import ItemNumberCart from "../ShoppingCartComponents/ItemNumberCart";
import BarcodeImageCart from "../ShoppingCartComponents/BarcodeImageCart";
import ExpandCollapseButtonGroup from "../ShoppingCartComponents/ExpandCollapseButtonGroup";
import { StackScreenProps } from "@react-navigation/stack";
import CartQRCodeImage from "../ShoppingCartComponents/CartQRCodeImage";
import { VendorColumnStackParamList } from "../../../CustomTypes/types";
import { AI_CENTER } from "../../shared/sharedStyles";

type Props = StackScreenProps<VendorColumnStackParamList>;

const CartColumnListItemsScreen: FC<Props> = ({ route }): JSX.Element => {
  const { vendorName } = route.params;
  const addedItems = useAppSelector(selectByVendor(vendorName));
  const addedItemsLen = useAppSelector(addedItemsLength(vendorName));

  return (
    <>
      <ScrollView>
        {addedItemsLen ? (
          <View style={AI_CENTER}>
            <Card>
              <CartQRCodeImage vendorName={vendorName} />
              {addedItems.map(e => (
                <ListItem bottomDivider key={e.name}>
                  <View style={styles.viewStyle}>
                    <ExpandCollapseButtonGroup />
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

export default memo(CartColumnListItemsScreen);
