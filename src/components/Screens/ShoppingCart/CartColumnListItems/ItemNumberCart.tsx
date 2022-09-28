import { FC, memo } from "react";
import { View, Text } from "react-native";
import { ItemObjType } from "../../../../../CustomTypes/types";
import { useAppSelector } from "../../../../redux/hooks";
import { AI_CENTER, textCenter } from "../../../../shared/sharedStyles";

type Props = {
  itemObj: ItemObjType;
};

const ItemNumberCart: FC<Props> = ({ itemObj }): JSX.Element => {
  const itemNumberShown = useAppSelector(
    (state): boolean => state.added.showItemNumber
  );

  return (
    <>
      {itemNumberShown ? (
        <View style={AI_CENTER}>
          <Text style={textCenter}>Item Number: {itemObj.itemNumber}</Text>
        </View>
      ) : (
        ""
      )}
    </>
  );
};

export default memo<Props>(ItemNumberCart);
