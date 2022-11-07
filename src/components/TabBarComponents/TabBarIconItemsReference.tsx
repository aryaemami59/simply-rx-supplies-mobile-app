import { MaterialIcons } from "@expo/vector-icons";
import { FC, memo } from "react";
import { tabBarIconProps } from "../../../custom_types/missingTypes";

type Props = tabBarIconProps;

const TabBarIconItemsReference: FC<Props> = ({ color, size, focused }) => (
  <MaterialIcons
    name="filter-list"
    color={color}
    size={size}
  />
);

export default memo<Props>(TabBarIconItemsReference);
