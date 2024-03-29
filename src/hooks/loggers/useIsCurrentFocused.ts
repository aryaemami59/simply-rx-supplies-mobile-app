import type { ParamListBase, RouteProp } from "@react-navigation/native";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useCallback } from "react";

const useIsCurrentFocused = <P extends RouteProp<ParamListBase>>() => {
  const { name } = useRoute<P>();
  useFocusEffect(
    useCallback(() => {
      console.log(`%c${name} Screen Focused`, "font-size: 16px");
      return () => {
        console.log(`%c${name} Screen Blurred`, "font-size: 16px");
      };
    }, [name])
  );
};

export default useIsCurrentFocused;
