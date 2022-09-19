import { FC, memo } from "react";
import { tabBarIconProps } from "../../../CustomTypes/types";
import { Ionicons } from "@expo/vector-icons";

type Props = tabBarIconProps;

const TabBarIconHome: FC<Props> = ({ focused, color, size }): JSX.Element => {
  return (
    <Ionicons
      name={focused ? "home" : "home-outline"}
      color={color}
      size={size}
    />
  );
};

export default memo<Props>(TabBarIconHome);
