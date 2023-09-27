import { useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useEffect, useMemo } from "react";
import type { ListRenderItem, StyleProp, ViewStyle } from "react-native";
import { FlatList, View } from "react-native";

import { useAppSelector } from "../../../../redux/hooks";
import {
  selectCategoryItemIds,
  selectCategoryName,
} from "../../../../redux/selectors";
import ItemIdProvider from "../../../../shared/contexts/ItemIdProvider";
import { HEIGHT_100 } from "../../../../shared/styles/sharedStyles";
import type { ItemsReferenceStackScreenProps } from "../../../../types/navigation";
import type { KeyExtractor } from "../../../../types/tsHelpers";
import ItemsByCategorySingleListItem from "./ItemsByCategorySingleListItem";

const renderItems: ListRenderItem<number> = ({ item }) => (
  <ItemIdProvider itemId={item}>
    <ItemsByCategorySingleListItem />
  </ItemIdProvider>
);

const keyExtractor: KeyExtractor<number> = item => `${item}`;

type Props = ItemsReferenceStackScreenProps<"ItemsByCategoryListItems">;

const ItemsByCategoryListItems: FC<Props> = ({ navigation, route }) => {
  const { categoryId } = route.params;
  const { background: backgroundColor } = useTheme().theme.colors;
  const categoryItemIds = useAppSelector(state =>
    selectCategoryItemIds(state, categoryId)
  );
  const categoryName = useAppSelector(state =>
    selectCategoryName(state, categoryId)
  );

  const options = useMemo<
    NonNullable<Parameters<typeof navigation.setOptions>[0]>
  >(
    () => ({
      headerTitle: categoryName,
    }),
    [categoryName]
  );

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);

  const style = useMemo<StyleProp<ViewStyle>>(
    () => [HEIGHT_100, { backgroundColor }],
    [backgroundColor]
  );

  return (
    <View style={style}>
      <FlatList
        removeClippedSubviews
        data={categoryItemIds}
        renderItem={renderItems}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default memo<Props>(ItemsByCategoryListItems);
