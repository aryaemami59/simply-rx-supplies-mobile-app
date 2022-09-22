import { FC, memo } from "react";
import { tabBarIconProps } from "../../../CustomTypes/types";
import { MaterialIcons } from "@expo/vector-icons";

type Props = tabBarIconProps;

const TabBarIconItemsReference: FC<Props> = ({ color, size }): JSX.Element => {
  return <MaterialIcons name="filter-list" color={color} size={size} />;
};

export default memo<Props>(TabBarIconItemsReference);
