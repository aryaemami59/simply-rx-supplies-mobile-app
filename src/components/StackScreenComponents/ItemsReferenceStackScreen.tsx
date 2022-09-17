import { FC, memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ItemsReferenceScreen from "../Screens/ItemsReference/ItemsReferenceScreen";
import {
  ItemsReferenceStackParamList,
  RootTabParamList,
} from "../../../CustomTypes/types";
import {
  screenOptions,
  refHeaderOptions,
} from "../../shared/sharedScreenOptions";
import { useAppSelector } from "../../redux/store";
import {
  selectVendorsArr,
  selectAllVendorOfficialNames,
} from "../../redux/addedSlice";
import VendorItems from "../SideBarComponents/VendorItems";
import { mainColor } from "../../shared/sharedStyles";
import { selectNavsArr } from "../../redux/addedSlice";
import { shallowEqual } from "react-redux";
import SideBarAccordionNav from "../SideBarComponents/SideBarAccordionNav";
import SingleSideBarAccordionListItem from "../SideBarComponents/SingleSideBarAccordionListItem";
import CategoryItems from "../SideBarComponents/CategoryItems";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type Props = BottomTabScreenProps<RootTabParamList, "ItemsReference">;

const Stack = createStackNavigator<ItemsReferenceStackParamList>();

const ItemsReferenceStackScreen: FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  // const allVendors: string[] = useAppSelector<string[]>(selectVendorsArr);
  // const officialNames = useAppSelector(selectAllVendorOfficialNames);
  // const navList: string[] = useAppSelector<string[]>(
  //   selectNavsArr,
  //   shallowEqual
  // );

  return (
    <Stack.Navigator
    // screenOptions={screenOptions}
    >
      <Stack.Screen
        options={screenOptions}
        name="ItemsReferenceScreen"
        component={ItemsReferenceScreen}
      />
      <Stack.Screen
        options={refHeaderOptions}
        name="ItemsByVendorListItems"
        component={VendorItems}
      />
      <Stack.Screen
        options={refHeaderOptions}
        name="ItemsByCategoryListItems"
        component={CategoryItems}
      />
      {/* {allVendors.map((e: string, i: number) => (
        <Stack.Screen
          options={{ ...refHeaderOptions, headerTitle: officialNames[i] }}
          key={e}
          name={`${e}-ref`}
          component={VendorItems}
        />
      ))} */}
      {/* {navList.map((e: string) => (
        <Stack.Screen
          options={refHeaderOptions}
          key={e}
          name={e}
          component={CategorySideBarAccordionListItems}
        />
      ))} */}
    </Stack.Navigator>
  );
};

export default memo<Props>(ItemsReferenceStackScreen);
