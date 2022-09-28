import { FC, memo } from "react";
import { View, Text } from "react-native";
import { ItemObjType } from "../../../../../CustomTypes/types";
import { useAppSelector } from "../../../../redux/hooks";
import { AI_CENTER, TEXT_CENTER } from "../../../../shared/sharedStyles";

type Props = {
  itemObj: ItemObjType;
};

const ItemNameCart: FC<Props> = ({ itemObj }): JSX.Element => {
  const itemNameShown = useAppSelector(
    (state): boolean => state.added.showItemName
  );

  return (
    <>
      {itemNameShown ? (
        <View style={AI_CENTER}>
          <Text style={TEXT_CENTER}>Item Name: {itemObj.name}</Text>
        </View>
      ) : (
        ""
      )}
    </>
  );
};

export default memo<Props>(ItemNameCart);
