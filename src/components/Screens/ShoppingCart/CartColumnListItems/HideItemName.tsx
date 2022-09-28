import { FC, memo, useCallback } from "react";
import { Chip } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { ToggleItemName } from "../../../../redux/addedSlice";
import { mainColor } from "../../../../shared/sharedStyles";

const HideItemName: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const itemNameShown = useAppSelector(state => state.added.showItemName);

  const toggleItemName = useCallback(() => {
    dispatch(ToggleItemName());
  }, [dispatch]);

  const title = itemNameShown ? "Hide" : "Show";

  return (
    <>
      <Chip
        size="sm"
        radius="xl"
        title={`${title} Item Names`}
        onPress={toggleItemName}
        buttonStyle={styles.buttonStyle}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: mainColor,
  },
});

export default memo(HideItemName);
