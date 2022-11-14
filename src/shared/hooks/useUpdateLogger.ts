import { useEffect } from "react";

const useUpdateLogger = (value: Record<string, unknown> | []) => {
  useEffect(() => {
    console.log(
      `%c${JSON.stringify(value, null, 2)} \nchanged`,
      "background-color: red; font-size: 20px"
    );
  }, [value]);
};

export default useUpdateLogger;
