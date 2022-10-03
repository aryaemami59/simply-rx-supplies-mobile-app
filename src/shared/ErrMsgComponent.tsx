import { FC, memo } from "react";
import { StyleSheet, Text, View } from "react-native";

const ErrMsgComponent: FC = (): JSX.Element => {
  return (
    <View>
      <Text style={[styles.colorRed, styles.textBigger]}>
        Oh snap! You got an error!
      </Text>
      <Text style={[styles.colorRed, styles.textSmaller]}>
        Looks like there was a problem loading the page. Either refresh the page
        or try again later.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textBigger: {
    fontSize: 40,
  },
  textSmaller: {
    fontSize: 28,
  },
  colorRed: {
    color: "red",
  },
});

export default memo(ErrMsgComponent);
