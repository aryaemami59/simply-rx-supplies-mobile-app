// @ts-nocheck
import { Chip } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { ToggleItemName } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { BACKGROUND_MAIN_COLOR } from "../../../../shared/sharedStyles";

const HideItemName: FC = () => {
  const dispatch = useAppDispatch();
  const itemNameShown = useAppSelector(state => state.added.showItemName);

  const toggleItemName = useCallback(() => {
    dispatch(ToggleItemName());
  }, [dispatch]);

  const title = itemNameShown ? "Hide" : "Show";

  return (
    <Chip
      size="sm"
      radius="xl"
      title={`${title} Item Names`}
      onPress={toggleItemName}
      buttonStyle={BACKGROUND_MAIN_COLOR}
    />
  );
};

export default memo(HideItemName);
