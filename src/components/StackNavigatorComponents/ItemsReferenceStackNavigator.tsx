import { createStackNavigator } from "@react-navigation/stack";
import type { FC } from "react";
import { memo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ErrMsgComponent from "../../shared/components/ErrMsgComponent";
import IsLoadingComponents from "../../shared/components/IsLoadingComponents";
import useIsLoading from "../../shared/hooks/useIsLoading";
import {
  refHeaderOptions,
  screenStackOptions,
} from "../../shared/screen_options/sharedScreenOptions";
import type {
  ItemsReferenceStackNavigatorProps,
  ItemsReferenceStackParamList,
} from "../../types/navigation";
import ItemsByCategoryListItems from "../Screens/ItemsReference/ItemsByCategory/CategoryItems";
import ItemsByVendorListItems from "../Screens/ItemsReference/ItemsByVendor/ItemsByVendorListItems";
import ItemsReferenceScreen from "../Screens/ItemsReference/ItemsReferenceScreen";

type Props = ItemsReferenceStackNavigatorProps;

const Stack = createStackNavigator<ItemsReferenceStackParamList>();
// const Stack = createNativeStackNavigator<ItemsReferenceStackParamList>();

const ItemsReferenceStackNavigator: FC<Props> = ({ navigation, route }) => {
  const [isLoading, errMsg] = useIsLoading();

  if (isLoading) {
    return <IsLoadingComponents />;
  }

  if (errMsg) {
    return <ErrMsgComponent />;
  }

  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen
          options={screenStackOptions}
          name="ItemsReferenceScreen"
          component={ItemsReferenceScreen}
        />
        <Stack.Group screenOptions={refHeaderOptions}>
          <Stack.Screen
            name="ItemsByVendorListItems"
            component={ItemsByVendorListItems}
          />
          <Stack.Screen
            name="ItemsByCategoryListItems"
            component={ItemsByCategoryListItems}
          />
        </Stack.Group>
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default memo<Props>(ItemsReferenceStackNavigator);
