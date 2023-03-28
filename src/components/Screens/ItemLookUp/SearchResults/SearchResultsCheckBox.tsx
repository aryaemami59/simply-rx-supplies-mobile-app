import { ListItem } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback } from "react";
import type { PressableProps } from "react-native";
import useItemName from "../../../../hooks/useItemName";
import useOfficialVendorName from "../../../../hooks/useOfficialVendorName";
import useVendorName from "../../../../hooks/useVendorName";
import { setVendors } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  checkVendorsAdded,
  checkVendorsToAdd,
} from "../../../../redux/selectors";
import { BACKGROUND_TRANSPARENT } from "../../../../shared/styles/sharedStyles";

const SearchResultsCheckBox: FC = () => {
  const vendorName = useVendorName();
  const itemName = useItemName();
  const officialVendorName = useOfficialVendorName(vendorName);

  const dispatch = useAppDispatch();

  const checked = useAppSelector(checkVendorsToAdd(vendorName, itemName));

  const disabled = useAppSelector(checkVendorsAdded(vendorName, itemName));

  const clickHandler: NonNullable<PressableProps["onPress"]> =
    useCallback(() => {
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

export default memo(SearchResultsCheckBox);
