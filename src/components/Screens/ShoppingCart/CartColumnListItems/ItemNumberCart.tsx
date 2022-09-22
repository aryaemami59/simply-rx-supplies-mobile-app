import { FC, memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ItemObjType } from "../../../../../CustomTypes/types";
import { useAppSelector } from "../../../../redux/store";
import { AI_CENTER } from "../../../../shared/sharedStyles";

type Props = {
  itemObj: ItemObjType;
};

const ItemNumberCart: FC<Props> = ({ itemObj }): JSX.Element => {
  const itemNumberShown: boolean = useAppSelector<boolean>(
    (state): boolean => state.added.showItemNumber
  );

  return (
    <>
      {itemNumberShown ? (
        <View style={AI_CENTER}>
          <Text style={styles.textStyle}>
            Item Number: {itemObj.itemNumber}
          </Text>
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

export default memo<Props>(ItemNumberCart);
