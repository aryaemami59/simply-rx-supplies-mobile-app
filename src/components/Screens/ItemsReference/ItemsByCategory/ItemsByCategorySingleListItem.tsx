import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo } from "react";
import { ItemName } from "../../../../../CustomTypes/types";
import ItemsByCategorySingleListItemCheckBox from "./ItemsByCategorySingleListItemCheckBox";
import SingleCategoryListItemAddButton from "./SingleCategoryListItemAddButton";
import { useAppSelector } from "../../../../redux/hooks";
import { selectVendorsByItemName } from "../../../../redux/selectors";
import { shallowEqual } from "react-redux";

type Props = {
  itemName: ItemName;
};

const ItemsByCategorySingleListItem: FC<Props> = ({ itemName }) => {
  const { theme } = useTheme();
  const { background } = theme.colors;

  const vendors = useAppSelector(
    selectVendorsByItemName(itemName),
    shallowEqual
  );

  return (
    <ListItem
      bottomDivider
      containerStyle={{ backgroundColor: background }}>
      <ListItem.Content>
        <ListItem.Title>{itemName}</ListItem.Title>
        {vendors.map(vendorName => (
          <ItemsByCategorySingleListItemCheckBox
            key={vendorName}
            vendorName={vendorName}
            itemName={itemName}
          />
        ))}
      </ListItem.Content>
      <ListItem.Content right>
        <SingleCategoryListItemAddButton itemName={itemName} />
      </ListItem.Content>
    </ListItem>
  );
};

export default memo<Props>(ItemsByCategorySingleListItem);
