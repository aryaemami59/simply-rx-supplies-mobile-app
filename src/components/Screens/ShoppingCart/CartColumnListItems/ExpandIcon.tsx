import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FC, memo } from "react";

const ExpandIcon: FC = () => (
  <MaterialCommunityIcons
    name="expand-all-outline"
    color="white"
    size={24}
  />
);

export default memo(ExpandIcon);
