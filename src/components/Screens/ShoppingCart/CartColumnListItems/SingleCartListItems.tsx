import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo } from "react";
import { View, StyleSheet } from "react-native";
import BarcodeImageCart from "../BarcodeImage/BarcodeImageCart";
import { ItemObjType } from "../../../../../CustomTypes/types";
import ItemNameCart from "./ItemNameCart";
import ItemNumberCart from "./ItemNumberCart";
import { AI_CENTER, WIDTH_100 } from "../../../../shared/sharedStyles";

type Props = {
  itemObj: ItemObjType;
};

const SingleCartListItems: FC<Props> = ({ itemObj }): JSX.Element => {
  const { theme } = useTheme();

  return (
    <>
      <ListItem
        containerStyle={[{ backgroundColor: theme.colors.background }]}
        bottomDivider
        topDivider
        key={itemObj.name}>
        <View style={[AI_CENTER, WIDTH_100, styles.viewStyle]}>
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
    justifyContent: "space-between",
  },
});

export default memo<Props>(SingleCartListItems);
