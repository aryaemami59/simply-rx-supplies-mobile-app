import { createStackNavigator } from "@react-navigation/stack";
import type { FC } from "react";
import { memo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useIsLoading from "../../hooks/useIsLoading";
import ErrMsgComponent from "../../shared/components/ErrMsgComponent";
import IsLoadingComponents from "../../shared/components/IsLoadingComponents";
import {
  refHeaderOptions,
  screenStackOptions,
} from "../../shared/screen_options/sharedScreenOptions";
import type {
  ItemsReferenceStackParamList,
  RootTabScreenProps,
} from "../../types/navigation";
import {
  itemsByCategoryListItems,
  itemsByVendorListItems,
  itemsReferenceScreen,
} from "../../types/navigation";
import ItemsByCategoryListItems from "../Screens/ItemsReference/ItemsByCategory/ItemsByCategoryListItems";
import ItemsByVendorListItems from "../Screens/ItemsReference/ItemsByVendor/ItemsByVendorListItems";
import ItemsReferenceScreen from "../Screens/ItemsReference/ItemsReferenceScreen";

const Stack = createStackNavigator<ItemsReferenceStackParamList>();

type Props = RootTabScreenProps<"ItemsReferenceStackNavigator">;

const ItemsReferenceStackNavigator: FC<Props> = ({ navigation, route }) => {
  const [isLoading, errMsg] = useIsLoading();

  if (isLoading) return <IsLoadingComponents />;

  if (errMsg) return <ErrMsgComponent />;

  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen
          options={screenStackOptions}
          name={itemsReferenceScreen}
          component={ItemsReferenceScreen}
        />
        <Stack.Group screenOptions={refHeaderOptions}>
          <Stack.Screen
            name={itemsByVendorListItems}
            component={ItemsByVendorListItems}
          />
          <Stack.Screen
            name={itemsByCategoryListItems}
            component={ItemsByCategoryListItems}
          />
        </Stack.Group>
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default memo<Props>(ItemsReferenceStackNavigator);
