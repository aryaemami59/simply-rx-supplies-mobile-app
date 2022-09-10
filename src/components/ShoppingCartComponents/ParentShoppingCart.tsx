import { FC, memo } from "react";
import { useAppSelector } from "../../redux/store";
import { selectVendorsArr } from "../../redux/addedSlice";
import CartVendorColumns from "./CartVendorColumns";

interface Props {
  props: string;
}

const ParentShoppingCart: FC = (): JSX.Element => {
  const vendors = useAppSelector(selectVendorsArr);

  return (
    <>
      {vendors.map(e => (
        <CartVendorColumns key={e} vendorName={e} />
      ))}
    </>
  );
};

export default memo(ParentShoppingCart);
