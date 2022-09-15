import { FC, memo } from "react";
import {
  createStackNavigator,
  StackHeaderProps,
} from "@react-navigation/stack";
import ItemsReferenceScreen from "../Screens/ItemsReferenceScreen";
import HeaderHomeStackNavigator from "../HeaderComponents/HeaderHomeStackNavigator";

const Stack = createStackNavigator();

const header = (props: StackHeaderProps): JSX.Element => (
  <HeaderHomeStackNavigator {...props} />
);

const screenOptions = {
  header,
} as const;

const ItemsReferenceStackScreen: FC = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="ItemsReference" component={ItemsReferenceScreen} />
    </Stack.Navigator>
  );
};

export default memo(ItemsReferenceStackScreen);
