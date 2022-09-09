import { ListItem } from "@rneui/themed";
import { FC, memo, useCallback, useState } from "react";
import SideBarAccordionListItems from "./SideBarAccordionListItems";
import { useAppSelector } from "../../redux/store";
import { selectVendorOfficialName } from "../../redux/addedSlice";

interface Props {
  vendorName: string;
}

const SideBarAccordionVendor: FC<Props> = ({ vendorName }): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  const clickHandler = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  return (
    <ListItem.Accordion
      containerStyle={{
        alignItems: "center",
        justifyContent: "space-between",
      }}
      key={vendorName}
      content={<ListItem.Title>{officialVendorName}</ListItem.Title>}
      isExpanded={expanded}
      onPress={clickHandler}>
      <SideBarAccordionListItems vendorName={vendorName} />
    </ListItem.Accordion>
  );
};

export default memo(SideBarAccordionVendor);
