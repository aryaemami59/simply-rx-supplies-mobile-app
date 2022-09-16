import { FC, memo, useCallback } from "react";
import { Chip } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { mainColor } from "../../shared/sharedStyles";
import { ToggleItemBarcode } from "../../redux/addedSlice";
import { useAppSelector, useAppDispatch } from "../../redux/store";

const HideItemBarcode: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const itemBarcodeShown = useAppSelector(state => state.added.showItemBarcode);

  const toggleItemBarcode = useCallback(() => {
    dispatch(ToggleItemBarcode());
  }, [dispatch]);

  const title = itemBarcodeShown ? "Hide" : "Show";
  return (
    <Chip
      size="sm"
      radius="xl"
      title={`${title} Item Barcode`}
      buttonStyle={styles.buttonStyle}
      onPress={toggleItemBarcode}
    />
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: mainColor,
  },
});

export default memo(HideItemBarcode);
