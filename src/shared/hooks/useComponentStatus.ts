import { useEffect } from "react";

const useComponentStatus = (componentName: string) => {
  useEffect(() => {
    console.log(`%c${componentName} Mounted`, "font-size: 20px");
    return () => {
      console.log(`%c${componentName} Unmounted`, "font-size: 20px");
    };
  }, [componentName]);
};

export default useComponentStatus;
