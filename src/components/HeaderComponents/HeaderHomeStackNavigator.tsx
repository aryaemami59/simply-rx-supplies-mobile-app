import { StackHeaderProps } from "@react-navigation/stack";
import { Header, Icon, SearchBar } from "@rneui/themed";
import { FC, memo, useEffect, useRef, useCallback } from "react";
import { TextInput } from "react-native";
import { useIsFocused } from "@react-navigation/native";

const HeaderHomeStackNavigator: FC<StackHeaderProps> = ({
  navigation,
}): JSX.Element => {
  const inputRef = useRef<TextInput>(null);
  const isFocused = useIsFocused();
  !isFocused && inputRef.current?.blur();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      inputRef.current?.blur();
    });
    return unsubscribe;
  });

  const focusHandler = useCallback(() => {
    navigation.navigate("ItemLookup");
    inputRef.current?.blur();
  }, []);

  return (
    <Header
      leftContainerStyle={{ display: "none" }}
      rightContainerStyle={{ display: "none" }}
      centerComponent={
        <SearchBar
          ref={inputRef}
          onFocus={focusHandler}
          lightTheme
          containerStyle={{
            backgroundColor: "transparent",
            borderBottomWidth: 0,
            borderTopWidth: 0,
            width: "100%",
          }}
          placeholder="Search..."
          round
          inputContainerStyle={{
            borderRadius: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
          inputStyle={{
            color: "white",
          }}
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
      }
    />
  );
};

export default memo(HeaderHomeStackNavigator);
