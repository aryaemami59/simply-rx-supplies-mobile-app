import { FC, memo, useCallback } from "react";
import { Chip } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { ToggleItemBarcode } from "../../../../redux/addedSlice";
import { mainColor } from "../../../../shared/sharedStyles";

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
      title={`${title} Item Barcodes`}
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
