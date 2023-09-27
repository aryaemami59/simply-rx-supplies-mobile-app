import { ListItem } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback } from "react";
import type { PressableProps } from "react-native";

import useItemId from "../../../../hooks/useItemId";
import useOfficialVendorName from "../../../../hooks/useOfficialVendorName";
import useVendorId from "../../../../hooks/useVendorId";
import { toggleVendorForOneSearchResultItem } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  checkIfAddedToVendor,
  isVendorChecked,
} from "../../../../redux/selectors";
import { BACKGROUND_TRANSPARENT } from "../../../../shared/styles/sharedStyles";

const SearchResultsCheckBox: FC = () => {
  const vendorId = useVendorId();
  const itemId = useItemId();
  const officialVendorName = useOfficialVendorName(vendorId);

  const dispatch = useAppDispatch();

  const checked = useAppSelector(state =>
    isVendorChecked(state, itemId, vendorId)
  );

  const disabled = useAppSelector(state =>
    checkIfAddedToVendor(state, vendorId, itemId)
  );

  const clickHandler = useCallback<
    NonNullable<PressableProps["onPress"]>
  >(() => {
    dispatch(toggleVendorForOneSearchResultItem({ itemId, vendorId }));
  }, [dispatch, itemId, vendorId]);

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
