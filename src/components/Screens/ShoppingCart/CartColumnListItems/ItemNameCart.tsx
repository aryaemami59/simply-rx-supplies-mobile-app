import { useTheme } from "@rneui/themed";
import { FC, memo } from "react";
import { Text, View } from "react-native";
import { ItemObjType } from "../../../../../CustomTypes/types";
import { useAppSelector } from "../../../../redux/hooks";
import { AI_CENTER, TEXT_CENTER } from "../../../../shared/sharedStyles";

type Props = {
  itemObj: ItemObjType;
};

const ItemNameCart: FC<Props> = ({ itemObj }): JSX.Element => {
  const itemNameShown = useAppSelector(state => state.added.showItemName);
  const { theme } = useTheme();

  return (
    <>
      {itemNameShown && (
        <View style={AI_CENTER}>
          <Text style={[TEXT_CENTER, { color: theme.colors.black }]}>
            Item Name: {itemObj.name}
          </Text>
        </View>
      )}
    </>
  );
};

export default memo<Props>(ItemNameCart);
