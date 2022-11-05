import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, memo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  ItemsReferenceStackNavigatorProps,
  ItemsReferenceStackParamList,
} from "../../../CustomTypes/navigation";
import useIsLoading from "../../shared/customHooks/useIsLoading";
import ErrMsgComponent from "../../shared/ErrMsgComponent";
import IsLoadingComponents from "../../shared/IsLoadingComponents";
import {
  refHeaderOptions,
  screenStackOptions,
} from "../../shared/sharedScreenOptions";
import ItemsByCategoryListItems from "../Screens/ItemsReference/ItemsByCategory/CategoryItems";
import ItemsByVendorListItems from "../Screens/ItemsReference/ItemsByVendor/ItemsByVendorListItems";
import ItemsReferenceScreen from "../Screens/ItemsReference/ItemsReferenceScreen";

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
