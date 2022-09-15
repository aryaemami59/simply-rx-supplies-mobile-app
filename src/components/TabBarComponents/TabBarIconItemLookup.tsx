import { Icon } from "@rneui/themed";
import { FC, memo } from "react";
import { tabBarIconProps } from "../../../Main";

type Props = tabBarIconProps;

const TabBarIconItemLookup: FC<Props> = ({
  focused,
  color,
  size,
}): JSX.Element => {
  return <Icon name="search" type="font-awesome" color={color} size={size} />;
};

export default memo(TabBarIconItemLookup);
