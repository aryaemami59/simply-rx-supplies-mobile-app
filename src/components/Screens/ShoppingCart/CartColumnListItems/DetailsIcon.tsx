import { Octicons } from "@expo/vector-icons";
import { FC, memo } from "react";

const DetailsIcon: FC = () => (
  <Octicons
    name="info"
    color="white"
    size={20}
  />
);

export default memo(DetailsIcon);
