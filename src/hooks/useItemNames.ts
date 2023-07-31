import { shallowEqual } from "react-redux";

import { useAppSelector } from "../redux/hooks";
import { selectItemNamesByVendor } from "../redux/selectors";
import type { VendorNameType } from "../types/api";

const useItemNames = (vendorName: VendorNameType) =>
  useAppSelector(selectItemNamesByVendor(vendorName), shallowEqual);

export default useItemNames;
