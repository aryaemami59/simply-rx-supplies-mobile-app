import { useTheme } from "@rneui/themed";
import { FC, memo } from "react";
import { Text, View } from "react-native";
import { ItemName } from "../../../../../CustomTypes/types";
import { selectItemNumber } from "../../../../redux/addedSlice";
import { useAppSelector } from "../../../../redux/hooks";
import { AI_CENTER, TEXT_CENTER } from "../../../../shared/sharedStyles";

type Props = {
  itemName: ItemName;
};

const ItemNumberCart: FC<Props> = ({ itemName }) => {
  const itemNumber = useAppSelector(selectItemNumber(itemName));
  // const itemNumberShown = useAppSelector(state => state.added.showItemNumber);
  const { theme } = useTheme();

  return (
    <>
      {/* {itemNumberShown && ( */}
      <View style={AI_CENTER}>
        <Text style={[TEXT_CENTER, { color: theme.colors.black }]}>
          Item Number: {itemNumber}
        </Text>
      </View>
      {/* )} */}
    </>
  );
};

export default memo<Props>(ItemNumberCart);
