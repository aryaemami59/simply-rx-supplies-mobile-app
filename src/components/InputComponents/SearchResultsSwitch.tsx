import { FC, memo, useCallback, useState } from "react";
import { useAppSelector, RootState, AppDispatch } from "../../redux/store";
import {
  selectVendorOfficialName,
  setVendors,
  itemInterface,
} from "../../redux/addedSlice";
import { Card, Switch } from "@rneui/themed";
import { connect, ConnectedProps } from "react-redux";

type stateToPropsReturnType = {
  checked: boolean;
  disabled: boolean;
};

const mapStateToProps = (
  state: RootState,
  ownProps: ParentProps
): stateToPropsReturnType => {
  return {
    checked: state.item[ownProps.itemObj.name].vendorsToAdd.includes(
      ownProps.vendorName
    ),
    disabled: state.item[ownProps.itemObj.name].vendorsAdded.includes(
      ownProps.vendorName
    ),
  };
};

const mapDispatchToProps = (
  dispatch: AppDispatch,
  ownProps: ParentProps
): { clickHandler: () => void } => {
  return {
    clickHandler: () => {
      dispatch(
        setVendors({
          itemObj: ownProps.itemObj,
          vendorName: ownProps.vendorName,
        })
      );
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface ParentProps {
  vendorName: string;
  itemObj: itemInterface;
}

type myProps = ParentProps & PropsFromRedux;

const SearchResultsSwitch: FC<myProps> = ({
  // checked,
  itemObj,
  vendorName,
  disabled,
}): JSX.Element => {
  const [checked, setChecked] = useState(false);
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  const clickHandler = useCallback(() => {
    setChecked(prev => !prev);
  }, []);

  return (
    <>
      <Card.FeaturedTitle style={{ color: "black", textAlign: "center" }}>
        <Switch
          style={{ margin: 10 }}
          value={checked}
          onValueChange={clickHandler}
        />
        {officialVendorName}
      </Card.FeaturedTitle>
    </>
  );
};

export default connector(memo<myProps>(SearchResultsSwitch));
