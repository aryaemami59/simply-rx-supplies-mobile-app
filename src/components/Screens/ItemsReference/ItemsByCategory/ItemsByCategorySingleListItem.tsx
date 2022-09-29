import { FC, memo } from "react";
import { ItemObjType } from "../../../../../CustomTypes/types";
import ItemsByCategorySingleListItemCheckBox from "./ItemsByCategorySingleListItemCheckBox";
import SingleCategoryListItemAddButton from "./SingleCategoryListItemAddButton";
import { ListItem } from "@rneui/themed";

type Props = {
  itemObj: ItemObjType;
};

const ItemsByCategorySingleListItem: FC<Props> = ({ itemObj }): JSX.Element => {
  return (
    <>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{itemObj.name}</ListItem.Title>
          {itemObj.vendors.map(vendorName => (
            <ItemsByCategorySingleListItemCheckBox
              key={vendorName}
              vendorName={vendorName}
              itemObj={itemObj}
            />
          ))}
        </ListItem.Content>
        <ListItem.Content right>
          <SingleCategoryListItemAddButton itemObj={itemObj} />
        </ListItem.Content>
      </ListItem>
    </>
  );
};

export default memo<Props>(ItemsByCategorySingleListItem);
