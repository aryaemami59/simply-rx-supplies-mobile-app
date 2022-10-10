import { ListItem } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import {
  officialVendorNameType,
  VendorAndItemName,
} from "../../../../../CustomTypes/types";
import {
  checkVendorsAdded,
  checkVendorsToAdd,
  selectVendorOfficialName,
  setVendors,
} from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { BACKGROUND_TRANSPARENT } from "../../../../shared/sharedStyles";

// type stateToPropsReturnType = {
//   checked: boolean;
//   disabled: boolean;
// };

// const mapStateToProps = (
//   state: RootState,
//   ownProps: ParentProps
// ): stateToPropsReturnType => ({
//   checked: state.item[ownProps.itemObj.name]!.vendorsToAdd.includes(
//     ownProps.vendorName
//   ),
//   disabled: state.item[ownProps.itemObj.name]!.vendorsAdded.includes(
//     ownProps.vendorName
//   ),
// });

// const mapDispatchToProps = (
//   dispatch: AppDispatch,
//   ownProps: ParentProps
// ): { onToggleSwitch: () => void } => ({
//   onToggleSwitch: () => {
//     dispatch(
//       setVendors({
//         itemObj: ownProps.itemObj,
//         vendorName: ownProps.vendorName,
//       })
//     );
//   },
// });

// const connector = connect(mapStateToProps, mapDispatchToProps);

// type PropsFromRedux = ConnectedProps<typeof connector>;

// interface ParentProps {
//   vendorName: VendorNameType;
// }

// type myProps = ParentProps & PropsFromRedux;

type Props = VendorAndItemName;

const SearchResultsCheckBox: FC<Props> = ({ vendorName, itemName }) => {
  const officialVendorName = useAppSelector<officialVendorNameType>(
    selectVendorOfficialName(vendorName)
  );

  const dispatch = useAppDispatch();

  const checked = useAppSelector(checkVendorsToAdd(vendorName, itemName));

  const disabled = useAppSelector(checkVendorsAdded(vendorName, itemName));

  const clickHandler = useCallback(() => {
    dispatch(setVendors({ itemName, vendorName }));
  }, [dispatch, itemName, vendorName]);

  return (
    <ListItem.CheckBox
      checked={checked}
      disabled={disabled}
      onPress={clickHandler}
      title={officialVendorName}
      style={BACKGROUND_TRANSPARENT}
      textStyle={BACKGROUND_TRANSPARENT}
    />
  );
};

export default memo<Props>(SearchResultsCheckBox);
