import { FC, memo } from "react";
import { View, StyleSheet } from "react-native";
import InputGroup from "../../InputComponents/InputGroup";
import { StackScreenProps } from "@react-navigation/stack";
import { ItemLookupStackParamList } from "../../../../CustomTypes/types";

type Props = StackScreenProps<ItemLookupStackParamList, "ItemLookupScreen">;

const ItemLookupScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
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

export default memo<Props>(ItemLookupScreen);
