import { shallowEqual } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import { selectVendorsArr } from "../redux/selectors";

const useVendorNamesList = () => useAppSelector(selectVendorsArr, shallowEqual);

export default useVendorNamesList;
