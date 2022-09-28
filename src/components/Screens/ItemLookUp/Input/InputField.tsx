import { Header, SearchBar } from "@rneui/themed";
import {
  FC,
  memo,
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from "react";
import { StyleSheet, TextInput, View } from "react-native";
import * as Animatable from "react-native-animatable";
import {
  clearListItems,
  selectItemsArr,
  setListItems,
} from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { shallowEqual } from "react-redux";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import { WIDTH_80 } from "../../../../shared/sharedStyles";
import {
  ItemObjType,
  OnChangeText,
  ItemLookupStackParamList,
} from "../../../../../CustomTypes/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useIsFocused } from "@react-navigation/native";
import {
  MAIN_COLOR,
  DISPLAY_NONE,
  WIDTH_100,
  COLOR_WHITE,
} from "../../../../shared/sharedStyles";

const searchIcon = (
  <FontAwesome name="search" color="rgba(255,255,255,.5)" size={24} />
);

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
  const items = useAppSelector(selectItemsArr, shallowEqual);
  const view = useRef<Animatable.View & View>(null);
  const inputRef = useRef<TextInput>(null);
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<ItemLookupStackParamList>>();
  const inputFocused = route.params?.inputFocused ? true : false;

  const focusHandler = useCallback(() => {
    view.current?.transitionTo(WIDTH_100);
  }, []);

  const blurHandler = useCallback(() => {
    view.current?.transitionTo(WIDTH_80);
  }, []);

  const clickHandler = useCallback((): void => {
    dispatch(clearListItems());
    setVal("");
    inputRef.current && inputRef.current.focus();
  }, [dispatch]);

  // useEffect(() => {
  //   inputRef?.current.focus();
  // }, []);

  const navigation =
    useNavigation<StackNavigationProp<ItemLookupStackParamList>>();

  useFocusEffect(
    useCallback(() => {
      inputFocused && inputRef.current?.focus();
      return () => {
        navigation.setParams({ inputFocused: false });
      };
    }, [navigation, inputFocused])
  );

  // useFocusEffect(
  //   useCallback(() => {
  //     inputRef.current?.focus();
  //     return () => {
  //       view.current?.transitionTo(WIDTH_100);
  //     };
  //   }, [route.params?.inputFocused])
  // );

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
      const looseReg = trimmedValue
        .split(/\s+/gi)
        .map((f: string) => `(?=.*${f})`)
        .join("");
      const re = new RegExp(`${reg}|${looseReg}`, "gi");
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
    (text: string) => {
      const listItems = listItemsFunc(text);
      setVal(text);
      dispatch(setListItems(listItems));
    },
    [dispatch, listItemsFunc]
  );

  const clearIcon = useMemo(
    () => (
      <EvilIcons
        name="close"
        color="rgba(255,255,255,.5)"
        onPress={clickHandler}
        size={24}
      />
    ),
    [clickHandler]
  );

  return (
    <Header
      containerStyle={styles.headerContainer}
      backgroundColor={MAIN_COLOR}
      leftContainerStyle={DISPLAY_NONE}
      rightContainerStyle={DISPLAY_NONE}
      centerComponent={
        <Animatable.View ref={view} transition="width" style={WIDTH_80}>
          <SearchBar
            returnKeyType="search"
            ref={inputRef}
            lightTheme
            keyboardAppearance="dark"
            autoFocus
            onFocus={focusHandler}
            onBlur={blurHandler}
            containerStyle={styles.searchBarContainer}
            placeholder="Search..."
            round
            inputContainerStyle={styles.inputContainer}
            onClear={clickHandler}
            onChangeText={changeVal}
            value={val}
            inputStyle={COLOR_WHITE}
            placeholderTextColor="rgba(255,255,255,.5)"
            searchIcon={searchIcon}
            clearIcon={clearIcon}
          />
        </Animatable.View>
      }
    />
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  headerContainer: {
    // height: 105,
  },
  inputContainer: {
    borderRadius: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});

export default memo(InputField);
