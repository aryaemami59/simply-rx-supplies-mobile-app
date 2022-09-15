import { FC, memo } from "react";
import { View, StyleSheet } from "react-native";
import InputGroup from "../InputComponents/InputGroup";

// type Props = StackScreenProps<ItemLookupStackParamList, "ItemLookupScreen">;

const ItemLookupScreen: FC = (): JSX.Element => {
  return (
    <View style={styles.containerStyle}>
      <InputGroup />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: "stretch",
    justifyContent: "space-between",
    height: "100%",
    paddingBottom: 10,
  },
});

export default memo(ItemLookupScreen);
