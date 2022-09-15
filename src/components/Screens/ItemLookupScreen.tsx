import { FC, memo } from "react";
import { View, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import InputGroup from "../InputComponents/InputGroup";
import { ItemLookupStackParamList } from "../../../CustomTypes/types";

type Props = StackScreenProps<ItemLookupStackParamList, "ItemLookup">;

const ItemLookupScreen: FC<Props> = ({ navigation }): JSX.Element => {
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
