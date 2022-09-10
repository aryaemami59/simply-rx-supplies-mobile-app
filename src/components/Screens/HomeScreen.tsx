import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import { FC, memo } from "react";
import { RootStackParamList } from "../../../Main";
import { Button } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerScreenProps } from "@react-navigation/drawer";

type Props = DrawerScreenProps<RootStackParamList, "Home">;

export const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: { backgroundColor: "#0071dc" },
};

const HomeScreen: FC<Props> = ({ navigation }): JSX.Element => {

  // const Stack = createStackNavigator();

  return (
    <>
      <SafeAreaView>
        <View style={styles.containerStyle}>
          <Button title="Item Lookup" />
          <Button title="Items By Vendor" />
          <Button title="Items By Category" />
          <Button title="Shopping Cart" />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: "stretch",
    justifyContent: "space-between",
    height: "100%",
    padding: 30,
  },
});

export default memo(HomeScreen);
