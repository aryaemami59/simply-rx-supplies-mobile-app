import { FC, memo } from "react";
import SingleListItem from "../../../../shared/SingleListItem";
import { ItemObjType } from "../../../../../CustomTypes/types";
import ItemsByCategorySingleListItemCheckBox from "./ItemsByCategorySingleListItemCheckBox";

type Props = {
  itemObj: ItemObjType;
};

const ItemsByCategorySingleListItem: FC<Props> = ({ itemObj }): JSX.Element => {
  const { vendors } = itemObj;

  return (
    <>
      <SingleListItem itemObj={itemObj} />
      {vendors.map(e => (
        <ItemsByCategorySingleListItemCheckBox
          itemObj={itemObj}
          vendorName={e}
          key={`ItemsByCategorySingleListItem-${e}`}
        />
      ))}
    </>
  );
};

export default memo<Props>(ItemsByCategorySingleListItem);
