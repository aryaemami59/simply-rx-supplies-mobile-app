import { useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useMemo } from "react";
import { Text, View } from "react-native";
import { useAppSelector } from "../../../../redux/hooks";
import { selectItemNumber } from "../../../../redux/selectors";
import useItemName from "../../../../shared/hooks/useItemName";
import { AI_CENTER, TEXT_CENTER } from "../../../../shared/styles/sharedStyles";

const ItemNumberCart: FC = () => {
  const itemName = useItemName();
  const itemNumber = useAppSelector(selectItemNumber(itemName));
  const { black } = useTheme().theme.colors;

  const style = useMemo(() => [TEXT_CENTER, { color: black }], [black]);

  return (
    <View style={AI_CENTER}>
      <Text style={style}>Item Number: {itemNumber}</Text>
    </View>
  );
};

export default memo(ItemNumberCart);
