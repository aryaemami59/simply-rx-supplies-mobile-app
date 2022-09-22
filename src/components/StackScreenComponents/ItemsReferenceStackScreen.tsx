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
import VendorItems from "../SideBarComponents/VendorItems";
import CategoryItems from "../SideBarComponents/CategoryItems";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type Props = BottomTabScreenProps<RootTabParamList, "ItemsReference">;

const Stack = createStackNavigator<ItemsReferenceStackParamList>();

const ItemsReferenceStackScreen: FC<Props> = (): JSX.Element => {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};

export default memo<Props>(ItemsReferenceStackScreen);
