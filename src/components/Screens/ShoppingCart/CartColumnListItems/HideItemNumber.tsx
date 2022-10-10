// @ts-nocheck
import { Chip } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { ToggleItemNumber } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { BACKGROUND_MAIN_COLOR } from "../../../../shared/sharedStyles";

const HideItemNumber: FC = () => {
  const dispatch = useAppDispatch();
  const itemNumberShown = useAppSelector(state => state.added.showItemNumber);

  const toggleItemNumber = useCallback(() => {
    dispatch(ToggleItemNumber());
  }, [dispatch]);

  const title = itemNumberShown ? "Hide" : "Show";
  return (
    <Chip
      size="sm"
      radius="xl"
      title={`${title} Item Numbers`}
      buttonStyle={BACKGROUND_MAIN_COLOR}
      onPress={toggleItemNumber}
    />
  );
};

export default memo(HideItemNumber);
