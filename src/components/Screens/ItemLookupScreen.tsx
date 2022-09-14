import { FC, memo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../Main";
import InputGroup from "../InputComponents/InputGroup";
import { DrawerScreenProps } from "@react-navigation/drawer";

type Props = DrawerScreenProps<RootStackParamList, "ItemLookup">;

const ItemLookupScreen: FC<Props> = ({ navigation }): JSX.Element => {
  return (
    <>
      {/* <SafeAreaView> */}
      <View style={styles.containerStyle}>
        <InputGroup navigation={navigation} />
      </View>
      {/* </SafeAreaView> */}
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: "stretch",
    justifyContent: "space-between",
    height: "100%",
    // padding: 30,
    paddingBottom: 10,
  },
});

export default memo(ItemLookupScreen);
