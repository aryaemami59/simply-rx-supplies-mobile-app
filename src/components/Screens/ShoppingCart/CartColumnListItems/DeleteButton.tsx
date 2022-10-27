import { Button } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { removeItems } from "../../../../redux/addedSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import useItemName from "../../../../shared/customHooks/useItemName";
import useVendorName from "../../../../shared/customHooks/useVendorName";
import { JC_SPACE_EVENLY } from "../../../../shared/sharedStyles";
import DeleteIconNode from "./DeleteIconNode";

type Props = {
  reset: () => void;
};

const DeleteButton: FC<Props> = ({ reset }) => {
  const itemName = useItemName();
  const vendorName = useVendorName();
  const dispatch = useAppDispatch();

  const clickHandler = useCallback(() => {
    reset();
    dispatch(removeItems({ itemName, vendorName }));
  }, [dispatch, itemName, reset, vendorName]);

  return (
    <Button
      icon={DeleteIconNode}
      size="md"
      title="Delete"
      color="error"
      onPress={clickHandler}
      buttonStyle={JC_SPACE_EVENLY}
    />
  );
};

export default memo<Props>(DeleteButton);
