import { ListItem, Chip } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import {
  checkIfAddedToAllVendors,
  addItemsByVendor,
} from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { ItemObjType, vendorNameType } from "../../../../../CustomTypes/types";
import { MaterialIcons } from "@expo/vector-icons";
import {
  FONT_WEIGHT_700,
  BACKGROUND_MAIN_COLOR,
} from "../../../../shared/sharedStyles";
import { checkIfItemAddedToOneVendor } from "../../../../redux/addedSlice";

const icon = <MaterialIcons name="add" color="white" size={24} />;

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const SingleItemsByVendorListItem: FC<Props> = ({
  itemObj,
  vendorName,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const ifAddedToAllVendors = useAppSelector(checkIfAddedToAllVendors(itemObj));

  const clickHandler = useCallback(() => {
    ifAddedToAllVendors || dispatch(addItemsByVendor({ itemObj, vendorName }));
  }, [vendorName, ifAddedToAllVendors, dispatch, itemObj]);

  const ifAdded = useAppSelector(
    checkIfItemAddedToOneVendor(vendorName, itemObj)
  );

  return (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{itemObj.name}</ListItem.Title>
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
