import { useEffect } from "react";

const useUpdateLogger = (value: unknown) => {
  useEffect(() => {
    console.log(
      `%c${value} \nchanged`,
      "background-color: red; font-size: 20px"
    );
  }, [value]);
};

export default useUpdateLogger;
