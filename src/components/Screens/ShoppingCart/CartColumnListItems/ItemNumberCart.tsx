import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import { Text, View } from "react-native";
import { ItemName } from "../../../../../CustomTypes/types";
import { useAppSelector } from "../../../../redux/hooks";
import { selectItemNumber } from "../../../../redux/selectors";
import { AI_CENTER, TEXT_CENTER } from "../../../../shared/sharedStyles";

type Props = {
  itemName: ItemName;
};

const ItemNumberCart: FC<Props> = ({ itemName }) => {
  const itemNumber = useAppSelector(selectItemNumber(itemName));
  const { black } = useTheme().theme.colors;

  const style = useMemo(() => [TEXT_CENTER, { color: black }], [black]);

  return (
    <View style={AI_CENTER}>
      <Text style={style}>Item Number: {itemNumber}</Text>
    </View>
  );
};

export default memo<Props>(ItemNumberCart);
