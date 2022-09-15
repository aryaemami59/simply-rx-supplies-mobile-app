import { FC, memo } from "react";
import ParentItemsByCategory from "../ItemsByCategoryComponents/ParentItemsByCategory";

const ItemsByCategoryScreen: FC = (): JSX.Element => {
  return <ParentItemsByCategory />;
};

export default memo(ItemsByCategoryScreen);
