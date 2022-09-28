import { StackHeaderProps, StackNavigationProp } from "@react-navigation/stack";
import { Header, SearchBar } from "@rneui/themed";
import { FC, memo, useEffect, useRef, useCallback } from "react";
import { TextInput, StyleSheet } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../CustomTypes/types";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import { mainColor, displayNone, colorWhite } from "../../shared/sharedStyles";

const searchIcon = (
  <FontAwesome name="search" color="rgba(255,255,255,.5)" size={24} />
);

const clearIcon = <EvilIcons name="close" color="rgba(255,255,255,.5)" />;

type Props = StackHeaderProps;

const HeaderHomeStackNavigator: FC<Props> = (): JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const inputRef = useRef<TextInput>(null);
  const isFocused = useIsFocused();
  !isFocused && inputRef.current?.blur();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      inputRef.current?.blur();
    });
    return unsubscribe;
  }, [navigation]);

  const focusHandler = useCallback(() => {
    navigation.navigate("ItemLookup");
    inputRef.current?.blur();
  }, [navigation]);

  return (
    <Header
      backgroundColor={mainColor}
      leftContainerStyle={displayNone}
      rightContainerStyle={displayNone}
      centerComponent={
        <SearchBar
          ref={inputRef}
          onFocus={focusHandler}
          containerStyle={styles.searchBarContainer}
          placeholder="Search..."
          round
          inputContainerStyle={styles.searchBarInputContainer}
          inputStyle={colorWhite}
          placeholderTextColor="rgba(255,255,255,.5)"
          searchIcon={searchIcon}
          clearIcon={clearIcon}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    width: "100%",
  },
  searchBarInputContainer: {
    borderRadius: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});

export default memo<Props>(HeaderHomeStackNavigator);
