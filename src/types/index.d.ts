import "react-native-collapsible";

import type { ReactNode } from "react";

declare module "ts-node/register" {}

declare module "react-native-collapsible" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface CollapsibleProps {
    children?: ReactNode;
  }
}
