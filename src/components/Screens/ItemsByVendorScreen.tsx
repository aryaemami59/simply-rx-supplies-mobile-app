import { FC, memo } from "react";
import { StyleSheet } from "react-native";
import SideBarAccordionVendor from "../SideBarComponents/SideBarAccordionVendor";
import { useAppSelector } from "../../redux/store";
import { selectVendorsArr } from "../../redux/addedSlice";

const ItemsByVendorScreen = ({ navigation }): JSX.Element => {
  const allVendors: string[] = useAppSelector<string[]>(selectVendorsArr);

  return (
    <>
      {allVendors.map(e => (
        <SideBarAccordionVendor
          key={e}
          vendorName={e}
          onPress={() => navigation.push(`${e}-ref`, { vendorName: e })}
        />
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

export default memo(ItemsByVendorScreen);
