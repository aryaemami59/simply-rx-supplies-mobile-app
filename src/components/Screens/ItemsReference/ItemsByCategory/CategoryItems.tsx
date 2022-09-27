import { FC, memo, useEffect } from "react";
import { selectSidebarNavs } from "../../../../redux/addedSlice";
import { useAppSelector } from "../../../../redux/hooks";
import { shallowEqual } from "react-redux";
import { FlatList, ListRenderItem, ListRenderItemInfo } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import {
  ItemsReferenceStackParamList,
  ItemObjType,
} from "../../../../../CustomTypes/types";
import ItemsByCategorySingleListItem from "./ItemsByCategorySingleListItem";

const renderItems: ListRenderItem<ItemObjType> = ({
  item,
}: ListRenderItemInfo<ItemObjType>): JSX.Element => {
  return <ItemsByCategorySingleListItem itemObj={item} />;
};

const keyExtractor = (item: ItemObjType) => item.id.toString();

type Props = StackScreenProps<
  ItemsReferenceStackParamList,
  "ItemsByCategoryListItems"
>;

const CategoryItems: FC<Props> = ({ navigation, route }): JSX.Element => {
  const { category } = route.params;

  const categoryListItems: ItemObjType[] = useAppSelector<ItemObjType[]>(
    selectSidebarNavs(category),
    shallowEqual
  );

  useEffect(() => {
    navigation.setOptions({ headerTitle: category });
  }, []);

  return (
    <FlatList
      removeClippedSubviews
      data={categoryListItems}
      renderItem={renderItems}
      keyExtractor={keyExtractor}
      keyboardShouldPersistTaps="handled"
    />
  );
};

export default memo<Props>(CategoryItems);
