import { FontAwesome } from "@expo/vector-icons";
import type { FC } from "react";
import { memo } from "react";

import { AI_CENTER } from "../../shared/styles/sharedStyles";
import type { TabBarIconProps } from "../../types/tsHelpers";

type Props = TabBarIconProps;

const TabBarIconItemLookup: FC<Props> = ({ color, size, focused }) => (
  <FontAwesome
    name="search"
    color={color}
    size={size}
    style={AI_CENTER}
  />
);

export default memo<Props>(TabBarIconItemLookup);
