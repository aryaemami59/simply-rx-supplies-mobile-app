import { FC, memo } from "react";
import SideBarAccordion from "./SideBarAccordion";

interface Props {
  props: string
}

const SideBarAccordionList: FC<Props> = ({ props }): JSX.Element => {
  return (
    <>
      <div></div>
    </>
  )
};

export default memo(SideBarAccordionList);