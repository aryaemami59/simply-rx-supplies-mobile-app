import { EvilIcons } from "@expo/vector-icons";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SearchBar as SearchBarType } from "@rneui/base";
import { SearchBar } from "@rneui/themed";
import { Header, SearchBarProps, useTheme } from "@rneui/themed";
import {
  FC,
  memo,
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, TextInput, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { shallowEqual } from "react-redux";
import { RootTabParamList } from "../../../../../CustomTypes/navigation";
import { OnChangeText } from "../../../../../CustomTypes/types";
import { clearListItems, setListItems } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { selectItemNamesArr } from "../../../../redux/selectors";
import {
  BACKGROUND_TRANSPARENT,
  COLOR_WHITE,
  DISPLAY_NONE,
  ICON_GRAY_COLOR,
  JC_AI_CENTER,
  MAIN_COLOR,
  SEARCH_BAR_COLOR,
  WIDTH_100,
  WIDTH_80,
} from "../../../../shared/sharedStyles";
import { search } from "../../../../shared/utilityFunctions";
import HeaderRightComponent from "../../../HeaderComponents/HeaderRightComponent";
import SearchIcon from "../../../HeaderComponents/SearchIcon";

const styles = StyleSheet.create({
  headerCenterContainer: {
    flex: 5,
  },
  headerRightContainer: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: SEARCH_BAR_COLOR,
    borderRadius: 9999,
  },
  searchBarContainer: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
});

const rightContainerStyle = [JC_AI_CENTER, styles.headerRightContainer];

const containerStyle = [styles.searchBarContainer, BACKGROUND_TRANSPARENT];

const InputField: FC = () => {
  const [val, setVal] = useState("");
  const itemNames = useAppSelector(selectItemNamesArr, shallowEqual);
  const view = useRef<Animatable.View & View>(null);
  const inputRef = useRef<
    PropsWithChildren<SearchBarProps> & TextInput & SearchBarType
  >(null);
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { params } = useRoute<RouteProp<RootTabParamList, "ItemLookup">>();

  const inputFocused = params?.inputFocused ? true : false;

  const focusHandler = useCallback(() => {
    view.current?.transitionTo(WIDTH_100);
  }, []);

  const blurHandler = useCallback(() => {
    view.current?.transitionTo(WIDTH_80);
  }, []);

  const clearHandler = useCallback((): void => {
    setVal("");
    dispatch(clearListItems());
  }, [dispatch]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootTabParamList, "ItemLookup">>();

  useFocusEffect(
    useCallback(() => {
      console.log(inputRef?.current?.searchBar?.input.isFocused());
      inputFocused && inputRef.current?.focus();
      return () => {
        inputRef?.current?.searchBar?.input.isFocused()
          ? navigation.setParams({ inputFocused: true })
          : navigation.setParams({ inputFocused: false });
      };
    }, [inputFocused, navigation])
  );

  const changeVal: OnChangeText = useCallback(
    (text: string) => {
      const listItems = search(text, itemNames);
      setVal(text);
      dispatch(setListItems(listItems));
    },
    [dispatch, itemNames]
  );

  const clearIcon = useMemo(
    () => (
      <EvilIcons
        name="close"
        color={ICON_GRAY_COLOR}
        onPress={clearHandler}
        size={24}
      />
    ),
    [clearHandler]
  );

  return (
    <Header
      backgroundColor={MAIN_COLOR}
      rightContainerStyle={rightContainerStyle}
      leftContainerStyle={DISPLAY_NONE}
      rightComponent={HeaderRightComponent}
      centerContainerStyle={styles.headerCenterContainer}
      centerComponent={
        <Animatable.View
          ref={view}
          style={WIDTH_80}>
          <SearchBar
            // onKeyboardHide={}
            returnKeyType="search"
            ref={inputRef}
            lightTheme
            keyboardAppearance={theme.mode}
            autoFocus
            focusable
            onFocus={focusHandler}
            onBlur={blurHandler}
            containerStyle={containerStyle}
            placeholder="Search..."
            round
            inputContainerStyle={styles.inputContainer}
            onClear={clearHandler}
            onChangeText={changeVal}
            value={val}
            inputStyle={COLOR_WHITE}
            placeholderTextColor={ICON_GRAY_COLOR}
            searchIcon={SearchIcon}
            clearIcon={clearIcon}
          />
        </Animatable.View>
      }
    />
  );
};

export default memo(InputField);
