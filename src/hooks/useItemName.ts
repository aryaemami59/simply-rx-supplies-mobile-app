import { useContext } from "react";

import { ItemNameContext } from "../shared/contexts/ItemNameProvider";

const useItemName = () => useContext(ItemNameContext);

export default useItemName;
