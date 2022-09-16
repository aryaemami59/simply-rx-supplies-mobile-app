import { FC, memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ItemsReferenceScreen from "../Screens/ItemsReferenceScreen";
import { ItemsReferenceStackParamList } from "../../../CustomTypes/types";
import { screenOptions } from "../../shared/sharedScreenOptions";
import { useAppSelector } from "../../redux/store";
import {
  selectVendorsArr,
  selectAllVendorOfficialNames,
} from "../../redux/addedSlice";
import SideBarAccordionListItems from "../SideBarComponents/SideBarAccordionListItems";
import { mainColor } from "../../shared/sharedStyles";
import { selectNavsArr } from "../../redux/addedSlice";
import { shallowEqual } from "react-redux";
import SideBarAccordionNav from "../SideBarComponents/SideBarAccordionNav";
import SingleSideBarAccordionListItem from "../SideBarComponents/SingleSideBarAccordionListItem";
import CategorySideBarAccordionListItems from "../SideBarComponents/CategorySideBarAccordionListItems";

const Stack = createStackNavigator<ItemsReferenceStackParamList>();

const ItemsReferenceStackScreen: FC = (): JSX.Element => {
  const allVendors: string[] = useAppSelector<string[]>(selectVendorsArr);
  const officialNames = useAppSelector(selectAllVendorOfficialNames);
  const navList: string[] = useAppSelector<string[]>(
    selectNavsArr,
    shallowEqual
  );

  return (
    <Stack.Navigator
    // screenOptions={screenOptions}
    >
      <Stack.Screen
        options={screenOptions}
        name="ItemsReferenceScreen"
        component={ItemsReferenceScreen}
      />
      {allVendors.map((e: string, i: number) => (
        <Stack.Screen
          options={{
            headerTitle: officialNames[i],
            headerStyle: { backgroundColor: mainColor },
            headerTitleStyle: { color: "white" },
            headerBackTitleStyle: { color: "white" },
            headerBackTitleVisible: false,
            headerTintColor: "white",
          }}
          key={e}
          name={`${e}-ref`}
          component={SideBarAccordionListItems}
        />
      ))}
      {navList.map(e => (
        <Stack.Screen
          key={e}
          name={e}
          component={CategorySideBarAccordionListItems}
        />
      ))}
    </Stack.Navigator>
  );
};

export default memo(ItemsReferenceStackScreen);
