import { FC, memo } from "react";
import { View, Text } from "react-native";
import CopyItemNumber from "./CopyItemNumber";
import { useAppSelector } from "../../redux/store";
import { itemInterface } from "../../../CustomTypes/types";

type Props = {
  itemObj: itemInterface;
};

const ItemNumberCart: FC<Props> = ({ itemObj }): JSX.Element => {
  const itemNumberShown: boolean = useAppSelector<boolean>(
    (state): boolean => state.added.showItemNumber
  );

  return (
    <>
      {itemNumberShown ? (
        <View style={{ alignItems: "center" }}>
          <Text style={{ textAlign: "center" }}>
            Item Number: {itemObj.itemNumber}
          </Text>
          {/* <CopyItemNumber itemObj={itemObj} /> */}
        </View>
      ) : (
        ""
      )}
    </>
  );
};

export default memo<Props>(ItemNumberCart);
