import { FC, memo, useCallback } from "react";
import { Chip } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { ToggleItemNumber } from "../../../../redux/addedSlice";
import { MAIN_COLOR } from "../../../../shared/sharedStyles";

const HideItemNumber: FC = (): JSX.Element => {
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
      buttonStyle={styles.buttonStyle}
      onPress={toggleItemNumber}
    />
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: MAIN_COLOR,
  },
});

export default memo(HideItemNumber);
