import { FC, memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ItemObjType } from "../../../../../CustomTypes/types";
import { useAppSelector } from "../../../../redux/hooks";
import { AI_CENTER } from "../../../../shared/sharedStyles";

type Props = {
  itemObj: ItemObjType;
};

const ItemNameCart: FC<Props> = ({ itemObj }): JSX.Element => {
  const itemNameShown: boolean = useAppSelector<boolean>(
    (state): boolean => state.added.showItemName
  );

  return (
    <>
      {itemNameShown ? (
        <View style={AI_CENTER}>
          <Text style={styles.textStyle}>Item Name: {itemObj.name}</Text>
        </View>
      ) : (
        ""
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    textAlign: "center",
  },
});

export default memo(ItemNameCart);
