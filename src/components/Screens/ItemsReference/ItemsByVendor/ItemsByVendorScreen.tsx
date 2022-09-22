import { FC, memo } from "react";
import ItemsByVendorVendorList from "./ItemsByVendorVendorList";
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
        <ItemsByVendorVendorList key={e} vendorName={e} />
      ))}
    </>
  );
};

export default memo<Props>(ItemsByVendorScreen);
