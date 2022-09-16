import { FC, memo } from "react";
import { itemInterface, selectSidebarNavs } from "../../redux/addedSlice";
import { useAppSelector } from "../../redux/store";
import { shallowEqual } from "react-redux";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";
import { ScrollView } from "react-native";

// interface Props {
//   props: string;
// }

const CategorySideBarAccordionListItems = ({ route }): JSX.Element => {
  const { category } = route.params;

  const sidebarItems: itemInterface[] = useAppSelector<itemInterface[]>(
    selectSidebarNavs(category),
    shallowEqual
  );
  return (
    <ScrollView>
      {sidebarItems.map(f => (
        <SingleSideBarAccordionListItem
          category={category}
          itemObj={f}
          key={`${f.name}-SingleSideBarAccordionListItem`}
        />
      ))}
    </ScrollView>
  );
};

export default memo(CategorySideBarAccordionListItems);
