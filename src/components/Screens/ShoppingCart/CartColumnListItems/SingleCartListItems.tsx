import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import Collapsible from "react-native-collapsible";
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

const style = [AI_CENTER, WIDTH_100, JC_SPACE_BETWEEN];

const SingleCartListItems: FC = () => {
  const [open, setOpen] = useState(true);
  const { background } = useTheme().theme.colors;

  const clickHandler = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const rightContent = useCallback(
    (reset: () => void) => (
      <>
        {open && (
          <>
            <DeleteButton reset={reset} />
            <ShareButton reset={reset} />
            <DetailsButton reset={reset} />
          </>
        )}
        <MinimizeButton
          open={open}
          reset={reset}
          onPress={clickHandler}
        />
      </>
    ),
    [clickHandler, open]
  );

  const containerStyle = useMemo(
    () => ({ backgroundColor: background }),
    [background]
  );

  return (
    <ListItem.Swipeable
      containerStyle={containerStyle}
      bottomDivider
      topDivider
      rightContent={rightContent}>
      <View style={style}>
        <ItemNameCart />
        <Collapsible
          collapsed={!open}
          easing="easeInQuad">
          {open && (
            <>
              <ItemNumberCart />
              <BarcodeImageCart />
            </>
          )}
        </Collapsible>
      </View>
    </ListItem.Swipeable>
  );
};

export default memo(SingleCartListItems);
