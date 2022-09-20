import { FC, memo, useEffect } from "react";
import { selectSidebarNavs } from "../../redux/addedSlice";
import { useAppSelector } from "../../redux/store";
import { shallowEqual } from "react-redux";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";
import { ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import {
  ItemsReferenceStackParamList,
  ItemObjType,
} from "../../../CustomTypes/types";

type Props = StackScreenProps<
  ItemsReferenceStackParamList,
  "ItemsByCategoryListItems"
>;

const CategoryItems: FC<Props> = ({ navigation, route }): JSX.Element => {
  const { category } = route.params;

  const sidebarItems: ItemObjType[] = useAppSelector<ItemObjType[]>(
    selectSidebarNavs(category),
    shallowEqual
  );

  useEffect(() => {
    navigation.setOptions({ headerTitle: category });
  }, []);

  return (
    <ScrollView>
      {sidebarItems.map(f => (
        <SingleSideBarAccordionListItem
          itemObj={f}
          key={`${f.name}-SingleSideBarAccordionListItem`}
        />
      ))}
    </ScrollView>
  );
};

export default memo<Props>(CategoryItems);
