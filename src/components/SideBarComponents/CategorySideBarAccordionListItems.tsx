import { FC, memo } from "react";
import { itemInterface, selectSidebarNavs } from "../../redux/addedSlice";
import { useAppSelector } from "../../redux/store";
import { shallowEqual } from "react-redux";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";
import { ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ItemsReferenceStackParamList } from "../../../CustomTypes/types";

type Props = StackScreenProps<ItemsReferenceStackParamList>;

const CategorySideBarAccordionListItems: FC<Props> = ({
  route,
}): JSX.Element => {
  const { category } = route.params;

  const sidebarItems: itemInterface[] = useAppSelector<itemInterface[]>(
    selectSidebarNavs(category),
    shallowEqual
  );

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

export default memo<Props>(CategorySideBarAccordionListItems);
