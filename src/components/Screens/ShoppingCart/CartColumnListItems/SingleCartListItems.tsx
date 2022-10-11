import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useCallback, useState } from "react";
import { View } from "react-native";
import Collapsible from "react-native-collapsible";
import { VendorAndItemName } from "../../../../../CustomTypes/types";
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

type Props = VendorAndItemName;

const SingleCartListItems: FC<Props> = ({ itemName, vendorName }) => {
  const [open, setOpen] = useState(true);
  const { theme } = useTheme();
  const { background } = theme.colors;

  const clickHandler = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const rightContent = useCallback(
    (reset: () => void) => (
      <>
        {open && (
          <>
            <DeleteButton
              reset={reset}
              itemName={itemName}
              vendorName={vendorName}
            />
            <ShareButton
              reset={reset}
              itemName={itemName}
              vendorName={vendorName}
            />
            <DetailsButton
              reset={reset}
              itemName={itemName}
              vendorName={vendorName}
            />
          </>
        )}
        <MinimizeButton
          open={open}
          itemName={itemName}
          vendorName={vendorName}
          reset={reset}
          onPress={clickHandler}
        />
      </>
    ),
    [clickHandler, itemName, open, vendorName]
  );

  return (
    <ListItem.Swipeable
      containerStyle={[{ backgroundColor: background }]}
      bottomDivider
      topDivider
      rightContent={rightContent}>
      <View style={[AI_CENTER, WIDTH_100, JC_SPACE_BETWEEN]}>
        <ItemNameCart itemName={itemName} />
        <Collapsible
          collapsed={!open}
          easing="easeInQuad">
          {open && (
            <>
              <ItemNumberCart itemName={itemName} />
              <BarcodeImageCart itemName={itemName} />
            </>
          )}
        </Collapsible>
      </View>
    </ListItem.Swipeable>
  );
};

export default memo<Props>(SingleCartListItems);
