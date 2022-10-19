import { FC, memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLOR_RED } from "./sharedStyles";

const styles = StyleSheet.create({
  colorRed: {
    color: COLOR_RED,
  },
  textBigger: {
    fontSize: 40,
  },
  textSmaller: {
    fontSize: 28,
  },
});

const titleStyle = [styles.colorRed, styles.textBigger];

const textStyle = [styles.colorRed, styles.textSmaller];

const ErrMsgComponent: FC = () => (
  <View>
    <Text style={titleStyle}>Oh snap! You got an error!</Text>
    <Text style={textStyle}>
      Looks like there was a problem loading the page. Either refresh the page
      or try again later.
    </Text>
  </View>
);

export default memo(ErrMsgComponent);
