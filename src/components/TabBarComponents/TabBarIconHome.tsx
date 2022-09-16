import { Icon } from "@rneui/themed";
import { FC, memo } from "react";
import { tabBarIconProps } from "../../../CustomTypes/types";
import { Ionicons } from "@expo/vector-icons";

const TabBarIconHome: FC<tabBarIconProps> = ({
  focused,
  color,
  size,
}): JSX.Element => {
  return (
    <Ionicons
      name={focused ? "home" : "home-outline"}
      color={color}
      size={size}
    />
  );
};

export default memo(TabBarIconHome);
