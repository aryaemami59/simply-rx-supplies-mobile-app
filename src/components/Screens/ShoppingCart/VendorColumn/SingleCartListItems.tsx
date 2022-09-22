import { ListItem } from "@rneui/themed";
import { FC, memo } from "react";
import { View, StyleSheet } from "react-native";
import BarcodeImageCart from "../../../ShoppingCartComponents/BarcodeImageCart";
import ItemNameCart from "../../../ShoppingCartComponents/ItemNameCart";
import ItemNumberCart from "../../../ShoppingCartComponents/ItemNumberCart";
import { ItemObjType } from "../../../../../CustomTypes/types";

type Props = {
  item: ItemObjType;
};

const SingleCartListItems: FC<Props> = ({ item: itemObj }): JSX.Element => {
  return (
    <>
      <ListItem bottomDivider topDivider key={itemObj.name}>
        <View style={styles.viewStyle}>
          <ItemNameCart itemObj={itemObj} />
          <ItemNumberCart itemObj={itemObj} />
          <BarcodeImageCart itemObj={itemObj} />
        </View>
      </ListItem>
    </>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default memo<Props>(SingleCartListItems);
