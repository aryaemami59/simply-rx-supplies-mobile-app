import { FC, memo } from "react";
import { useAppSelector } from "../../../../redux/store";
import { selectNavsArr } from "../../../../redux/addedSlice";
import { shallowEqual } from "react-redux";
import { ScrollView } from "react-native";
import CategoryList from "./CategoryList";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Category,
  ItemsByCategoryStackParamList,
} from "../../../../../CustomTypes/types";

type Props = StackScreenProps<ItemsByCategoryStackParamList>;

const ItemsByCategoryScreen: FC<Props> = (): JSX.Element => {
  const navList: Category[] = useAppSelector<Category[]>(
    selectNavsArr,
    shallowEqual
  );

  return (
    <ScrollView>
      {navList.map(e => (
        <CategoryList key={e} category={e} />
      ))}
    </ScrollView>
  );
};

export default memo<Props>(ItemsByCategoryScreen);
