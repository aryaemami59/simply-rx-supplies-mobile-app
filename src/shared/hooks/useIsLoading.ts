import { useAppSelector } from "../../redux/hooks";
import { checkIfLoading, selectErrMsg } from "../../redux/selectors";

const useIsLoading = (): [boolean, string] => {
  const isLoading = useAppSelector(checkIfLoading);
  const errMsg = useAppSelector(selectErrMsg);
  return [isLoading, errMsg];
};

export default useIsLoading;
