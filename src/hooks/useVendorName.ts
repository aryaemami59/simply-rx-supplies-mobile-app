import { useContext } from "react";
import { VendorNameContext } from "../shared/contexts/VendorNameProvider";

const useVendorName = () => useContext(VendorNameContext);

export default useVendorName;
