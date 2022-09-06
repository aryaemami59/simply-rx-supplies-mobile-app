import { ListItem } from "@rneui/themed";
import { FC, memo, useCallback, useState } from "react";
import { useAppSelector } from "../redux/store";
import { selectItemsArr, selectVendorsArr } from "../redux/addedSlice";
import { Text } from "react-native";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";

interface Props {
  props: string;
}

const SideBarAccordion: FC = (): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const allVendors = useAppSelector(selectVendorsArr);

  const clickHandler = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  return (
    <>
      {allVendors.map(e => (
        <ListItem.Accordion
          content={<ListItem.Title>Items</ListItem.Title>}
          isExpanded={expanded}
          onPress={clickHandler}>
          {allVendors.map(e => (
            <ListItem.Accordion
              content={<ListItem.Title>{e}</ListItem.Title>}
              key={e}>
              <SingleSideBarAccordionListItem vendorName={e} />
            </ListItem.Accordion>
          ))}
        </ListItem.Accordion>
      ))}
    </>
  );
};

export default memo(SideBarAccordion);
