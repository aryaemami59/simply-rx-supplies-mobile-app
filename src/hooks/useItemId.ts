import { useContext } from "react";

import { ItemIdContext } from "../shared/contexts/ItemIdProvider";

const useItemId = () => useContext(ItemIdContext);

export default useItemId;
