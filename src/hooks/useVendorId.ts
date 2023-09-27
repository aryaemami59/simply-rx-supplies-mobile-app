import { useContext } from "react";

import { VendorIdContext } from "../shared/contexts/VendorIdProvider";

const useVendorId = () => useContext(VendorIdContext);

export default useVendorId;
