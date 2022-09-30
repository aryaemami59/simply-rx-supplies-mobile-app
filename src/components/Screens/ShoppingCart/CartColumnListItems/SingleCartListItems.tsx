import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useState, useCallback } from "react";
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
import MinimizeButton from "./MinimizeButton";
import Collapsible from "react-native-collapsible";

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
    <>
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
          <Collapsible collapsed={!open} easing="easeInQuad">
            {open && (
              <>
                <ItemNumberCart itemObj={itemObj} />
                <BarcodeImageCart itemObj={itemObj} />
              </>
            )}
          </Collapsible>
        </View>
      </ListItem.Swipeable>
    </>
  );
};

export default memo<Props>(SingleCartListItems);
