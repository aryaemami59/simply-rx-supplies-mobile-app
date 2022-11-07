import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const useIsCurrentFocused = (componentName: string) => {
  useFocusEffect(
    useCallback(() => {
      console.log(`%c${componentName} Focused`, "font-size: 20px");
      return () => {
        console.log(`%c${componentName} Blurred`, "font-size: 20px");
      };
    }, [componentName])
  );
};

export default useIsCurrentFocused;
