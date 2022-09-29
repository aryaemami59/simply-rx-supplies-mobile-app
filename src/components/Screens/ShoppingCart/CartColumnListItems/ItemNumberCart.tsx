import { FC, memo } from "react";
import { View, Text } from "react-native";
import { ItemObjType } from "../../../../../CustomTypes/types";
import { useAppSelector } from "../../../../redux/hooks";
import { AI_CENTER, TEXT_CENTER } from "../../../../shared/sharedStyles";
import { useTheme } from "@rneui/themed";

type Props = {
  itemObj: ItemObjType;
};

const ItemNumberCart: FC<Props> = ({ itemObj }): JSX.Element => {
  const itemNumberShown = useAppSelector(
    (state): boolean => state.added.showItemNumber
  );
  const { theme } = useTheme();

  return (
    <>
      {itemNumberShown ? (
        <View style={AI_CENTER}>
          <Text style={[TEXT_CENTER, { color: theme.colors.black }]}>
            Item Number: {itemObj.itemNumber}
          </Text>
        </View>
      ) : (
        ""
      )}
    </>
  );
};

export default memo<Props>(ItemNumberCart);
