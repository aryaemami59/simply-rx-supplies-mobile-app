import { FC, memo, useState, useCallback } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ItemLookupStackParamList,
  RootTabParamList,
} from "../../../CustomTypes/types";
import ItemLookupScreen from "../Screens/ItemLookUp/ItemLookupScreen";
import { HEADER_SHOWN_FALSE } from "../../shared/sharedScreenOptions";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Button } from "@rneui/themed";
import { BottomSheet } from "@rneui/base";
import { View } from "react-native";
import { useAppSelector } from "../../redux/store";
import {
  selectVendorsArr,
  selectAllVendorOfficialNames,
} from "../../redux/addedSlice";
import {
  vendorNameType,
  officialVendorNameType,
} from "../../../CustomTypes/types";
import SearchResultsVendorCheckbox from "../InputComponents/SearchResultsVendorCheckbox";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createStackNavigator<ItemLookupStackParamList>();

type Props = BottomTabScreenProps<RootTabParamList, "ItemLookup">;

const ItemLookupStackScreen: FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const vendors = useAppSelector<vendorNameType[]>(selectVendorsArr);
  const officialVendorNames = useAppSelector<officialVendorNameType[]>(
    selectAllVendorOfficialNames
  );

  const showBottomSheet = useCallback(() => {
    setVisible(true);
    navigation.setOptions({ tabBarStyle: { display: "none" } });
  }, []);

  const hideBottomSheet = useCallback(() => {
    setVisible(false);
    navigation.setOptions({ tabBarStyle: { display: "flex" } });
  }, []);

  return (
    <>
      <Stack.Navigator screenOptions={HEADER_SHOWN_FALSE}>
        <Stack.Screen name="ItemLookupScreen" component={ItemLookupScreen} />
      </Stack.Navigator>
      {/* <ItemLookupScreen /> */}
      {/* <SafeAreaProvider> */}
      {/* <Button onPress={showBottomSheet} title="Exclude Vendors" />
      <BottomSheet isVisible={visible} onBackdropPress={hideBottomSheet}>
        <View>
          {officialVendorNames.map((e: officialVendorNameType, i: number) => (
            <SearchResultsVendorCheckbox
              key={e}
              title={e}
              vendorName={vendors[i]}
            />
          ))}
        </View>
      </BottomSheet> */}
      {/* </SafeAreaProvider> */}
    </>
  );
};

export default memo<Props>(ItemLookupStackScreen);
