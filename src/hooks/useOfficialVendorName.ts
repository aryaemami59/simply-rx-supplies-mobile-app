import { useAppSelector } from "../redux/hooks";
import { selectVendorOfficialName } from "../redux/selectors";
import type { VendorNameType } from "../types/api";

const useOfficialVendorName = (vendorName: VendorNameType) =>
  useAppSelector(selectVendorOfficialName(vendorName));

export default useOfficialVendorName;
