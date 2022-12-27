import { MaterialIcons } from "@expo/vector-icons";
import type { FC } from "react";
import { memo } from "react";
import type { TabBarIconProps } from "../../types/missingTypes";

type Props = TabBarIconProps;

const TabBarIconItemsReference: FC<Props> = ({ color, size, focused }) => (
  <MaterialIcons
    name="filter-list"
    color={color}
    size={size}
  />
);

export default memo<Props>(TabBarIconItemsReference);
