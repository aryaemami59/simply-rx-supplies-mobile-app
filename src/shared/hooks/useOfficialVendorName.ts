import { VendorNameType } from "../../../custom_types/api";
import { useAppSelector } from "../../redux/hooks";
import { selectVendorOfficialName } from "../../redux/selectors";

const useOfficialVendorName = (vendorName: VendorNameType) =>
  useAppSelector(selectVendorOfficialName(vendorName));

export default useOfficialVendorName;
