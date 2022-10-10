import React, { FC, memo, useEffect } from "react";
import { checkIfLoading, fetchItems, selectErrMsg } from "../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ErrMsgComponent from "../shared/ErrMsgComponent";
import IsLoadingComponents from "../shared/IsLoadingComponents";
import TabBarMain from "./TabBarComponents/TabBarMain";

const Main: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems());
    // dispatch(fetchVendors());
    // dispatch(fetchCategories());
  }, [dispatch]);

  const isLoading = useAppSelector(checkIfLoading);
  const errMsg = useAppSelector(selectErrMsg);

  if (isLoading) {
    return <IsLoadingComponents />;
  }

  if (errMsg) {
    return <ErrMsgComponent />;
  }

  return <TabBarMain />;
};

export default memo(Main);
