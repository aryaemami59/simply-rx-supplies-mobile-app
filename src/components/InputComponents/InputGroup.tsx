import { useCallback, FC, memo, useState } from "react";
import {
  selectAllListItems,
  selectVendorsArr,
  selectAllVendorOfficialNames,
} from "../../redux/addedSlice";
import { useAppSelector } from "../../redux/store";
import { shallowEqual } from "react-redux";
import {
  FlatList,
  StyleSheet,
  ListRenderItem,
  View,
  Text,
  TouchableOpacity,
  ListRenderItemInfo,
} from "react-native";
import SingleInputListItem from "./SingleInputListItem";
import InputField from "./InputField";
import {
  ItemObjType,
  vendorNameType,
  officialVendorNameType,
  ItemLookupStackParamList,
} from "../../../CustomTypes/types";
import SearchResultsVendorCheckbox from "./SearchResultsVendorCheckbox";
import { Button, ListItem } from "@rneui/themed";
import { BottomSheet } from "@rneui/base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../../../CustomTypes/types";
import { displayNone } from "../../shared/sharedStyles";

const InputGroup: FC = (): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const listItems = useAppSelector<ItemObjType[]>(
    selectAllListItems,
    shallowEqual
  );
  const vendors = useAppSelector<vendorNameType[]>(selectVendorsArr);
  const officialVendorNames = useAppSelector<officialVendorNameType[]>(
    selectAllVendorOfficialNames
  );
  const renderItems: ListRenderItem<ItemObjType> = useCallback(
    ({ item }: ListRenderItemInfo<ItemObjType>): JSX.Element => {
      return <SingleInputListItem item={item} />;
    },
    []
  );

  // const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();

  // const showBottomSheet = () => {
  //   // setVisible(true);
  //   navigation.setOptions({ tabBarStyle: { display: "none" } });
  // };
  const showBottomSheet = useCallback(() => {
    setVisible(true);
    // navigation.setOptions({ tabBarStyle: { display: "none" } });
  }, []);

  const hideBottomSheet = useCallback(() => {
    setVisible(false);
    // navigation.setOptions({ tabBarStyle: { display: "flex" } });
  }, []);

  return (
    <>
      {/* <SafeAreaProvider> */}
      <InputField />
      <Button onPress={showBottomSheet} title="Exclude Vendors" />
      <BottomSheet
        isVisible={visible}
        onBackdropPress={hideBottomSheet}
        modalProps={{  } }
        containerStyle={{ paddingBottom: 50 }}>
        <View>
          {officialVendorNames.map((e: officialVendorNameType, i: number) => (
            <SearchResultsVendorCheckbox
              key={e}
              title={e}
              vendorName={vendors[i]}
            />
          ))}
        </View>
      </BottomSheet>
      {/* </SafeAreaProvider> */}
      <FlatList
        data={listItems}
        renderItem={renderItems}
        keyboardShouldPersistTaps="handled"
      />
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  inputContainerStyle: {
    borderRadius: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  inputStyle: {
    color: "white",
  },
});

export default memo(InputGroup);
