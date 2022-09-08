import { FC, memo } from "react";
import SideBarAccordionVendor from "./SideBarAccordionVendor";
import { useAppSelector } from "../../redux/store";
import { selectVendorsArr } from "../../redux/addedSlice";
import { ListItem } from "@rneui/themed";
import { DrawerContentScrollView } from "@react-navigation/drawer";

interface Props {
  props: string;
}

const SideBarAccordionList: FC = props => {
  const allVendors = useAppSelector(selectVendorsArr);

  return (
    <DrawerContentScrollView {...props}>
      {allVendors.map(e => (
        <SideBarAccordionVendor key={e} vendorName={e} />
      ))}
    </DrawerContentScrollView>
  );
};

export default memo(SideBarAccordionList);
