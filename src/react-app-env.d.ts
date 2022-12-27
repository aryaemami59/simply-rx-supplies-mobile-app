/// <reference types="react-scripts" />
import type { ReactNode } from "react";
import "react-native-collapsible";

declare module "react-native-collapsible" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface CollapsibleProps {
    children?: ReactNode;
  }
}
