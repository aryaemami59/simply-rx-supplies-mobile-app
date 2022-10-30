import React, { FC, memo } from "react";
import TabBarMain from "./TabBarComponents/TabBarMain";

const Main: FC = () => {
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchItems());
  // }, [dispatch]);

  // const isLoading = useAppSelector(checkIfLoading);
  // const errMsg = useAppSelector(selectErrMsg);

  // if (isLoading) {
  //   return <IsLoadingComponents />;
  // }

  // if (errMsg) {
  //   return <ErrMsgComponent />;
  // }

  return <TabBarMain />;
};

export default memo(Main);
