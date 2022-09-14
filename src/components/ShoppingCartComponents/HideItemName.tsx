import { FC, memo } from "react";
import { Button, Chip } from "@rneui/themed";
import { StyleSheet } from "react-native";

interface Props {
  props: string;
}

const HideItemName: FC = (): JSX.Element => {
  return (
    <Chip size="sm" title="Hide Item Name" buttonStyle={styles.buttonStyle} />
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "#0071dc",
    // width: "100%",
  },
});
//
export default memo(HideItemName);
