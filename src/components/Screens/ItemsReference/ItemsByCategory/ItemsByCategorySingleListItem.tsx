import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../../../redux/hooks";
import { selectVendorsByItemName } from "../../../../redux/selectors";
import VendorNameProvider from "../../../../shared/contexts/VendorNameProvider";
import useItemName from "../../../../shared/customHooks/useItemName";
import ItemsByCategorySingleListItemCheckBox from "./ItemsByCategorySingleListItemCheckBox";
import SingleCategoryListItemAddButton from "./SingleCategoryListItemAddButton";

const ItemsByCategorySingleListItem: FC = () => {
  const itemName = useItemName();
  const { background: backgroundColor } = useTheme().theme.colors;

  const vendors = useAppSelector(
    selectVendorsByItemName(itemName),
    shallowEqual
  );

  const containerStyle = useMemo(
    () => ({ backgroundColor }),
    [backgroundColor]
  );

  return (
    <ListItem
      bottomDivider
      containerStyle={containerStyle}>
      <ListItem.Content>
        <ListItem.Title>{itemName}</ListItem.Title>
        {vendors.map(vendorName => (
          <VendorNameProvider
            vendorName={vendorName}
            key={vendorName}>
            <ItemsByCategorySingleListItemCheckBox />
          </VendorNameProvider>
        ))}
      </ListItem.Content>
      <ListItem.Content right>
        <SingleCategoryListItemAddButton />
      </ListItem.Content>
    </ListItem>
  );
};

export default memo(ItemsByCategorySingleListItem);
