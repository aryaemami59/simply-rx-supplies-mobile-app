import { Button } from "@rneui/themed";
import { FC, memo } from "react";
import { itemInterface } from "../redux/addedSlice";

interface Props {
  itemObj: itemInterface;
}

const SingleSideBarAccordionListItem: FC<Props> = ({
  itemObj,
}): JSX.Element => {
  return (
    <>
      <Button title={itemObj.name} />
    </>
  );
};

export default memo(SingleSideBarAccordionListItem);
