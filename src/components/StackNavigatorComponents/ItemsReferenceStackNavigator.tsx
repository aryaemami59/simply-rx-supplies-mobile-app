import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { FC } from "react";
import { memo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useIsLoading from "../../shared/hooks/useIsLoading";
import ErrMsgComponent from "../../shared/components/ErrMsgComponent";
import {
  refHeaderOptions,
  screenStackOptions,
} from "../../shared/screen_options/sharedScreenOptions";
import ItemsByCategoryListItems from "../Screens/ItemsReference/ItemsByCategory/CategoryItems";
import ItemsByVendorListItems from "../Screens/ItemsReference/ItemsByVendor/ItemsByVendorListItems";
import ItemsReferenceScreen from "../Screens/ItemsReference/ItemsReferenceScreen";
import IsLoadingComponents from "../../shared/components/IsLoadingComponents";
import type {
  ItemsReferenceStackNavigatorProps,
  ItemsReferenceStackParamList,
} from "../../types/navigation";

type Props = ItemsReferenceStackNavigatorProps;

const Stack = createNativeStackNavigator<ItemsReferenceStackParamList>();

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
