import { FC, memo, useCallback } from "react";
import { Chip } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { mainColor } from "../../shared/sharedStyles";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { ToggleItemName } from "../../redux/addedSlice";

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
        buttonStyle={styles.buttonStyle}></Chip>
    </>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: mainColor,
  },
});

export default memo(HideItemName);
