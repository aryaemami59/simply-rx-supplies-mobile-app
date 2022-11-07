import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { shallowEqual } from "react-redux";
import { ItemName } from "../../../../custom_types/api";
import { ItemLookupScreenProps } from "../../../../custom_types/navigation";
import { useAppSelector } from "../../../redux/hooks";
import { selectAllListItems } from "../../../redux/selectors";
import ItemNameProvider from "../../../shared/contexts/ItemNameProvider";
import useStatus from "../../../shared/hooks/useStatus";
import BottomSheetComponent from "./BottomSheet/BottomSheetComponent";
import InputField from "./SearchBar/InputField";
import SingleSearchResultsListItem from "./SearchResults/SingleSearchResultsListItem";

const renderItems: ListRenderItem<ItemName> = ({ item }) => (
  <ItemNameProvider
    key={item}
    itemName={item}>
    <SingleSearchResultsListItem />
  </ItemNameProvider>
);

const keyExtractor = (item: ItemName) => item;

type Props = ItemLookupScreenProps;

const ItemLookupScreen: FC<Props> = ({ navigation, route }) => {
  const { background: backgroundColor } = useTheme().theme.colors;
  const style = useMemo(() => ({ backgroundColor }), [backgroundColor]);

  const listItems = useAppSelector(selectAllListItems, shallowEqual);

  // const viewStyle = useMemo(
  //   () => [styles.containerStyle, { backgroundColor }],
  //   [backgroundColor]
  // );

  useStatus("ItemLookup");

  return (
    <SafeAreaProvider style={style}>
      {/* <View style={viewStyle}> */}
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
      {/* </View> */}
    </SafeAreaProvider>
  );
};

// const styles = StyleSheet.create({
//   containerStyle: {
//     alignItems: "stretch",
//     height: "100%",
//     justifyContent: "space-between",
//     paddingBottom: 10,
//   },
// });

export default memo<Props>(ItemLookupScreen);
