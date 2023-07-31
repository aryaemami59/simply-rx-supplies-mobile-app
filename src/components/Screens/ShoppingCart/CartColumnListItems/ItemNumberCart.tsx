import { useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useMemo } from "react";
import type { StyleProp, TextStyle } from "react-native";
import { Text, View } from "react-native";

import useItemName from "../../../../hooks/useItemName";
import { useAppSelector } from "../../../../redux/hooks";
import { selectItemNumber } from "../../../../redux/selectors";
import { AI_CENTER, TEXT_CENTER } from "../../../../shared/styles/sharedStyles";

const ItemNumberCart: FC = () => {
  const itemName = useItemName();
  const itemNumber = useAppSelector(selectItemNumber(itemName));
  const { black } = useTheme().theme.colors;

  const style: StyleProp<TextStyle> = useMemo(
    () => [TEXT_CENTER, { color: black, marginBottom: 20, marginTop: 10 }],
    [black]
  );

  return (
    <View style={AI_CENTER}>
      <Text style={style}>Item Number: {itemNumber}</Text>
    </View>
  );
};

export default memo(ItemNumberCart);
