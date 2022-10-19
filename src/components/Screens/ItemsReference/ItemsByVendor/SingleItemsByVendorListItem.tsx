import { MaterialIcons } from "@expo/vector-icons";
import { Chip, ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useCallback, useMemo } from "react";
import { VendorAndItemName } from "../../../../../CustomTypes/types";
import { addItemsByVendor } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  checkIfAddedToAllVendors,
  checkIfItemAddedToOneVendor,
} from "../../../../redux/selectors";
import {
  BACKGROUND_MAIN_COLOR,
  FONT_WEIGHT_700,
} from "../../../../shared/sharedStyles";

const icon = (
  <MaterialIcons
    name="add"
    color="white"
    size={24}
  />
);

type Props = VendorAndItemName;

const SingleItemsByVendorListItem: FC<Props> = ({ itemName, vendorName }) => {
  const { background } = useTheme().theme.colors;
  const dispatch = useAppDispatch();
  const ifAddedToAllVendors = useAppSelector(
    checkIfAddedToAllVendors(itemName)
  );

  const clickHandler = useCallback(() => {
    ifAddedToAllVendors || dispatch(addItemsByVendor({ itemName, vendorName }));
  }, [vendorName, ifAddedToAllVendors, dispatch, itemName]);

  const ifAdded = useAppSelector(
    checkIfItemAddedToOneVendor(vendorName, itemName)
  );

  const containerStyle = useMemo(
    () => ({ backgroundColor: background }),
    [background]
  );

  return (
    <ListItem
      bottomDivider
      containerStyle={containerStyle}>
      <ListItem.Content>
        <ListItem.Title>{itemName}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Content right>
        <Chip
          raised
          size="lg"
          onPress={clickHandler}
          title="Add"
          disabled={ifAdded}
          titleStyle={FONT_WEIGHT_700}
          buttonStyle={BACKGROUND_MAIN_COLOR}
          icon={icon}
        />
      </ListItem.Content>
    </ListItem>
  );
};

export default memo<Props>(SingleItemsByVendorListItem);