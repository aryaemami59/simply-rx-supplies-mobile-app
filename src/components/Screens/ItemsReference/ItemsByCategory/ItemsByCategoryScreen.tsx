import { FC, memo } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { selectNavsArr } from "../../../../redux/addedSlice";
import { shallowEqual } from "react-redux";
import { FlatList, ListRenderItem, ListRenderItemInfo } from "react-native";
import CategoryList from "./CategoryList";
import { StackScreenProps } from "@react-navigation/stack";
import {
  ItemsByCategoryStackParamList,
  Category,
} from "../../../../../CustomTypes/types";

const renderItem: ListRenderItem<Category> = ({
  item,
}: ListRenderItemInfo<Category>) => {
  return <CategoryList category={item} />;
};

const keyExtractor = (item: Category) => item.toString();

type Props = StackScreenProps<ItemsByCategoryStackParamList>;

const ItemsByCategoryScreen: FC<Props> = (): JSX.Element => {
  const categories = useAppSelector(selectNavsArr, shallowEqual);

  return (
    <FlatList
      keyExtractor={keyExtractor}
      removeClippedSubviews
      data={categories}
      renderItem={renderItem}
      keyboardShouldPersistTaps="handled"
      initialNumToRender={10}
    />
  );
};

export default memo<Props>(ItemsByCategoryScreen);
