import { ListItem } from "@rneui/themed";
import { FC, memo, useCallback, useState } from "react";
import SideBarAccordionListItems from "./SideBarAccordionListItems";
import { useAppSelector } from "../../redux/store";
import { selectVendorOfficialName } from "../../redux/addedSlice";
import { StyleSheet } from "react-native";

interface Props {
  vendorName: string;
  onPress: () => void;
}

const SideBarAccordionVendor: FC<Props> = ({
  vendorName,
  onPress,
}): JSX.Element => {
  // const [expanded, setExpanded] = useState<boolean>(false);
  const officialVendorName: string = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  // const clickHandler = useCallback((): void => {
  //   setExpanded((prev: boolean): boolean => !prev);
  // }, []);

  return (
    <ListItem.Accordion
      containerStyle={styles.accordionContainerStyle}
      key={vendorName}
      content={<ListItem.Title>{officialVendorName}</ListItem.Title>}
      // isExpanded={expanded}
      bottomDivider
      onPress={onPress}>
      {/* <SideBarAccordionListItems /> */}
    </ListItem.Accordion>
  );
};

const styles = StyleSheet.create({
  accordionContainerStyle: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default memo<Props>(SideBarAccordionVendor);
