import { useFocusEffect } from "@react-navigation/native";
import type { FC } from "react";
import { useCallback } from "react";
import type { AnyObject, EmptyObject } from "../../types/missingTypes";

const useIsCurrentFocused = <P extends AnyObject = EmptyObject>(
  component: FC<P>
) => {
  const { name } = component;
  useFocusEffect(
    useCallback(() => {
      console.log(`%c${name} Focused`, "font-size: 20px");
      return () => {
        console.log(`%c${name} Blurred`, "font-size: 20px");
      };
    }, [name])
  );
};

export default useIsCurrentFocused;
