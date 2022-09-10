import { ListItem } from "@rneui/themed";
import { FC, memo, useCallback, useState } from "react";
import { itemInterface, selectSidebarNavs } from "../../redux/addedSlice";
import { useAppSelector } from "../../redux/store";
import { shallowEqual } from "react-redux";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";
import { StyleSheet } from "react-native";

interface Props {
  category: string;
}

const SideBarAccordionNav: FC<Props> = ({ category }): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const clickHandler = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);
  const sidebarItems: itemInterface[] = useAppSelector<itemInterface[]>(
    selectSidebarNavs(category),
    shallowEqual
  );

  return (
    <ListItem.Accordion
      containerStyle={styles.accordionContainerStyle}
      content={<ListItem.Title>{category}</ListItem.Title>}
      isExpanded={expanded}
      bottomDivider
      onPress={clickHandler}>
      {sidebarItems.map(f => (
        <SingleSideBarAccordionListItem
          category={category}
          itemObj={f}
          key={`${f.name}-SingleSideBarAccordionListItem`}
        />
      ))}
    </ListItem.Accordion>
  );
};

const styles = StyleSheet.create({
  accordionContainerStyle: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default memo(SideBarAccordionNav);
