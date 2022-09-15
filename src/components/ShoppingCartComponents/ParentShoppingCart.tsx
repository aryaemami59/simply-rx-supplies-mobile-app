import { FC, memo } from "react";
import { useAppSelector } from "../../redux/store";
import { selectVendorsArr } from "../../redux/addedSlice";
import CartVendorColumns from "./CartVendorColumns";
import { ScrollView } from "react-native";

const ParentShoppingCart: FC = (): JSX.Element => {
  const vendors = useAppSelector(selectVendorsArr);

  return (
    <ScrollView>
      {vendors.map(e => (
        <CartVendorColumns key={e} vendorName={e} />
      ))}
    </ScrollView>
  );
};

export default memo(ParentShoppingCart);
