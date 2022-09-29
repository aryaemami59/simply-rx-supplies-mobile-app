import { FC, memo, useEffect, useMemo } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import {
  selectItemsByVendor,
  selectVendorOfficialName,
} from "../../../../redux/addedSlice";
import { shallowEqual } from "react-redux";
import SingleItemsByVendorListItem from "./SingleItemsByVendorListItem";
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  View,
} from "react-native";
import { ItemsReferenceStackParamList } from "../../../../../CustomTypes/types";
import {
  StackScreenProps,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { ItemObjType } from "../../../../../CustomTypes/types";
import { useTheme } from "@rneui/themed";
import { HEIGHT_100 } from "../../../../shared/sharedStyles";

const keyExtractor = (item: ItemObjType) => item.id.toString();

type Props = StackScreenProps<
  ItemsReferenceStackParamList,
  "ItemsByVendorListItems"
>;

const ItemsByVendorListItems: FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const { vendorName } = route.params;
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  const renderItems: ListRenderItem<ItemObjType> = ({
    item,
  }: ListRenderItemInfo<ItemObjType>): JSX.Element => {
    return (
      <SingleItemsByVendorListItem itemObj={item} vendorName={vendorName} />
    );
  };

  const items = useAppSelector(selectItemsByVendor(vendorName), shallowEqual);

  const options: StackNavigationOptions = useMemo(() => {
    return {
      headerTitle: officialVendorName,
    };
  }, [officialVendorName]);

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);

  const { theme } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.background,
        },
        HEIGHT_100,
      ]}>
      <FlatList
        removeClippedSubviews
        data={items}
        renderItem={renderItems}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default memo<Props>(ItemsByVendorListItems);
