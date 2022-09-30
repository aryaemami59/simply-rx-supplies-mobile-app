import React, { FC, memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchItems,
  fetchVendors,
  fetchCategories,
  checkIfLoading,
  selectErrMsg,
} from "../redux/addedSlice";
import IsLoadingComponents from "../shared/IsLoadingComponents";
import ErrMsgComponent from "../shared/ErrMsgComponent";
import TabBarMain from "./TabBarComponents/TabBarMain";

const Main: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchVendors());
    dispatch(fetchCategories());
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
