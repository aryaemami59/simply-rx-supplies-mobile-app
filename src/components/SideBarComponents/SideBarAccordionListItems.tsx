import { ListItem } from "@rneui/themed";
import { FC, memo } from "react";
import { useAppSelector } from "../../redux/store";
import { selectItemsByVendor, itemInterface } from "../../redux/addedSlice";
import { shallowEqual } from "react-redux";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";

interface Props {
  vendorName: string;
}

const SideBarAccordionListItems: FC<Props> = ({ vendorName }): JSX.Element => {
  const items: itemInterface[] = useAppSelector(
    selectItemsByVendor(vendorName),
    shallowEqual
  );

  return (
    <>
      {items.map(e => (
        <ListItem key={e.id}>
          <SingleSideBarAccordionListItem itemObj={e} />
        </ListItem>
      ))}
    </>
  );
};

export default memo<Props>(SideBarAccordionListItems);
