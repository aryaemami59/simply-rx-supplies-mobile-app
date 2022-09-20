import { Header, SearchBar } from "@rneui/themed";
import { FC, memo, useState, useCallback, useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import * as Animatable from "react-native-animatable";
import {
  clearListItems,
  selectItemsArr,
  setListItems,
} from "../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useFocusEffect } from "@react-navigation/native";
import { shallowEqual } from "react-redux";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import { width80 } from "../../shared/sharedStyles";
import { ItemObjType, OnChangeText } from "../../../CustomTypes/types";
import {
  mainColor,
  displayNone,
  width100,
  colorWhite,
} from "../../shared/sharedStyles";

const empty: [] = [];

const sortResults = (
  searchTerm: ItemObjType,
  re: RegExp,
  trimmedValue: string
): number => {
  if (searchTerm.name.toLowerCase() === trimmedValue) {
    return 100;
  }
  if (searchTerm.name.toLowerCase().startsWith(trimmedValue)) {
    return 75;
  }
  if (searchTerm.name.toLowerCase().includes(trimmedValue)) {
    return 50;
  }
  if (searchTerm.name.toLowerCase().match(re)) {
    return searchTerm.name.toLowerCase().match(re)!.length;
  }
  return 0;
};

const InputField: FC = (): JSX.Element => {
  const [val, setVal] = useState<string>("");
  const items: ItemObjType[] = useAppSelector<ItemObjType[]>(
    selectItemsArr,
    shallowEqual
  );
  const view = useRef<Animatable.View & View>(null);
  const inputRef = useRef<TextInput>(null);
  const dispatch = useAppDispatch();

  const focusHandler = useCallback(() => {
    view.current?.transitionTo(width100);
  }, []);

  const blurHandler = useCallback(() => {
    view.current?.transitionTo(width80);
  }, []);

  const clickHandler = useCallback((): void => {
    dispatch(clearListItems());
    setVal("");
    inputRef.current && inputRef.current.focus();
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      inputRef.current?.focus();
      return () => {
        view.current?.transitionTo(width100);
      };
    }, [])
  );

  const listItemsFunc = useCallback(
    (text: string) => {
      const trimmedValue: string = text
        .trim()
        .toLowerCase()
        .replace(/\s{2,}/, " ");
      const reg: string = trimmedValue
        .split(/\s+/gi)
        .map((f: string, i: number, arr: string[]) =>
          i !== arr.length - 1 ? `(\\b(${f})+\\b)` : `(\\b(${f}))`
        )
        .join(".*");
      const looseReg: string = trimmedValue
        .split(/\s+/gi)
        .map((f: string) => `(?=.*${f})`)
        .join("");
      const re: RegExp = new RegExp(`${reg}|${looseReg}`, "gi");
      return trimmedValue
        ? items
            .filter(({ name }) => name.toLowerCase().trim().match(re))
            .slice(0, 50)
            .sort(
              (a, b) =>
                sortResults(b, re, trimmedValue) -
                sortResults(a, re, trimmedValue)
            )
        : empty;
    },
    [items]
  );

  const changeVal: OnChangeText = useCallback(
    (text: string): void => {
      const listItems: ItemObjType[] = listItemsFunc(text);
      setVal(text);
      dispatch(setListItems(listItems));
    },
    [dispatch, listItemsFunc]
  );

  return (
    <Header
      containerStyle={styles.headerContainerStyle}
      backgroundColor={mainColor}
      leftContainerStyle={displayNone}
      rightContainerStyle={displayNone}
      centerComponent={
        <Animatable.View ref={view} transition="width" style={width100}>
          <SearchBar
            returnKeyType="search"
            ref={inputRef}
            lightTheme
            keyboardAppearance="dark"
            autoFocus
            onFocus={focusHandler}
            onBlur={blurHandler}
            containerStyle={styles.containerStyle}
            placeholder="Search..."
            round
            inputContainerStyle={styles.inputContainerStyle}
            onClear={clickHandler}
            onChangeText={changeVal}
            value={val}
            inputStyle={colorWhite}
            placeholderTextColor="rgba(255,255,255,.5)"
            searchIcon={
              <FontAwesome
                name="search"
                color="rgba(255,255,255,.5)"
                size={24}
              />
            }
            clearIcon={
              <EvilIcons
                name="close"
                color="rgba(255,255,255,.5)"
                onPress={clickHandler}
                size={24}
              />
            }
          />
        </Animatable.View>
      }
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  headerContainerStyle: {
    height: 105,
  },
  inputContainerStyle: {
    borderRadius: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});

export default memo(InputField);
