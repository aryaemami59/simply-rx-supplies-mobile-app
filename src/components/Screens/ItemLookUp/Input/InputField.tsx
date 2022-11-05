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
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  InteractionManager,
  Keyboard,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { shallowEqual } from "react-redux";
import {
  ItemLookupNavigationProps,
  ItemLookupRouteProps,
  RootTabParamList,
} from "../../../../../CustomTypes/navigation";
import {
  AnimatableViewRef,
  OnChangeText,
  SearchBarRef,
} from "../../../../../CustomTypes/types";
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
import useUpdateLogger from "../../../../shared/customHooks/useUpdateLogger";
import useStatus from "../../../../shared/customHooks/useStatus";

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
  const { params } = useRoute<ItemLookupRouteProps>();
  const inputRef = useRef<SearchBarRef>(null);
  const view = useRef<AnimatableViewRef>(null);
  const [val, setVal] = useState("");
  const itemNames = useAppSelector(selectItemNamesArr, shallowEqual);
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const inputFocused = params?.inputFocused ? true : false;

  const focusHandler = useCallback(() => {
    // view.current?.transitionTo({ flexGrow: 1 });
    // view.current?.transitionTo({ transform: [{ scaleX: 1.5 }] });
    view.current?.transitionTo(WIDTH_100);
    console.log("focused");
  }, []);

  const blurHandler = useCallback(() => {
    // view.current?.transitionTo({ flexGrow: 0.8 });
    // view.current?.transitionTo({ transform: [{ scaleX: 1 }] });
    view.current?.transitionTo(WIDTH_80);
    console.log("blurred");
  }, []);

  const clearHandler = useCallback((): void => {
    setVal("");
    dispatch(clearListItems());
  }, [dispatch]);

  useStatus("InputField");

  // useUpdateLogger(inputFocused);

  // useEffect(() => {
  //   inputRef.current?.focus();
  // }, []);

  const navigation = useNavigation<ItemLookupNavigationProps>();

  useFocusEffect(
    useCallback(() => {
      const ref = inputRef.current;
      const task = InteractionManager.runAfterInteractions(() => {
        inputFocused && ref?.focus();
      });
      // return () => {
      //   ref?.searchBar?.input.isFocused()
      //     ? navigation.setParams({ inputFocused: true })
      //     : navigation.setParams({ inputFocused: false });
      //   task.cancel();
      // };
    }, [inputFocused])
  );

  // useEffect(() => {
  //   const ref = inputRef.current;
  //   return () => {
  //     ref?.blur();
  //     ref?.searchBar?.input.isFocused()
  //       ? navigation.setParams({ inputFocused: true })
  //       : navigation.setParams({ inputFocused: false });
  //   };
  // }, [navigation]);

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
          easing="ease-in-out"
          // animation="ease-in-out"
          // useNativeDriver
          ref={view}
          style={WIDTH_80}>
          <SearchBar
            // onKeyboardHide={}
            returnKeyType="search"
            ref={inputRef}
            // lightTheme
            keyboardAppearance={theme.mode}
            autoFocus
            // focusable
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
