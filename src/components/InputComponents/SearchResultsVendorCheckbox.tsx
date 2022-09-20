import { CheckBox, ListItem } from "@rneui/themed";
import { FC, memo, useState, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import {
  ItemLookupStackParamList,
  ItemObjType,
  officialVendorNameType,
  vendorNameType,
} from "../../../CustomTypes/types";
import { setVendors, setVendorsForAll } from "../../redux/addedSlice";
import { AppDispatch, useAppDispatch, RootState } from "../../redux/store";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
  title: officialVendorNameType;
  vendorName: vendorNameType;
};

// type stateToPropsReturnType = {
//   checked: boolean;
//   disabled: boolean;
// };

// const mapStateToProps = (
//   state: RootState,
//   ownProps: ParentProps
// ): stateToPropsReturnType => {
//   return {
//     checked: state.item[ownProps.itemObj.name].vendorsToAdd.includes(
//       ownProps.vendorName
//     ),
//     disabled: state.item[ownProps.itemObj.name].vendorsAdded.includes(
//       ownProps.vendorName
//     ),
//   };
// };

// const mapDispatchToProps = (
//   dispatch: AppDispatch,
//   ownProps: ParentProps
// ): { onToggleSwitch: () => void } => {
//   return {
//     onToggleSwitch: () => {
//       dispatch(
//         setVendors({
//           itemObj: ownProps.itemObj,
//           vendorName: ownProps.vendorName,
//         })
//       );
//     },
//   };
// };

// const connector = connect(mapStateToProps, mapDispatchToProps);

// type PropsFromRedux = ConnectedProps<typeof connector>;

// interface ParentProps {
//   vendorName: vendorNameType;
//   itemObj: ItemObjType;
// }

// type Props = ParentProps & PropsFromRedux;

const SearchResultsVendorCheckbox: FC<Props> = ({
  title,
  vendorName,
}): JSX.Element => {
  const [checked, setChecked] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const onToggleCheck = useCallback(() => {
    setChecked(prev => !prev);
    dispatch(setVendorsForAll(vendorName));
  }, []);

  // const navigation =
  //   useNavigation<StackNavigationProp<ItemLookupStackParamList>>();

  return (
    <>
      <TouchableOpacity onPress={onToggleCheck}>
        <ListItem bottomDivider>
          <ListItem.Content style={{ width: "100%" }}>
            <ListItem.CheckBox checked={checked} title={title} />
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    </>
  );
};

// export default connector(memo<Props>(SearchResultsVendorCheckbox));
export default memo<Props>(SearchResultsVendorCheckbox);
