import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import { Text, View } from "react-native";
import { ItemName } from "../../../../../CustomTypes/types";
import { AI_CENTER, TEXT_CENTER } from "../../../../shared/sharedStyles";

type Props = {
  itemName: ItemName;
};

const ItemNameCart: FC<Props> = ({ itemName }) => {
  const { black } = useTheme().theme.colors;

  const style = useMemo(() => [TEXT_CENTER, { color: black }], [black]);

  return (
    <View style={AI_CENTER}>
      <Text style={style}>Item Name: {itemName}</Text>
    </View>
  );
};

export default memo<Props>(ItemNameCart);
