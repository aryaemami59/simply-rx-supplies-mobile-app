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
import { ItemObjType } from "../../../../../CustomTypes/types";
import { useTheme } from "@rneui/themed";
import { HEIGHT_100 } from "../../../../shared/sharedStyles";
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

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

  const renderItems: ListRenderItem<ItemObjType> = ({
    item,
  }: ListRenderItemInfo<ItemObjType>): JSX.Element => {
    return (
      <SingleItemsByVendorListItem itemObj={item} vendorName={vendorName} />
    );
  };

  const items = useAppSelector(selectItemsByVendor(vendorName), shallowEqual);

  const options: NativeStackNavigationOptions = useMemo(() => {
    return {
      headerTitle: officialVendorName,
      // headerStyle: { alignItems: "center" },
      // headerRight: HeaderRightFC,
      // headerTitleContainerStyle: {
      //   display: "flex",
      //   flex: 5,
      //   backgroundColor: "red",
      //   alignItems: "center",
      // },
      // headerRightContainerStyle: {
      //   display: "flex",
      //   flex: 1,
      //   backgroundColor: "red",
      //   width: "100%",
      // },
      // headerLeftContainerStyle: {
      //   display: "flex",
      //   flex: 10,
      //   backgroundColor: "red",
      // },
      // headerRight: () => <DarkModeIcon />,
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
