import { FC, memo } from "react";
import { StyleSheet } from "react-native";
import SideBarAccordionVendor from "../../../SideBarComponents/SideBarAccordionVendor";
import { useAppSelector } from "../../../../redux/store";
import { selectVendorsArr } from "../../../../redux/addedSlice";
import { StackScreenProps } from "@react-navigation/stack";
import {
  ItemLookupStackParamList,
  ItemsByVendorStackParamList,
} from "../../../../../CustomTypes/types";

type Props = StackScreenProps<
  ItemsByVendorStackParamList,
  "ItemsByVendorScreen"
>;

const ItemsByVendorScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  const allVendors: string[] = useAppSelector<string[]>(selectVendorsArr);

  return (
    <>
      {allVendors.map(e => (
        <SideBarAccordionVendor key={e} vendorName={e} />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: "stretch",
    justifyContent: "space-between",
    height: "100%",
    padding: 30,
  },
});

export default memo<Props>(ItemsByVendorScreen);
