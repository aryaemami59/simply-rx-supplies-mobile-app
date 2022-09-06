import { ListItem } from "@rneui/themed";
import { FC, memo } from "react";

interface Props {
  vendorName: string;
}

const SingleSideBarAccordionListItem: FC<Props> = ({
  vendorName,
}): JSX.Element => {
  
  return (
    <>
      <ListItem></ListItem>
    </>
  );
};

export default memo(SingleSideBarAccordionListItem);
