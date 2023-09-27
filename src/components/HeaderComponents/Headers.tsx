import type { StackHeader, TabHeader } from "../../types/tsHelpers";
import HeaderHomeStackNavigator from "./HeaderHomeStackNavigator";

// export const stackHeader: Header<StackNavigationOptions> = props => (
//   <HeaderHomeStackNavigator {...props} />
// );
export const stackHeader: StackHeader = props => (
  <HeaderHomeStackNavigator {...props} />
);

// export const tabHeader: Header<BottomTabNavigationOptions> = props => (
//   <HeaderHomeStackNavigator {...props} />
// );
export const tabHeader: TabHeader = props => (
  <HeaderHomeStackNavigator {...props} />
);
