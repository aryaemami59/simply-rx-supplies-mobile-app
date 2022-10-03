import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useCallback, useState } from "react";
import { View } from "react-native";
import Collapsible from "react-native-collapsible";
import { ItemObjType, vendorNameType } from "../../../../../CustomTypes/types";
import {
  AI_CENTER,
  JC_SPACE_BETWEEN,
  WIDTH_100,
} from "../../../../shared/sharedStyles";
import BarcodeImageCart from "../BarcodeImage/BarcodeImageCart";
import DeleteButton from "./DeleteButton";
import DetailsButton from "./DetailsButton";
import ItemNameCart from "./ItemNameCart";
import ItemNumberCart from "./ItemNumberCart";
import MinimizeButton from "./MinimizeButton";
import ShareButton from "./ShareButton";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const SingleCartListItems: FC<Props> = ({
  itemObj,
  vendorName,
}): JSX.Element => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(true);

  const clickHandler = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <ListItem.Swipeable
      containerStyle={[{ backgroundColor: theme.colors.background }]}
      bottomDivider
      topDivider
      rightContent={reset => (
        <>
          {open && (
            <>
              <DeleteButton
                reset={reset}
                itemObj={itemObj}
                vendorName={vendorName}
              />
              <ShareButton
                reset={reset}
                itemObj={itemObj}
                vendorName={vendorName}
              />
              <DetailsButton
                reset={reset}
                itemObj={itemObj}
                vendorName={vendorName}
              />
            </>
          )}
          <MinimizeButton
            open={open}
            itemObj={itemObj}
            vendorName={vendorName}
            reset={reset}
            onPress={clickHandler}
          />
        </>
      )}>
      <View style={[AI_CENTER, WIDTH_100, JC_SPACE_BETWEEN]}>
        <ItemNameCart itemObj={itemObj} />
        <Collapsible
          collapsed={!open}
          easing="easeInQuad">
          {open && (
            <>
              <ItemNumberCart itemObj={itemObj} />
              <BarcodeImageCart itemObj={itemObj} />
            </>
          )}
        </Collapsible>
      </View>
    </ListItem.Swipeable>
  );
};

export default memo<Props>(SingleCartListItems);
