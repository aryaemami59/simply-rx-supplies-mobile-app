import { FC, memo } from "react";
import { Chip } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { mainColor } from "../../shared/sharedStyles";

const HideItemName: FC = (): JSX.Element => {
  return (
    <Chip size="sm" title="Hide Item Name" buttonStyle={styles.buttonStyle} />
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: mainColor,
  },
});

export default memo(HideItemName);
