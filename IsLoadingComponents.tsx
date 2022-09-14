import { FC, memo } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const IsLoadingComponents: FC = (): JSX.Element => {
  return (
    <View style={styles.isLoadingStyle}>
      <ActivityIndicator size="large" color="aqua" />
    </View>
  );
};

const styles = StyleSheet.create({
  isLoadingStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

export default memo(IsLoadingComponents);
