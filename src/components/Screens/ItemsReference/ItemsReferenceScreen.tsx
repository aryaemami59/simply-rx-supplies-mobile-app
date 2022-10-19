import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import {
  ItemsReferenceStackParamList,
  ItemsReferenceTopTabParamList,
} from "../../../../CustomTypes/types";
import {
  itemsByCategoryTabOptions,
  itemsByVendorTabOptions,
} from "../../../shared/sharedScreenOptions";
import ItemsByCategoryStackScreen from "../../StackScreenComponents/ItemsByCategoryStackScreen";
import ItemsByVendorStackScreen from "../../StackScreenComponents/ItemsByVendorStackScreen";

type Props = NativeStackScreenProps<
  ItemsReferenceStackParamList,
  "ItemsReferenceScreen"
>;

const Tab = createMaterialTopTabNavigator<ItemsReferenceTopTabParamList>();

const ItemsReferenceScreen: FC<Props> = ({ navigation, route }) => {
  const { background, grey0 } = useTheme().theme.colors;
  // const background = useContext(backgroundContext);

  const screenOptions = useMemo(
    () => ({
      tabBarStyle: { backgroundColor: background },
    }),
    [background]
  );

  const itemsByVendorTabScreenOptions = useMemo(
    () => ({
      ...itemsByVendorTabOptions,
      tabBarLabelStyle: { color: grey0 },
    }),
    [grey0]
  );

  const itemsByCategoryTabScreenOptions = useMemo(
    () => ({
      ...itemsByCategoryTabOptions,
      tabBarLabelStyle: { color: grey0 },
    }),
    [grey0]
  );

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        options={itemsByVendorTabScreenOptions}
        name="ItemsByVendor"
        component={ItemsByVendorStackScreen}
      />
      <Tab.Screen
        options={itemsByCategoryTabScreenOptions}
        name="ItemsByCategory"
        component={ItemsByCategoryStackScreen}
      />
    </Tab.Navigator>
  );
};

export default memo<Props>(ItemsReferenceScreen);
