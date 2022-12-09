import { Button } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback } from "react";
import { removeItems } from "../../../../redux/addedSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import useItemName from "../../../../shared/hooks/useItemName";
import useVendorName from "../../../../shared/hooks/useVendorName";
import { JC_SPACE_EVENLY } from "../../../../shared/styles/sharedStyles";
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
