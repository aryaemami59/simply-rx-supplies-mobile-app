import { ListItem } from "@rneui/themed";
import { FC, memo } from "react";
import { useAppSelector } from "../../redux/store";
import { selectItemsByVendor, itemInterface } from "../../redux/addedSlice";
import { shallowEqual } from "react-redux";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";
import { ScrollView } from "react-native";

interface Props {
  vendorName: string;
}

const SideBarAccordionListItems = ({ route }) => {
  const { vendorName } = route.params;
  const items: itemInterface[] = useAppSelector(
    selectItemsByVendor(vendorName),
    shallowEqual
  );

  return (
    <ScrollView>
      {items.map(e => (
        <ListItem key={e.id}>
          <SingleSideBarAccordionListItem itemObj={e} />
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default memo(SideBarAccordionListItems);
