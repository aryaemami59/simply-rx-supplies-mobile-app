import { FC, memo } from "react";
import { View, Text, StyleSheet } from "react-native";

const ErrMsgComponent: FC = (): JSX.Element => {
  return (
    <View>
      <Text style={styles.textBigger}>Oh snap! You got an error!</Text>
      <Text style={styles.textSmaller}>
        Looks like there was a problem loading the page. Either refresh the page
        or try again later.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textBigger: {
    color: "red",
    fontSize: 40,
  },
  textSmaller: {
    color: "red",
    fontSize: 28,
  },
});

export default memo(ErrMsgComponent);
