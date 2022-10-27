import { VendorNameType } from "../../../CustomTypes/types";
import { useAppSelector } from "../../redux/hooks";
import { selectVendorOfficialName } from "../../redux/selectors";

const useOfficialVendorName = (vendorName: VendorNameType) =>
  useAppSelector(selectVendorOfficialName(vendorName));

export default useOfficialVendorName;
