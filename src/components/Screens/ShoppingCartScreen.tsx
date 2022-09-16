import { FC, memo } from "react";
import { useAppSelector } from "../../redux/store";
import { selectVendorsArr } from "../../redux/addedSlice";
import { ScrollView } from "react-native";
import CartVendorColumns from "../ShoppingCartComponents/CartVendorColumns";

const ShoppingCartScreen: FC = () => {
  const vendors = useAppSelector(selectVendorsArr);

  return (
    <ScrollView>
      {vendors.map(e => (
        <CartVendorColumns key={e} vendorName={e} />
      ))}
    </ScrollView>
  );
};

export default memo(ShoppingCartScreen);
