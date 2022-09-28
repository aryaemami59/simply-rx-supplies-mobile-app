import { FC, memo } from "react";
import ItemsByVendorVendorList from "./ItemsByVendorVendorList";
import { useAppSelector } from "../../../../redux/hooks";
import { selectVendorsArr } from "../../../../redux/addedSlice";
import { StackScreenProps } from "@react-navigation/stack";
import { ItemsByVendorStackParamList } from "../../../../../CustomTypes/types";

type Props = StackScreenProps<
  ItemsByVendorStackParamList,
  "ItemsByVendorScreen"
>;

const ItemsByVendorScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  const allVendors = useAppSelector(selectVendorsArr);

  return (
    <>
      {allVendors.map(vendorName => (
        <ItemsByVendorVendorList key={vendorName} vendorName={vendorName} />
      ))}
    </>
  );
};

export default memo<Props>(ItemsByVendorScreen);
