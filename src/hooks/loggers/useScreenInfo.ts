import type {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from "@react-navigation/native";
import type { FC } from "react";
import { useEffect, useMemo } from "react";

import type { AnyObject, EmptyObject } from "../../types/missingTypes";
import type { RootTabParamList } from "../../types/navigation";

type Options<P extends AnyObject = EmptyObject> = {
  showParentInfo?: boolean;
  component?: FC<P>;
};

const useScreenInfo = <
  P extends RouteProp<ParamListBase>,
  T extends NavigationProp<RootTabParamList>,
  R extends AnyObject = EmptyObject,
>(
  options: Options<R> = {
    showParentInfo: true,
  }
) => {
  const { showParentInfo, component } = options;
  const navigation = useNavigation<T>();
  const route = useRoute<P>();
  const navigationState = useNavigationState(state => state);

  const { type } = navigationState;
  const { name } = route;
  const parentState = navigation.getParent()?.getState();
  const parent = parentState?.routes[parentState.index];

  const parentName = parent?.name;
  const parentType = parentState?.type;

  const info = useMemo(
    () =>
      showParentInfo
        ? {
            type,
            name,
            parentName,
            parentType,
          }
        : {
            type,
            name,
          },
    [name, parentName, parentType, showParentInfo, type]
  );

  useEffect(() => {
    console.log(
      `${component?.name ? `${component.name}` : ""} %o : ${
        parentName ? `Parent Name: %c${parentName}%c` : "%cTOP LEVEL"
      }`,
      { [name]: info },
      "color: aqua;",
      ""
    );
  }, [component?.name, info, name, parentName]);
};

export default useScreenInfo;
