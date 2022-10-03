import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo } from "react";
import { ItemObjType } from "../../../../../CustomTypes/types";
import ItemsByCategorySingleListItemCheckBox from "./ItemsByCategorySingleListItemCheckBox";
import SingleCategoryListItemAddButton from "./SingleCategoryListItemAddButton";

type Props = {
  itemObj: ItemObjType;
};

const ItemsByCategorySingleListItem: FC<Props> = ({ itemObj }): JSX.Element => {
  const { theme } = useTheme();

  return (
    <ListItem
      bottomDivider
      containerStyle={[{ backgroundColor: theme.colors.background }]}>
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
  );
};

export default memo<Props>(ItemsByCategorySingleListItem);
