import { ListItem, Button } from "@rneui/themed";
import { FC, memo } from "react";
import { Text } from "react-native";
import SideBarAccordionList from "../SideBarComponents/SideBarAccordionList";
import type { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../Main";
import { DrawerScreenProps } from "@react-navigation/drawer";
import SideBarAccordionNav from "../SideBarComponents/SideBarAccordionNav";
import ParentItemsByCategory from "../ItemsByCategoryComponents/ParentItemsByCategory";

type Props = DrawerScreenProps<RootStackParamList, "ItemsByCategory">;

const ItemsByCategoryScreen: FC<Props> = ({ navigation }): JSX.Element => {
  return (
    <>
      <ParentItemsByCategory />
    </>
  );
};

export default memo(ItemsByCategoryScreen);
