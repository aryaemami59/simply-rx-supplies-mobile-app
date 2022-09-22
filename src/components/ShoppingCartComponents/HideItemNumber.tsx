import { FC, memo, useCallback } from "react";
import { Chip } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { mainColor } from "../../shared/sharedStyles";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ToggleItemNumber } from "../../redux/addedSlice";

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
    backgroundColor: mainColor,
  },
});

export default memo(HideItemNumber);
