import { FC, memo, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import InputGroup from "../../InputComponents/InputGroup";
import { StackScreenProps } from "@react-navigation/stack";
import { ItemLookupStackParamList } from "../../../../CustomTypes/types";
import { Button } from "@rneui/themed";

type Props = StackScreenProps<ItemLookupStackParamList, "ItemLookupScreen">;

// const ItemLookupScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
const ItemLookupScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  // const [visible, setVisible] = useState(false);

  // const showBottomSheet = useCallback(() => {
  //   setVisible(true);
  //   navigation.setOptions({ tabBarStyle: { display: "none" } });
  // }, []);

  // const hideBottomSheet = useCallback(() => {
  //   setVisible(false);
  //   navigation.setOptions({ tabBarStyle: { display: "flex" } });
  // }, []);

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
