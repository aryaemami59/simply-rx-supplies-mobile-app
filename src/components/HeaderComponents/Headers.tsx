import type { StackHeader, TabHeader } from "../../types/missingTypes";
import HeaderHomeStackNavigator from "./HeaderHomeStackNavigator";

export const stackHeader: StackHeader = props => (
  <HeaderHomeStackNavigator {...props} />
);

export const tabHeader: TabHeader = props => (
  <HeaderHomeStackNavigator {...props} />
);
