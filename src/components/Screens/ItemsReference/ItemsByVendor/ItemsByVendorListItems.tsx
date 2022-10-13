import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { FC, memo, useCallback, useEffect, useMemo } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { shallowEqual } from "react-redux";
import {
  ItemName,
  ItemsReferenceStackParamList,
} from "../../../../../CustomTypes/types";
import { useAppSelector } from "../../../../redux/hooks";
import {
  selectItemNamesByVendor,
  selectVendorOfficialName,
} from "../../../../redux/selectors";
import { HEIGHT_100 } from "../../../../shared/sharedStyles";
import SingleItemsByVendorListItem from "./SingleItemsByVendorListItem";

const keyExtractor = (item: ItemName) => item;

type Props = NativeStackScreenProps<
  ItemsReferenceStackParamList,
  "ItemsByVendorListItems"
>;

const ItemsByVendorListItems: FC<Props> = ({ navigation, route }) => {
  const { vendorName } = route.params;
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  const renderItems: ListRenderItem<ItemName> = useCallback(
    ({ item }) => (
      <SingleItemsByVendorListItem
        itemName={item}
        vendorName={vendorName}
      />
    ),
    [vendorName]
  );

  const itemNames = useAppSelector(
    selectItemNamesByVendor(vendorName),
    shallowEqual
  );

  const options: NativeStackNavigationOptions = useMemo(
    () => ({
      headerTitle: officialVendorName,
    }),
    [officialVendorName]
  );

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);

  const { theme } = useTheme();
  const { background } = theme.colors;

  return (
    <View style={[{ backgroundColor: background }, HEIGHT_100]}>
      <FlatList
        removeClippedSubviews
        data={itemNames}
        renderItem={renderItems}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default memo<Props>(ItemsByVendorListItems);
