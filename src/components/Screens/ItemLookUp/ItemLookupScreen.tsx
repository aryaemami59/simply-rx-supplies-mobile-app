import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { shallowEqual } from "react-redux";
import { ItemName } from "../../../../CustomTypes/types";
import { useAppSelector } from "../../../redux/hooks";
import { selectAllListItems } from "../../../redux/selectors";
import ItemNameProvider from "../../../shared/contexts/ItemNameProvider";
import BottomSheetComponent from "./Input/BottomSheetComponent";
import InputField from "./Input/InputField";
import SingleSearchResultsListItem from "./SearchResults/SingleSearchResultsListItem";

const renderItems: ListRenderItem<ItemName> = ({ item }) => (
  <ItemNameProvider itemName={item}>
    <SingleSearchResultsListItem />
  </ItemNameProvider>
);

const keyExtractor = (item: ItemName) => item;

type Props = NativeStackScreenProps<
  ItemLookupStackParamList,
  "ItemLookupScreen"
>;

const ItemLookupScreen: FC = () => {
  // const ItemLookupScreen: FC<Props> = ({ navigation, route }) => {
  const listItems = useAppSelector(selectAllListItems, shallowEqual);
  const { background: backgroundColor } = useTheme().theme.colors;

  const viewStyle = useMemo(
    () => [styles.containerStyle, { backgroundColor }],
    [backgroundColor]
  );

  return (
    <View style={viewStyle}>
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

export default memo(ItemLookupScreen);
