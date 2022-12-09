import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { FC } from "react";
import { memo } from "react";

const ExpandIcon: FC = () => (
  <MaterialCommunityIcons
    name="expand-all-outline"
    color="white"
    size={24}
  />
);

export default memo(ExpandIcon);
