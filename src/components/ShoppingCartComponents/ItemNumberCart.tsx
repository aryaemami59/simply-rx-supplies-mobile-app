import { FC, memo } from "react";
import { View, Text } from "react-native";
import { itemInterface } from "../../redux/addedSlice";
import CopyItemNumber from "./CopyItemNumber";

interface Props {
  itemObj: itemInterface;
}

const ItemNumberCart: FC<Props> = ({ itemObj }): JSX.Element => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ textAlign: "center" }}>
        Item Number: {itemObj.itemNumber}
      </Text>
      <CopyItemNumber itemObj={itemObj} />
    </View>
  );
};

export default memo(ItemNumberCart);
