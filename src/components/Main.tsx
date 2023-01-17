import type { FC } from "react";
import { memo } from "react";
import RootTabNavigator from "./TabBarComponents/RootTabNavigator";

const Main: FC = () => <RootTabNavigator />;

export default memo(Main);
