import { FC, memo } from "react";
import SideBarAccordionVendor from "../../../SideBarComponents/SideBarAccordionVendor";
import { useAppSelector } from "../../../../redux/store";
import { selectVendorsArr } from "../../../../redux/addedSlice";
import { StackScreenProps } from "@react-navigation/stack";
import {
  ItemsByVendorStackParamList,
  vendorNameType,
} from "../../../../../CustomTypes/types";

type Props = StackScreenProps<
  ItemsByVendorStackParamList,
  "ItemsByVendorScreen"
>;

const ItemsByVendorScreen: FC<Props> = (): JSX.Element => {
  const allVendors: vendorNameType[] =
    useAppSelector<vendorNameType[]>(selectVendorsArr);

  return (
    <>
      {allVendors.map(e => (
        <SideBarAccordionVendor key={e} vendorName={e} />
      ))}
    </>
  );
};

export default memo<Props>(ItemsByVendorScreen);
