import { FC, memo } from "react";
import { useAppSelector } from "../../redux/store";
import { selectByVendor, addedItemsLength } from "../../redux/addedSlice";
import { ListItem } from "@rneui/themed";
import { View, Text, ScrollView } from "react-native";
import ItemNameCart from "../ShoppingCartComponents/ItemNameCart";
import ItemNumberCart from "../ShoppingCartComponents/ItemNumberCart";
import BarcodeImageCart from "../ShoppingCartComponents/BarcodeImageCart";
import ExpandCollapseButtonGroup from "../ShoppingCartComponents/ExpandCollapseButtonGroup";
import { StackScreenProps } from "@react-navigation/stack";
import CartQRCodeImage from "../ShoppingCartComponents/CartQRCodeImage";
import { VendorColumnStackParamList } from "../../../CustomTypes/types";

type Props = StackScreenProps<VendorColumnStackParamList>;

const CartColumnListItemsScreen: FC<Props> = ({ route }): JSX.Element => {
  const { vendorName } = route.params;
  const addedItems = useAppSelector(selectByVendor(vendorName));
  const addedItemsLen = useAppSelector(addedItemsLength(vendorName));

  return (
    <>
      <ScrollView>
        {addedItemsLen ? (
          <View style={{ alignItems: "center" }}>
            <CartQRCodeImage vendorName={vendorName} />
            {addedItems.map(e => (
              <ListItem bottomDivider key={e.name}>
                <View
                  style={{
                    alignItems: "center",
                    width: "100%",
                  }}>
                  <ExpandCollapseButtonGroup />
                  <ItemNameCart itemObj={e} />
                  <ItemNumberCart itemObj={e} />
                  <BarcodeImageCart itemObj={e} />
                </View>
              </ListItem>
            ))}
          </View>
        ) : (
          <Text style={{ textAlign: "center", paddingVertical: 20 }}>
            No Item Has Been Added Yet!
          </Text>
        )}
      </ScrollView>
    </>
  );
};

export default memo(CartColumnListItemsScreen);
