import { useTheme } from "@rneui/themed";
import { FC, memo } from "react";
import { Text, View } from "react-native";
import { ItemName } from "../../../../../CustomTypes/types";
import { AI_CENTER, TEXT_CENTER } from "../../../../shared/sharedStyles";

type Props = {
  itemName: ItemName;
};

const ItemNameCart: FC<Props> = ({ itemName }) => {
  // const itemNameShown = useAppSelector(state => state.added.showItemName);
  const { theme } = useTheme();

  return (
    <>
      {/* {itemNameShown && ( */}
      <View style={AI_CENTER}>
        <Text style={[TEXT_CENTER, { color: theme.colors.black }]}>
          Item Name: {itemName}
        </Text>
      </View>
      {/* )} */}
    </>
  );
};

export default memo<Props>(ItemNameCart);
