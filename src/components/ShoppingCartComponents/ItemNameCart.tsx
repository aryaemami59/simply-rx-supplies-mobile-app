import { FC, memo } from "react";
import { View, Text } from "react-native";
import CopyItemName from "./CopyItemName";
import { useAppSelector } from "../../redux/store";
import { ItemObjType } from "../../../CustomTypes/types";

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
