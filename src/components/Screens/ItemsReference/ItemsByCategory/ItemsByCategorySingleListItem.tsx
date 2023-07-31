import { ListItem, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { shallowEqual } from "react-redux";

import useItemName from "../../../../hooks/useItemName";
import { useAppSelector } from "../../../../redux/hooks";
import { selectVendorsByItemName } from "../../../../redux/selectors";
import VendorNameProvider from "../../../../shared/contexts/VendorNameProvider";
import ItemsByCategorySingleListItemCheckBox from "./ItemsByCategorySingleListItemCheckBox";
import SingleCategoryListItemAddButton from "./SingleCategoryListItemAddButton";

const ItemsByCategorySingleListItem: FC = () => {
  const itemName = useItemName();
  const { background: backgroundColor } = useTheme().theme.colors;

  const vendors = useAppSelector(
    selectVendorsByItemName(itemName),
    shallowEqual
  );

  const containerStyle: StyleProp<ViewStyle> = useMemo(
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
