import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { shallowEqual } from "react-redux";
import {
  ItemLookupStackParamList,
  ItemName,
} from "../../../../CustomTypes/types";
import { useAppSelector } from "../../../redux/hooks";
import { selectAllListItems } from "../../../redux/selectors";
import BottomSheetComponent from "./Input/BottomSheetComponent";
import InputField from "./Input/InputField";
import SingleSearchResultsListItem from "./SearchResults/SingleSearchResultsListItem";

const renderItems: ListRenderItem<ItemName> = ({ item }) => (
  <SingleSearchResultsListItem itemName={item} />
);

const keyExtractor = (item: ItemName) => item;

type Props = NativeStackScreenProps<
  ItemLookupStackParamList,
  "ItemLookupScreen"
>;

const ItemLookupScreen: FC<Props> = ({ navigation, route }) => {
  const listItems = useAppSelector(selectAllListItems, shallowEqual);
  const { theme } = useTheme();
  const { background } = theme.colors;

  const style = useMemo(
    () => [styles.containerStyle, { backgroundColor: background }],
    [background]
  );

  return (
    <View style={style}>
      <InputField />
      <BottomSheetComponent />
      <FlatList
        removeClippedSubviews
        maxToRenderPerBatch={5}
        data={listItems}
        renderItem={renderItems}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={7}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: "stretch",
    height: "100%",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
});

export default memo<Props>(ItemLookupScreen);
