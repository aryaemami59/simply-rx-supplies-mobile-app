import { Chip } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { ToggleItemBarcode } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { BACKGROUND_MAIN_COLOR } from "../../../../shared/sharedStyles";

const HideItemBarcode: FC = () => {
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
      buttonStyle={BACKGROUND_MAIN_COLOR}
      onPress={toggleItemBarcode}
    />
  );
};

export default memo(HideItemBarcode);
