import { FC, memo } from "react";
import { useAppSelector } from "../../redux/store";
import { selectVendorsArr } from "../../redux/addedSlice";
import SideBarAccordionVendor from "../SideBarComponents/SideBarAccordionVendor";

interface Props {
  props: string;
}

const ParentItemsByVendor: FC = (): JSX.Element => {
  const allVendors: string[] = useAppSelector<string[]>(selectVendorsArr);

  return (
    <>
      {allVendors.map(e => (
        <SideBarAccordionVendor key={e} vendorName={e} />
      ))}
    </>
  );
};

export default memo(ParentItemsByVendor);
