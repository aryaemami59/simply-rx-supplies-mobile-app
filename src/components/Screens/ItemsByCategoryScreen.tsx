import { FC, memo } from "react";
import { useAppSelector } from "../../redux/store";
import { selectNavsArr } from "../../redux/addedSlice";
import { shallowEqual } from "react-redux";
import { ScrollView } from "react-native";
import SideBarAccordionNav from "../SideBarComponents/SideBarAccordionNav";

const ItemsByCategoryScreen = ({ navigation }): JSX.Element => {
  const navList: string[] = useAppSelector<string[]>(
    selectNavsArr,
    shallowEqual
  );

  return (
    <>
      {navList.map(e => (
        <SideBarAccordionNav
          key={e}
          category={e}
          onPress={() => navigation.push(e, { category: e })}
        />
      ))}
    </>
  );
};

export default memo(ItemsByCategoryScreen);
