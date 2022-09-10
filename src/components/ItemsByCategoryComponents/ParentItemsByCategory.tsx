import { FC, memo } from "react";
import { useAppSelector } from "../../redux/store";
import { selectNavsArr } from "../../redux/addedSlice";
import { shallowEqual } from "react-redux";
import SideBarAccordionNav from "../SideBarComponents/SideBarAccordionNav";
import { ScrollView } from "react-native";

interface Props {
  props: string;
}

const ParentItemsByCategory: FC = (): JSX.Element => {
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

export default memo(ParentItemsByCategory);
