import { Octicons } from "@expo/vector-icons";
import type { FC } from "react";
import { memo } from "react";

const DetailsIcon: FC = () => (
  <Octicons
    name="info"
    color="white"
    size={20}
  />
);

export default memo(DetailsIcon);
