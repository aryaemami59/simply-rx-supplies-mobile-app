import { Chip } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback } from "react";

import useItemId from "../../../../hooks/useItemId";
import AddIcon from "../../../../Icons/AddIcon";
import { addItemToCarts } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { checkIfAddedToAllVendors } from "../../../../redux/selectors";
import {
  BACKGROUND_MAIN_COLOR,
  FONT_WEIGHT_700,
} from "../../../../shared/styles/sharedStyles";
import type { OnPress } from "../../../../types/tsHelpers";

const SingleCategoryListItemAddButton: FC = () => {
  const itemId = useItemId();
  const ifAddedToAllVendors = useAppSelector(state =>
    checkIfAddedToAllVendors(state, itemId)
  );

  const dispatch = useAppDispatch();

  const clickHandler = useCallback<OnPress>(() => {
    if (!ifAddedToAllVendors) {
      dispatch(addItemToCarts({ itemId }));
    }
  }, [ifAddedToAllVendors, dispatch, itemId]);

  return (
    <Chip
      raised
      size="lg"
      onPress={clickHandler}
      title="Add"
      disabled={ifAddedToAllVendors}
      titleStyle={FONT_WEIGHT_700}
      buttonStyle={BACKGROUND_MAIN_COLOR}
      icon={AddIcon}
    />
  );
};

export default memo(SingleCategoryListItemAddButton);
