import { FC, memo, useMemo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../../../CustomTypes/types";
import HomeStackScreen from "../StackScreenComponents/HomeStackScreen";
import ItemLookupStackScreen from "../StackScreenComponents/ItemLookupStackScreen";
import ShoppingCartStackScreen from "../StackScreenComponents/ShoppingCartStackScreen";
import ItemsReferenceStackScreen from "../StackScreenComponents/ItemsReferenceStackScreen";
import {
  HEADER_SHOWN_FALSE,
  HomeOptions,
  ItemsReferenceOptions,
  ShoppingCartOptions,
  ItemLookupOptions,
} from "../../shared/sharedScreenOptions";
import { useAppSelector } from "../../redux/hooks";
import { checkIfAnyItemsAdded } from "../../redux/addedSlice";

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabBarMain: FC = (): JSX.Element => {
  const ifItemsAdded = useAppSelector(checkIfAnyItemsAdded);
  const tabBarBadge = ifItemsAdded ? "" : undefined;

  const options = useMemo(() => {
    return {
      ...ShoppingCartOptions,
      tabBarBadge,
    };
  }, [tabBarBadge]);

  return (
    <Tab.Navigator screenOptions={HEADER_SHOWN_FALSE}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={HomeOptions}
      />
      <Tab.Screen
        name="ItemLookup"
        component={ItemLookupStackScreen}
        options={ItemLookupOptions}
      />
      <Tab.Screen
        name="ShoppingCart"
        component={ShoppingCartStackScreen}
        options={options}
      />
      <Tab.Screen
        name="ItemsReference"
        component={ItemsReferenceStackScreen}
        options={ItemsReferenceOptions}
      />
    </Tab.Navigator>
  );
};

export default memo(TabBarMain);
