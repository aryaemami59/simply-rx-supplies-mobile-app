import { MaterialIcons } from "@expo/vector-icons";
import { FC, memo } from "react";
import { tabBarIconProps } from "../../../CustomTypes/types";

type Props = tabBarIconProps;

const TabBarIconItemsReference: FC<Props> = ({ color, size, focused }) => (
  <MaterialIcons
    name="filter-list"
    color={color}
    size={size}
  />
);

export default memo<Props>(TabBarIconItemsReference);
