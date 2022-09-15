import { Icon } from "@rneui/themed";
import { FC, memo } from "react";
import { tabBarIconProps } from "../../../CustomTypes/types";

const TabBarIconHome: FC<tabBarIconProps> = ({
  focused,
  color,
  size,
}): JSX.Element => {
  return (
    <Icon
      name={focused ? "home" : "home-outline"}
      type="ionicon"
      color={color}
      size={size}
    />
  );
};

export default memo(TabBarIconHome);
