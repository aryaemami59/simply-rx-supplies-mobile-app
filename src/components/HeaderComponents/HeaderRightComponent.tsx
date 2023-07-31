import type { HeaderProps } from "@rneui/base";
import type { ReactElement } from "react";

import type { HeaderRight } from "../../types/missingTypes";
import DarkModeIcon from "./DarkModeIcon";

const HeaderRightComponent: Extract<
  ReactElement,
  NonNullable<HeaderProps["rightComponent"]>
> = <DarkModeIcon />;

export default HeaderRightComponent;

export const HeaderRightFC: HeaderRight = () => <DarkModeIcon />;
