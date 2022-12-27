import { useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { FlatList, View } from "react-native";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../../../redux/hooks";
import { selectCategoriesArr } from "../../../../redux/selectors";
import { HEIGHT_100 } from "../../../../shared/styles/sharedStyles";
import type { Category } from "../../../../types/api";
import type { KeyExtractor, RenderItem } from "../../../../types/missingTypes";
import type { ItemsByCategoryScreenProps } from "../../../../types/navigation";
import ItemsByCategoryList from "./CategoryList";

const renderItem: RenderItem<Category> = ({ item }) => (
  <ItemsByCategoryList category={item} />
);

const keyExtractor: KeyExtractor<Category> = item => item;

type Props = ItemsByCategoryScreenProps;

const ItemsByCategoryScreen: FC<Props> = ({ navigation, route }) => {
  const categories = useAppSelector(selectCategoriesArr, shallowEqual);
  const { background: backgroundColor } = useTheme().theme.colors;

  const style: StyleProp<ViewStyle> = useMemo(
    () => [HEIGHT_100, { backgroundColor }],
    [backgroundColor]
  );

  return (
    <View style={style}>
      <FlatList
        keyExtractor={keyExtractor}
        removeClippedSubviews
        data={categories}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={10}
      />
    </View>
  );
};

export default memo<Props>(ItemsByCategoryScreen);
