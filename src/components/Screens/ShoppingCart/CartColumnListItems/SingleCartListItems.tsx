import type { ListItemSwipeableProps } from "@rneui/themed";
import { ListItem, useTheme } from "@rneui/themed";
import type { FC, ReactNode } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { View } from "react-native";
// import Collapsible from "react-native-collapsible";
import Collapsible from "react-native-collapsible";
import {
  AI_CENTER,
  JC_SPACE_BETWEEN,
  WIDTH_100,
} from "../../../../shared/styles/sharedStyles";
import BarcodeImageCart from "../BarcodeImage/BarcodeImageCart";
import DeleteButton from "./DeleteButton";
import DetailsButton from "./DetailsButton";
import ItemNameCart from "./ItemNameCart";
import ItemNumberCart from "./ItemNumberCart";
import MinimizeButton from "./MinimizeButton";
import ShareButton from "./ShareButton";

const style: StyleProp<ViewStyle> = [AI_CENTER, WIDTH_100, JC_SPACE_BETWEEN];

const SingleCartListItems: FC = () => {
  const [open, setOpen] = useState(true);
  const { background } = useTheme().theme.colors;

  const clickHandler: () => void = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const rightContent: Exclude<
    ListItemSwipeableProps["rightContent"],
    ReactNode
  > = useCallback(
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

  const containerStyle: StyleProp<ViewStyle> = useMemo(
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
