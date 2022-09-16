import { FC, memo, useCallback } from "react";
import { Button, CheckBox, Chip } from "@rneui/themed";
import { Switch } from "@rneui/themed";
import { Pressable, StyleSheet, View, Text } from "react-native";
// import {  Switch } from "react-native";
import { mainColor, colorWhite } from "../../shared/sharedStyles";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { ToggleItemName } from "../../redux/addedSlice";

const HideItemName: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const itemNameShown = useAppSelector(state => state.added.showItemName);

  const toggleItemName = useCallback(() => {
    dispatch(ToggleItemName());
  }, [dispatch]);

  const title = itemNameShown ? "Hide" : "Show";

  return (
    <>
      {/* <CheckBox title="Hide Item Name" checked /> */}
      <Chip
        size="sm"
        radius="xl"
        title={`${title} Item Name`}
        onPress={toggleItemName}
        buttonStyle={styles.buttonStyle}>
        {/* <Switch
          color="white"
          style={{
            borderColor: "white",
            borderWidth: 2,
            borderRadius: 15,
            width: 80,
          }}
          thumbColor="white"
          trackColor={{ true: "green", false: "red" }}
        /> */}
        {/* <Text style={colorWhite}>Hide Item Name</Text> */}
      </Chip>
      {/* <Pressable style={styles.buttonStyle}>
        <Text style={{ ...colorWhite }}>Hide Item Name</Text>
      </Pressable> */}
      {/* <View style={{ backgroundColor: mainColor }}>
        <Chip
          size="sm"
          title="Hide Item Name"
          buttonStyle={styles.buttonStyle}></Chip>
        <Switch />
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: mainColor,
    // borderRadius: 9999,
    // color: "white",
    // paddingVertical: 0,
  },
});

export default memo(HideItemName);
