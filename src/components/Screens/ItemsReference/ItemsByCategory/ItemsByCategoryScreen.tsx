import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { shallowEqual } from "react-redux";
import { ItemsByCategoryScreenProps } from "../../../../../custom_types/navigation";
import { Category } from "../../../../../custom_types/api";
import { useAppSelector } from "../../../../redux/hooks";
import { selectCategoriesArr } from "../../../../redux/selectors";
import { HEIGHT_100 } from "../../../../shared/styles/sharedStyles";
import ItemsByCategoryList from "./CategoryList";

const renderItem: ListRenderItem<Category> = ({ item }) => (
  <ItemsByCategoryList category={item} />
);

const keyExtractor = (item: Category) => item;

type Props = ItemsByCategoryScreenProps;

const ItemsByCategoryScreen: FC<Props> = ({ navigation, route }) => {
  const categories = useAppSelector(selectCategoriesArr, shallowEqual);
  const { background: backgroundColor } = useTheme().theme.colors;

  const style = useMemo(
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
