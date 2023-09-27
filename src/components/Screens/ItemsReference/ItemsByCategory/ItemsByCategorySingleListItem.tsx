import { ListItem, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";

import useItemId from "../../../../hooks/useItemId";
import { useAppSelector } from "../../../../redux/hooks";
import {
  selectItemName,
  selectVendorIdsByItemId,
} from "../../../../redux/selectors";
import VendorIdProvider from "../../../../shared/contexts/VendorIdProvider";
import ItemsByCategorySingleListItemCheckBox from "./ItemsByCategorySingleListItemCheckBox";
import SingleCategoryListItemAddButton from "./SingleCategoryListItemAddButton";

const ItemsByCategorySingleListItem: FC = () => {
  const itemId = useItemId();
  const vendorIds = useAppSelector(state =>
    selectVendorIdsByItemId(state, itemId)
  );
  const itemName = useAppSelector(state => selectItemName(state, itemId));
  const { background: backgroundColor } = useTheme().theme.colors;

  const containerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({ backgroundColor }),
    [backgroundColor]
  );

  return (
    <ListItem
      bottomDivider
      containerStyle={containerStyle}>
      <ListItem.Content>
        <ListItem.Title>{itemName}</ListItem.Title>
        {vendorIds.map(vendorId => (
          <VendorIdProvider
            vendorId={vendorId}
            key={vendorId}>
            <ItemsByCategorySingleListItemCheckBox />
          </VendorIdProvider>
        ))}
      </ListItem.Content>
      <ListItem.Content right>
        <SingleCategoryListItemAddButton />
      </ListItem.Content>
    </ListItem>
  );
};

export default memo(ItemsByCategorySingleListItem);
