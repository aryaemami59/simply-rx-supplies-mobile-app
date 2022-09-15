import { Icon } from "@rneui/themed";
import { FC, memo } from "react";
import { tabBarIconProps } from "../../../CustomTypes/types";

const TabBarIconItemLookup: FC<tabBarIconProps> = ({
  focused,
  color,
  size,
}): JSX.Element => {
  return <Icon name="search" type="font-awesome" color={color} size={size} />;
};

export default memo<tabBarIconProps>(TabBarIconItemLookup);
