import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { FC, memo, useEffect, useMemo } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { shallowEqual } from "react-redux";
import {
  ItemObjType,
  ItemsReferenceStackParamList,
} from "../../../../../CustomTypes/types";
import {
  selectItemsByVendor,
  selectVendorOfficialName,
} from "../../../../redux/addedSlice";
import { useAppSelector } from "../../../../redux/hooks";
import { HEIGHT_100 } from "../../../../shared/sharedStyles";
import SingleItemsByVendorListItem from "./SingleItemsByVendorListItem";

const keyExtractor = (item: ItemObjType) => item.id.toString();

type Props = NativeStackScreenProps<
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

  const renderItems: ListRenderItem<ItemObjType> = ({ item }): JSX.Element => {
    return (
      <SingleItemsByVendorListItem
        itemObj={item}
        vendorName={vendorName}
      />
    );
  };

  const items = useAppSelector(selectItemsByVendor(vendorName), shallowEqual);

  const options: NativeStackNavigationOptions = useMemo(() => {
    return {
      headerTitle: officialVendorName,
    };
  }, [officialVendorName]);

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);

  const { theme } = useTheme();

  return (
    <View style={[{ backgroundColor: theme.colors.background }, HEIGHT_100]}>
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
