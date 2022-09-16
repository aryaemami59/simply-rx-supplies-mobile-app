import { FC, memo } from "react";
import { tabBarIconProps } from "../../../CustomTypes/types";
import { FontAwesome } from "@expo/vector-icons";

const TabBarIconItemLookup: FC<tabBarIconProps> = ({
  focused,
  color,
  size,
}): JSX.Element => {
  return <FontAwesome name="search" color={color} size={size} />;
};

export default memo<tabBarIconProps>(TabBarIconItemLookup);
