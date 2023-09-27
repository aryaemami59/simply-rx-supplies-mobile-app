import { useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useMemo } from "react";
import type { ListRenderItem, StyleProp, ViewStyle } from "react-native";
import { FlatList, View } from "react-native";

import { ADAPTER_SELECTORS } from "../../../../redux/adapterSelectors";
import { useAppSelector } from "../../../../redux/hooks";
import { HEIGHT_100 } from "../../../../shared/styles/sharedStyles";
import type { ItemsReferenceTabScreenProps } from "../../../../types/navigation";
import type { KeyExtractor } from "../../../../types/tsHelpers";
import ItemsByCategoryList from "./ItemsByCategoryList";

const renderItem: ListRenderItem<number> = ({ item }) => (
  <ItemsByCategoryList categoryId={item} />
);

const keyExtractor: KeyExtractor<number> = item => `${item}`;

type Props = ItemsReferenceTabScreenProps<"ItemsByCategory">;

const ItemsByCategoryScreen: FC<Props> = ({ navigation, route }) => {
  const categoryIds = useAppSelector(
    ADAPTER_SELECTORS.GLOBAL.categories.selectIds
  );
  const { background: backgroundColor } = useTheme().theme.colors;

  const style = useMemo<StyleProp<ViewStyle>>(
    () => [HEIGHT_100, { backgroundColor }],
    [backgroundColor]
  );

  return (
    <View style={style}>
      <FlatList
        keyExtractor={keyExtractor}
        removeClippedSubviews
        data={categoryIds}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={10}
      />
    </View>
  );
};

export default memo<Props>(ItemsByCategoryScreen);
