import { FC, memo } from "react";
import { tabBarIconProps } from "../../../CustomTypes/types";
import { Ionicons } from "@expo/vector-icons";

type Props = tabBarIconProps;

const TabBarIconHome: FC<Props> = ({ focused, color, size }): JSX.Element => {
  const iconName = focused ? "home" : "home-outline";

  return <Ionicons name={iconName} color={color} size={size} />;
};

export default memo<Props>(TabBarIconHome);
