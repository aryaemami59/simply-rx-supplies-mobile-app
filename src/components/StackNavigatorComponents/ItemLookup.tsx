import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { shallowEqual } from "react-redux";
import { ItemLookupProps } from "../../../CustomTypes/navigation";
import { ItemName } from "../../../CustomTypes/types";
import { useAppSelector } from "../../redux/hooks";
import { selectAllListItems } from "../../redux/selectors";
import ItemNameProvider from "../../shared/contexts/ItemNameProvider";
import BottomSheetComponent from "../Screens/ItemLookUp/Input/BottomSheetComponent";
import InputField from "../Screens/ItemLookUp/Input/InputField";
import SingleSearchResultsListItem from "../Screens/ItemLookUp/SearchResults/SingleSearchResultsListItem";
import useStatus from "../../shared/customHooks/useStatus";

const renderItems: ListRenderItem<ItemName> = ({ item }) => (
  <ItemNameProvider itemName={item}>
    <SingleSearchResultsListItem />
  </ItemNameProvider>
);

const keyExtractor = (item: ItemName) => item;

type Props = ItemLookupProps;

const ItemLookup: FC<Props> = ({ navigation, route }) => {
  const { background: backgroundColor } = useTheme().theme.colors;
  useStatus("ItemLookup");
  const style = useMemo(() => ({ backgroundColor }), [backgroundColor]);

  const listItems = useAppSelector(selectAllListItems, shallowEqual);

  const viewStyle = useMemo(
    () => [styles.containerStyle, { backgroundColor }],
    [backgroundColor]
  );

  return (
    <SafeAreaProvider style={style}>
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
    </SafeAreaProvider>
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

export default memo<Props>(ItemLookup);
