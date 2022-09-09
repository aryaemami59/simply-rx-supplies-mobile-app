import { FC, memo } from "react";
import SideBarAccordionVendor from "./SideBarAccordionVendor";
import { useAppSelector } from "../../redux/store";
import { selectVendorsArr, selectNavsArr } from "../../redux/addedSlice";
import { ListItem } from "@rneui/themed";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { shallowEqual } from "react-redux";
import SideBarAccordionNav from "./SideBarAccordionNav";

interface Props {
  props: string;
}

const SideBarAccordionList: FC = props => {
  const allVendors: string[] = useAppSelector<string[]>(selectVendorsArr);
  const navList: string[] = useAppSelector<string[]>(
    selectNavsArr,
    shallowEqual
  );

  return (
    <DrawerContentScrollView {...props}>
      {allVendors.map(e => (
        <SideBarAccordionVendor key={e} vendorName={e} />
      ))}
      {navList.map(e => (
        <SideBarAccordionNav key={e} category={e} />
      ))}
    </DrawerContentScrollView>
  );
};

export default memo(SideBarAccordionList);
