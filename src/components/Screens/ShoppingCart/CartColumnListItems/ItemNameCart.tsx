import { useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useMemo } from "react";
import { Text, View } from "react-native";
import useItemName from "../../../../shared/hooks/useItemName";
import { AI_CENTER, TEXT_CENTER } from "../../../../shared/styles/sharedStyles";

const ItemNameCart: FC = () => {
  const itemName = useItemName();
  const { black } = useTheme().theme.colors;

  const style = useMemo(() => [TEXT_CENTER, { color: black }], [black]);

  return (
    <View style={AI_CENTER}>
      <Text style={style}>Item Name: {itemName}</Text>
    </View>
  );
};

export default memo(ItemNameCart);
