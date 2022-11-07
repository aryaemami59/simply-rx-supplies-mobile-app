import { shallowEqual } from "react-redux";
import { VendorNameType } from "../../../custom_types/api";
import { useAppSelector } from "../../redux/hooks";
import { selectItemNamesByVendor } from "../../redux/selectors";

const useItemNames = (vendorName: VendorNameType) =>
  useAppSelector(selectItemNamesByVendor(vendorName), shallowEqual);

export default useItemNames;
