import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo } from "react";
import { View } from "react-native";
import BarcodeImageCart from "../BarcodeImage/BarcodeImageCart";
import { ItemObjType, vendorNameType } from "../../../../../CustomTypes/types";
import ItemNameCart from "./ItemNameCart";
import ItemNumberCart from "./ItemNumberCart";
import {
  AI_CENTER,
  WIDTH_100,
  JC_SPACE_BETWEEN,
} from "../../../../shared/sharedStyles";
import DeleteButton from "./DeleteButton";
import ShareButton from "./ShareButton";
import DetailsButton from "./DetailsButton";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const SingleCartListItems: FC<Props> = ({
  itemObj,
  vendorName,
}): JSX.Element => {
  const { theme } = useTheme();

  return (
    <>
      <ListItem.Swipeable
        containerStyle={[{ backgroundColor: theme.colors.background }]}
        bottomDivider
        topDivider
        rightContent={
          <>
            <DeleteButton itemObj={itemObj} vendorName={vendorName} />
            <ShareButton itemObj={itemObj} vendorName={vendorName} />
            <DetailsButton itemObj={itemObj} vendorName={vendorName} />
          </>
        }>
        <View style={[AI_CENTER, WIDTH_100, JC_SPACE_BETWEEN]}>
          <ItemNameCart itemObj={itemObj} />
          <ItemNumberCart itemObj={itemObj} />
          <BarcodeImageCart itemObj={itemObj} />
        </View>
      </ListItem.Swipeable>
    </>
  );
};

export default memo<Props>(SingleCartListItems);
