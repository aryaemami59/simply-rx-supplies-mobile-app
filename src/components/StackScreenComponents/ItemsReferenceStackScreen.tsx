import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, memo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  ItemsReferenceStackParamList,
  RootTabParamList,
} from "../../../CustomTypes/types";
import useIsLoading from "../../shared/customHooks/useIsLoading";
import useStatus from "../../shared/customHooks/useStatus";
import ErrMsgComponent from "../../shared/ErrMsgComponent";
import IsLoadingComponents from "../../shared/IsLoadingComponents";
import {
  refHeaderOptions,
  screenOptions,
} from "../../shared/sharedScreenOptions";
import CategoryItems from "../Screens/ItemsReference/ItemsByCategory/CategoryItems";
import ItemsByVendorListItems from "../Screens/ItemsReference/ItemsByVendor/ItemsByVendorListItems";
import ItemsReferenceScreen from "../Screens/ItemsReference/ItemsReferenceScreen";

type Props = BottomTabScreenProps<RootTabParamList, "ItemsReference">;

const Stack = createNativeStackNavigator<ItemsReferenceStackParamList>();

const ItemsReferenceStackScreen: FC<Props> = ({ navigation, route }) => {
  useStatus("ItemsReferenceStackScreen");
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
          options={screenOptions}
          name="ItemsReferenceScreen"
          component={ItemsReferenceScreen}
        />
        <Stack.Screen
          options={refHeaderOptions}
          name="ItemsByVendorListItems"
          component={ItemsByVendorListItems}
        />
        <Stack.Screen
          options={refHeaderOptions}
          name="ItemsByCategoryListItems"
          component={CategoryItems}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default memo<Props>(ItemsReferenceStackScreen);
