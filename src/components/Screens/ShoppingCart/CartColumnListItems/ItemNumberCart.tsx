import { useTheme } from "@rneui/themed";
import { FC, memo } from "react";
import { Text, View } from "react-native";
import { ItemObjType } from "../../../../../CustomTypes/types";
import { useAppSelector } from "../../../../redux/hooks";
import { AI_CENTER, TEXT_CENTER } from "../../../../shared/sharedStyles";

type Props = {
  itemObj: ItemObjType;
};

const ItemNumberCart: FC<Props> = ({ itemObj }): JSX.Element => {
  const itemNumberShown = useAppSelector(state => state.added.showItemNumber);
  const { theme } = useTheme();

  return (
    <>
      {itemNumberShown && (
        <View style={AI_CENTER}>
          <Text style={[TEXT_CENTER, { color: theme.colors.black }]}>
            Item Number: {itemObj.itemNumber}
          </Text>
        </View>
      )}
    </>
  );
};

export default memo<Props>(ItemNumberCart);
