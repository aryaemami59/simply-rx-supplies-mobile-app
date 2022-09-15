import { StackHeaderProps, StackNavigationProp } from "@react-navigation/stack";
import { Header, Icon, SearchBar } from "@rneui/themed";
import { FC, memo, useEffect, useRef, useCallback } from "react";
import { TextInput } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../CustomTypes/types";
import { MaterialIcons, FontAwesome, EvilIcons } from "@expo/vector-icons";

const HeaderHomeStackNavigator: FC<StackHeaderProps> = (): JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
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
            <FontAwesome name="search" color="rgba(255,255,255,.5)" />
          }
          clearIcon={<EvilIcons name="close" color="rgba(255,255,255,.5)" />}
        />
      }
    />
  );
};

export default memo(HeaderHomeStackNavigator);
