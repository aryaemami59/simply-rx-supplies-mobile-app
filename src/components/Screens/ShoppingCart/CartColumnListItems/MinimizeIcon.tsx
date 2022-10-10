import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FC, memo } from "react";

const MinimizeIcon: FC = () => (
  <MaterialCommunityIcons
    name="collapse-all-outline"
    color="white"
    size={24}
  />
);

export default memo(MinimizeIcon);
