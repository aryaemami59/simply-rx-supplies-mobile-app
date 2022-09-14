import { Icon, SearchBar } from "@rneui/themed";
import { FC, memo } from "react";
import { StyleSheet } from "react-native";

interface Props {
  props: string;
}

const InputField: FC<Props> = ({ props }): JSX.Element => {
  return (
    <>
      <SearchBar
        lightTheme
        containerStyle={styles.containerStyle}
        placeholder="Search..."
        round
        inputContainerStyle={styles.inputContainerStyle}
        onClear={clickHandler}
        onChangeText={changeVal}
        value={val}
        inputStyle={styles.inputStyle}
        placeholderTextColor="rgba(255,255,255,.5)"
        searchIcon={
          <Icon
            name="search"
            color="rgba(255,255,255,.5)"
            type="font-awesome"
          />
        }
        clearIcon={
          <Icon name="close" color="rgba(255,255,255,.5)" type="EvilIcons" />
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  inputContainerStyle: {
    borderRadius: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  inputStyle: {
    color: "white",
  },
});

export default memo(InputField);
