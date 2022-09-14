// @ts-nocheck
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useRef,
  useState,
  FC,
  memo,
  useEffect,
  Ref,
  LegacyRef,
  Component,
} from "react";
import { SearchBar, Icon } from "@rneui/themed";
import {
  clearListItems,
  itemInterface,
  selectItemsArr,
  setListItems,
  selectAllListItems,
} from "../../redux/addedSlice";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { shallowEqual } from "react-redux";
import {
  FlatList,
  StyleSheet,
  TextInput,
  Animated,
  Easing,
  ViewProps,
  ViewStyle,
} from "react-native";
import SingleInputListItem from "./SingleInputListItem";
import { Header } from "@rneui/themed";
import { useIsFocused } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

// let inputWidth = "100%";

const clearIcon = (
  <Icon name="close" color="rgba(255,255,255,.5)" type="EvilIcons" />
);

const empty: [] = [];

const sortResults = (
  searchTerm: itemInterface,
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

const InputGroup = ({ navigation }): JSX.Element => {
  // const [inputWidth, setInputWidth] = useState("100%");
  const view: Ref<Animatable.AnimatableComponent<ViewProps, ViewStyle>> =
    useRef<null>(null);
  // const inputWidthValue = useRef(new Animated.Value(80)).current;
  // const inputWidthScale = Animated.timing(inputWidthValue, {
  //   toValue: 100,
  //   duration: 2000,
  //   useNativeDriver: true,
  // });
  const isFocused = useIsFocused();
  const items: itemInterface[] = useAppSelector<itemInterface[]>(
    selectItemsArr,
    shallowEqual
  );
  const listItems = useAppSelector(selectAllListItems, shallowEqual);
  const dispatch = useAppDispatch();
  const inputRef: Ref<TextInput> = useRef<null>(null);
  const [val, setVal]: [string, Dispatch<SetStateAction<string>>] =
    useState<string>("");

  useEffect(() => {
    // isFocused && inputRef.current?.focus();
    isFocused ? inputRef.current?.focus() : view.current?.transitionTo("100%");
    // isFocused ? inputRef.current?.focus() : inputRef.current?.blur();
    // view.current && view.current.transition("80%", "100%");
  }, [isFocused]);

  const focusHandler = useCallback(() => {
    view.current?.transitionTo({ width: "100%" });
    // setInputWidth("100%");
  }, []);

  const blurHandler = useCallback(() => {
    view.current?.transitionTo({ width: "80%" });
    // setInputWidth("80%");
  }, []);

  const clickHandler = useCallback((): void => {
    dispatch(clearListItems());
    setVal("");
    inputRef.current && inputRef.current.focus();
  }, [dispatch]);

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

  const changeVal = useCallback(
    (text: string): void => {
      const listItems: itemInterface[] = listItemsFunc(text);
      setVal(text);
      dispatch(setListItems(listItems));
    },
    [dispatch, listItemsFunc]
  );

  const renderItems = useCallback(({ item }): JSX.Element => {
    return <SingleInputListItem item={item} />;
  }, []);

  return (
    <>
      <Header
        leftContainerStyle={{ display: "none" }}
        rightContainerStyle={{ display: "none" }}
        centerComponent={
          <Animatable.View
            ref={view}
            transition={"width"}
            style={{ width: "100%" }}>
            <SearchBar
              ref={inputRef}
              lightTheme
              onFocus={focusHandler}
              onBlur={blurHandler}
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
                <Icon
                  name="close"
                  color="rgba(255,255,255,.5)"
                  type="EvilIcons"
                  onPress={clickHandler}
                />
              }
            />
          </Animatable.View>
        }
      />
      <FlatList data={listItems} renderItem={renderItems} />
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    // width: inputWidth,
  },
  inputContainerStyle: {
    borderRadius: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  inputStyle: {
    color: "white",
  },
});

export default memo(InputGroup);
