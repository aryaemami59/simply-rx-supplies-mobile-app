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
  ItemsReferenceStackParamList,
  RootTabScreenProps,
} from "../../types/navigation";
import {
  itemsByCategoryListItems,
  itemsByVendorListItems,
  itemsReferenceScreen,
} from "../../types/navigation";
import ItemsByCategoryListItems from "../Screens/ItemsReference/ItemsByCategory/CategoryItems";
import ItemsByVendorListItems from "../Screens/ItemsReference/ItemsByVendor/ItemsByVendorListItems";
import ItemsReferenceScreen from "../Screens/ItemsReference/ItemsReferenceScreen";

type Props = RootTabScreenProps<"ItemsReference">;
// type Props = ItemsReferenceStackNavigatorProps;

const Stack = createStackNavigator<ItemsReferenceStackParamList>();

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
