import { ListItem } from "@rneui/themed";
import { FC, memo, useCallback, useState } from "react";
import { useAppSelector } from "../redux/store";
import { selectItemsArr } from "../redux/addedSlice";
import { Text } from "react-native";

interface Props {
  props: string;
}

const SideBarAccordion: FC = (): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const allItems = useAppSelector(selectItemsArr);

  const clickHandler = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  return (
    <ListItem.Accordion
      content={<ListItem.Title>Items</ListItem.Title>}
      isExpanded={expanded}
      onPress={clickHandler}>
      {allItems.map(e => (
        <ListItem key={e.id}>
          <Text>{e.name}</Text>
        </ListItem>
      ))}
    </ListItem.Accordion>
  );
};

export default memo(SideBarAccordion);
