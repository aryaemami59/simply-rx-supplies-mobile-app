import { useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useMemo } from "react";
import type { ListRenderItem } from "react-native";
import { FlatList } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { selectAllListItems } from "../../../redux/selectors";
import ItemNameProvider from "../../../shared/contexts/ItemNameProvider";
import type { ItemName } from "../../../types/api";
import type { ItemLookupScreenProps } from "../../../types/navigation";
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

  return (
    <SafeAreaProvider style={style}>
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
    </SafeAreaProvider>
  );
};

export default memo<Props>(ItemLookupScreen);
