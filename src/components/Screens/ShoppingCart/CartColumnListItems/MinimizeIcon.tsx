import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { FC } from "react";
import { memo } from "react";

const MinimizeIcon: FC = () => (
  <MaterialCommunityIcons
    name="collapse-all-outline"
    color="white"
    size={24}
  />
);

export default memo(MinimizeIcon);
