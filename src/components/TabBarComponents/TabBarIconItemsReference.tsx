import { FC, memo } from "react";
import { tabBarIconProps } from "../../../CustomTypes/types";
import { MaterialIcons } from "@expo/vector-icons";

const TabBarIconItemsReference: FC<tabBarIconProps> = ({
  focused,
  color,
  size,
}): JSX.Element => {
  return <MaterialIcons name="filter-list" color={color} size={size} />;
};

export default memo<tabBarIconProps>(TabBarIconItemsReference);
