import { useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Text, View } from "react-native";

import useItemId from "../../../../hooks/useItemId";
import { useAppSelector } from "../../../../redux/hooks";
import { selectItemName } from "../../../../redux/selectors";
import { AI_CENTER, TEXT_CENTER } from "../../../../shared/styles/sharedStyles";

const ItemNameCart: FC = () => {
  const itemId = useItemId();
  const itemName = useAppSelector(state => selectItemName(state, itemId));
  const { black } = useTheme().theme.colors;

  const style = useMemo<StyleProp<ViewStyle>>(
    () => [TEXT_CENTER, { color: black }],
    [black]
  );

  return (
    <View style={AI_CENTER}>
      <Text style={style}>Item Name: {itemName}</Text>
    </View>
  );
};

export default memo(ItemNameCart);
