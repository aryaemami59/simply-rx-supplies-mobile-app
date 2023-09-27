import type { FC } from "react";
import { memo } from "react";
import type { ListRenderItem } from "react-native";
import { FlatList } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ADAPTER_SELECTORS } from "../../../redux/adapterSelectors";
import { useAppSelector } from "../../../redux/hooks";
import ItemIdProvider from "../../../shared/contexts/ItemIdProvider";
import type { RootTabScreenProps } from "../../../types/navigation";
import type { KeyExtractor } from "../../../types/tsHelpers";
import BottomSheetComponent from "./BottomSheet/BottomSheetComponent";
import InputField from "./SearchBar/InputField";
import SingleSearchResultsListItem from "./SearchResults/SingleSearchResultsListItem";

const renderItems: ListRenderItem<number> = ({ item }) => (
  <ItemIdProvider
    key={item}
    itemId={item}>
    <SingleSearchResultsListItem />
  </ItemIdProvider>
);

const keyExtractor: KeyExtractor<number> = item => `${item}`;

type Props = RootTabScreenProps<"ItemLookup">;

const ItemLookupScreen: FC<Props> = ({ navigation, route }) => {
  const searchResultsIds = useAppSelector(
    ADAPTER_SELECTORS.GLOBAL.searchResults.selectIds
  );
  // useFocusEffect(
  //   useCallback(() => {
  //     route.params.inputFocused ||
  //       navigation.setParams({ inputFocused: false });
  //   }, [navigation, route.params.inputFocused])
  // );

  return (
    <SafeAreaProvider>
      <InputField />
      {/* <InputField inputFocused={route.params.inputFocused} /> */}
      <BottomSheetComponent />
      <FlatList
        removeClippedSubviews
        maxToRenderPerBatch={5}
        data={searchResultsIds}
        renderItem={renderItems}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={7}
      />
    </SafeAreaProvider>
  );
};

export default memo<Props>(ItemLookupScreen);
