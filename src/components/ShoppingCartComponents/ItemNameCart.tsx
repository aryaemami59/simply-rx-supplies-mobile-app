import { FC, memo } from "react";
import { View, Text } from "react-native";
import { itemInterface } from "../../redux/addedSlice";
import CopyItemName from "./CopyItemName";
import { useAppSelector } from "../../redux/store";

interface Props {
  itemObj: itemInterface;
}

const ItemNameCart: FC<Props> = ({ itemObj }): JSX.Element => {
  const itemNameShown: boolean = useAppSelector<boolean>(
    (state): boolean => state.added.showItemName
  );

  return (
    <>
      {itemNameShown ? (
        <View style={{ alignItems: "center" }}>
          <Text style={{ textAlign: "center" }}>Item Name: {itemObj.name}</Text>
          {/* <CopyItemName itemObj={itemObj} /> */}
        </View>
      ) : (
        ""
      )}
    </>
  );
};

export default memo(ItemNameCart);
