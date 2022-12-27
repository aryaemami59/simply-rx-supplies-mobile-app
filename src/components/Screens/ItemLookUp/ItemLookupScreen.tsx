import type { FC } from "react";
import { memo } from "react";
import { FlatList } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { selectAllListItems } from "../../../redux/selectors";
import ItemNameProvider from "../../../shared/contexts/ItemNameProvider";
import type { ItemName } from "../../../types/api";
import type { KeyExtractor, RenderItem } from "../../../types/missingTypes";
import type { ItemLookupScreenProps } from "../../../types/navigation";
import BottomSheetComponent from "./BottomSheet/BottomSheetComponent";
import InputField from "./SearchBar/InputField";
import SingleSearchResultsListItem from "./SearchResults/SingleSearchResultsListItem";

const renderItems: RenderItem<ItemName> = ({ item }) => (
  <ItemNameProvider
    key={item}
    itemName={item}>
    <SingleSearchResultsListItem />
  </ItemNameProvider>
);

const keyExtractor: KeyExtractor<ItemName> = (item: ItemName) => item;

type Props = ItemLookupScreenProps;

const ItemLookupScreen: FC<Props> = ({ navigation, route }) => {
  // const { background: backgroundColor } = useTheme().theme.colors;
  // const style = useMemo(() => ({ backgroundColor }), [backgroundColor]);

  const listItems = useAppSelector(selectAllListItems, shallowEqual);

  return (
    <SafeAreaProvider>
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
