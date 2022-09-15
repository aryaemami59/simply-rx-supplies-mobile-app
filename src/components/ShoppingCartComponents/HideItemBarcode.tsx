import { FC, memo } from "react";
import { Button, Chip } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { mainColor } from "../../shared/sharedStyles";

interface Props {
  props: string;
}

const HideItemBarcode: FC = (): JSX.Element => {
  return (
    <Chip
      size="sm"
      title="Hide Item Barcode"
      buttonStyle={styles.buttonStyle}
    />
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: mainColor,
  },
});

export default memo(HideItemBarcode);
