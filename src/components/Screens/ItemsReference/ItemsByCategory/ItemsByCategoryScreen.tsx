import { FC, memo } from "react";
import { useAppSelector } from "../../../../redux/store";
import { selectNavsArr } from "../../../../redux/addedSlice";
import { shallowEqual } from "react-redux";
import { ScrollView } from "react-native";
import SideBarAccordionNav from "../../../SideBarComponents/SideBarAccordionNav";
import { StackScreenProps } from "@react-navigation/stack";
import { ItemsByCategoryStackParamList } from "../../../../../CustomTypes/types";

type Props = StackScreenProps<ItemsByCategoryStackParamList>;

const ItemsByCategoryScreen: FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const navList: string[] = useAppSelector<string[]>(
    selectNavsArr,
    shallowEqual
  );

  return (
    <ScrollView>
      {navList.map(e => (
        <SideBarAccordionNav key={e} category={e} />
      ))}
    </ScrollView>
  );
};

export default memo<Props>(ItemsByCategoryScreen);
