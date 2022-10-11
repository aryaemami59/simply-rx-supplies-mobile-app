import { ListItem } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import {
  OfficialVendorNameType,
  VendorAndItemName,
} from "../../../../../CustomTypes/types";
import { setVendors } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  checkVendorsAdded,
  checkVendorsToAdd,
  selectVendorOfficialName,
} from "../../../../redux/selectors";
import { BACKGROUND_TRANSPARENT } from "../../../../shared/sharedStyles";

type Props = VendorAndItemName;

const SearchResultsCheckBox: FC<Props> = ({ vendorName, itemName }) => {
  const officialVendorName = useAppSelector<OfficialVendorNameType>(
    selectVendorOfficialName(vendorName)
  );

  const dispatch = useAppDispatch();

  const checked = useAppSelector(checkVendorsToAdd(vendorName, itemName));

  const disabled = useAppSelector(checkVendorsAdded(vendorName, itemName));

  const clickHandler = useCallback(() => {
    dispatch(setVendors({ itemName, vendorName }));
  }, [dispatch, itemName, vendorName]);

  return (
    <ListItem.CheckBox
      checked={checked}
      disabled={disabled}
      onPress={clickHandler}
      title={officialVendorName}
      style={BACKGROUND_TRANSPARENT}
      textStyle={BACKGROUND_TRANSPARENT}
    />
  );
};

export default memo<Props>(SearchResultsCheckBox);
